import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class LineSeparator extends React.Component {
    render() {
      const {text, style, textStyle} = this.props;
      return (
        <View style={[styles.separatorContainer, style ? style : null]}>
          <View style={styles.separatorLine}/>
          <Text style={[styles.separatorText, textStyle ? textStyle : null]}>{this.props.text}</Text>
          <View style={styles.separatorLine}/>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  separatorLine: {
    flex: 2,
    borderBottomWidth: 1,
  },
  separatorText: {
    marginHorizontal: 5
  },
})
