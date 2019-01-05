import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
  Button
} from 'react-native'
import PercentageCircle from 'react-native-percentage-circle';

export default class Vote extends Component {
  state = {
    displayResults: false,
    vote: 0,
    voteUp: 0,
    voteDown: 0,
    voteSoso: 0,
    now: Date.now()
  }
  constructor(props) {
    super(props);

    this.handleVoteUp = this.handleVoteUp.bind(this);
    this.handleVoteDown = this.handleVoteDown.bind(this);
    this.handleVoteSoso = this.handleVoteSoso.bind(this);
  }

  handleVoteUp() {
    var now = Date.now();
    this.props.registerVote('up');

    this.setState(prevstate => {
      return {
        vote: (now - prevstate.now <= 1000) ? prevstate.vote : prevstate.vote + 1,
        voteUp: (now - prevstate.now <= 1000) ? prevstate.voteUp : prevstate.voteUp + 1,
        now: now
      }
    });
  }

  handleVoteDown() {
    var now = Date.now();
    this.props.registerVote('down');

    this.setState(prevstate => {
      return {
        vote: (now - prevstate.now <= 1000) ? prevstate.vote : prevstate.vote + 1,
        voteDown: (now - prevstate.now <= 1000) ? prevstate.voteDown : prevstate.voteDown + 1,
        now: now
      }
    });
  }

  handleVoteSoso() {
    var now = Date.now();
    this.props.registerVote('soso');

    this.setState(prevstate => {
      return {
        vote: (now - prevstate.now <= 1000) ? prevstate.vote : prevstate.vote + 1,
        voteSoso: (now - prevstate.now <= 1000) ? prevstate.voteSoso : prevstate.voteSoso + 1,
        now: now
      }
    });
  }

  renderVoting() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>AVEZ VOUS AIMÉ ?</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={this.handleVoteUp}>
            <Image style={styles.icon} source={require('../assets/images/smiley.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleVoteSoso}>
            <Image style={styles.icon} source={require('../assets/images/soso.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleVoteDown}>
            <Image style={styles.icon} source={require('../assets/images/angry.png')}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{position: 'absolute', top: 10, right: 10}} onPress={() => this.setState({displayResults: true})}>
          <Text style={{fontSize: 15}}>RÉSULTATS</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderResults() {
    const { vote, voteUp, voteSoso, voteDown } = this.state;
    const { width, height } = Dimensions.get('window')
    return (
      <View style={{width: width, height: height, justifyContent: 'space-around', alignItems: 'center'}}>
        <Text style={{fontSize: 50}}>Sur {vote} votes :</Text>
        <View style={styles.percentages}>
          <View style={styles.circlePercentage}>
            <PercentageCircle
              radius={100}
              textStyle={{...styles.circlePercentageText, color: 'green'}}
              borderWidth={15}
              percent={ vote === 0 ? 0 : Math.round((voteUp * 100) / vote) } color={"green"}
            />
          </View>
          <View style={styles.circlePercentage}>
            <PercentageCircle
              radius={100}
              textStyle={{...styles.circlePercentageText, color: 'yellow'}}
              borderWidth={15}
              percent={ vote === 0 ? 0 : Math.round((voteSoso * 100) / vote) } color={"yellow"}
            />
          </View>
          <View style={styles.circlePercentage}>
            <PercentageCircle
              radius={100}
              textStyle={{...styles.circlePercentageText, color: 'red'}}
              borderWidth={15}
              percent={ vote === 0 ? 0 : Math.round((voteDown * 100) / vote) } color={"red"}
            />
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <Button title="RETOUR AU VOTE" onPress={() => this.setState({displayResults: false})}/>
          <Button color="red" title="RECOMMENCER LE VOTE" onPress={() => this.setState({vote: 0, voteUp: 0, voteDown: 0, voteSoso: 0, now: Date.now()})}/>
        </View>
      </View>
    )
  }

  render() {
    const { displayResults } = this.state;
    if (displayResults) return this.renderResults()
    else return this.renderVoting();
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 50,
  },
  percentages: {
    margin: 30,
    flexDirection: 'row',
  },
  circlePercentage: {
    marginHorizontal: 30,
  },
  circlePercentageText: {
    fontSize: 40
  },
  iconContainer: {
    width: width,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  icon: {
    width: width / 4,
    height: width / 4,
  },
  buttonGroup: {
    flexDirection: 'row',
    width: width / 2,
    margin: 'auto',
    justifyContent: 'space-around'
  }
})
