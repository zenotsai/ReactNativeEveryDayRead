import Icon from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  itemMenuTitle: {
    color: '#fff',
    height: 35,
    lineHeight: 35
  },
  itemMenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    textAlign: 'center',
  }
})
export default class ItemMenu extends Component{
  eventClick = () => {
    this.props.onPress()
  }
  render() {
    return (
      <TouchableOpacity onPress={this.eventClick}  style={styles.itemMenu}>
        <View style={styles.itemMenu}>
          <Icon name={this.props.icon} size={25} color={'#3e9ce9'} />
          <Text style={styles.itemMenuTitle}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}