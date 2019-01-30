import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  StatusBar
} from 'react-native';
import axios from 'axios';
import SocketIOClient from 'socket.io-client';

import Vote from "./screens/Vote"
import SelectAnimation from "./screens/SelectAnimation"

const ip = "169.254.162.242";
const port = "80";

export default class App extends Component {
  state = {
    voting: false
  }

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.socket = SocketIOClient(`http://${ip}:${port}`)

    this.initVote = this.initVote.bind(this);
    this.registerVote = this.registerVote.bind(this);
    this.resetVote = this.resetVote.bind(this);
  }

  initVote(name, type) {
    var that = this;
    this.socket.emit('initVote', {name, type});
    this.socket.on('event-id', function(id) {
      that.setState({eventID: id, voting: true});
    });
  }

  registerVote(vote) {
    const eventID = this.state.eventID;
    this.socket.emit('vote', {vote, eventID})
  }

  resetVote() {
    const eventID = this.state.eventID;
    this.socket.emit('resetVote', {eventID});
  }

  componentDidMount() {
  }

  renderForm() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <StatusBar hidden/>
        <SelectAnimation initVote={this.initVote}/>
      </View>
    )
  }

  renderVote() {
    return (
      <View>
        <StatusBar hidden/>
        <Vote resetVote={this.resetVote} registerVote={this.registerVote}/>
      </View>
    )
  }

  render() {
    const { voting } = this.state;

    if (voting) return this.renderVote()
    else return this.renderForm()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
