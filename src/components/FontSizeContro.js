import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
export default class FontSizeContro extends Component {
  constructor(props) {
    super(props);
  }
  eventFontSizeChange(activity) {
    this.props.onFontSizeChange && this.props.onFontSizeChange(activity);
  }
  render() {
    return (
      <View style={fontSizeContrStyles.content}>
        <TouchableOpacity style={fontSizeContrStyles.controBtn} onPress={this.eventFontSizeChange.bind(this, 'add')}>
          <Text color={'#999'} style={fontSizeContrStyles.itemBtn} >加大</Text>
        </TouchableOpacity>
        <TouchableOpacity style={fontSizeContrStyles.controBtn} onPress={this.eventFontSizeChange.bind(this, 'sub')}>
          <Text color={'#999'} style={fontSizeContrStyles.itemBtn} >减小</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const fontSizeContrStyles = StyleSheet.create({
  content: {
    width: '100%',
    justifyContent: 'space-around',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#999',
  },
  controBtn: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#fff',
  },
  itemBtn: {
   
    
    textAlign: 'center',
  },
})