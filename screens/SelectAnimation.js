import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
  TextInput,
  Button,
  Picker
} from 'react-native'

import SelectButton from '../components/SelectButton';
import LineSeparator from '../components/LineSeparator';

export default class SelectAnimation extends Component {
  state = {
    name: "",
    type: ""
  }

  static defaultProps = {}

  constructor(props) {
    super(props);

    this.handleEventName = this.handleEventName.bind(this);
    this.handleEventType = this.handleEventType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEventName(text) {
    this.setState({name: text});
  }

  handleEventType(value) {
    this.setState({type: value});
  }

  handleSubmit() {
    const { name, type } = this.state;

    this.props.initVote(name, type);
  }

  render() {
    const { type } = this.state;

    return (
      <View style={styles.container}>

        <View>
          <LineSeparator style={{marginBottom: 15}} text="TYPE DE L'ÉVENEMENT"/>
          <SelectEventType type={type} handleChange={this.handleEventType}/>
        </View>

        <View style={{width: "100%"}}>
          <LineSeparator style={{marginBottom: 15}} text="NOM DE L'ÉVENEMENT"/>
          <TextInput
            onChangeText={(text) => this.handleEventName(text)}
            value={this.state.name}
            style={styles.input}
            placeholder="Entrez un nom..."
          />
        </View>

        <Button color="#1194f6" style={styles.button} title="LANCER LE VOTE" onPress={this.handleSubmit}/>

      </View>
    )
  }
}

const SelectEventType = props => {
  const { type } = props;

  return (
    <View style={{flexDirection: 'row', width: "100%", justifyContent: 'space-around'}}>

      <SelectButton
        title="REPAS"
        value="repas"
        color="#841584"
        selectedValue={type}
        anySelected={type === ""}
        handleChange={props.handleChange}
      />

      <SelectButton
        title="ANIMATION"
        value="animation"
        color="#841584"
        selectedValue={type}
        anySelected={type === ""}
        handleChange={props.handleChange}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: '100%',
    backgroundColor: '#FFF',
    alignItems: "center",
    justifyContent: "space-around",
    margin: 'auto',
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
     width: 0,
     height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#f4f5f5",
    backgroundColor: "#f8f9fb",
    borderRadius: 5
  },
  button: {

  }
})
