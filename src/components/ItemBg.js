import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  itemBg: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bg: {
    borderRadius: 10,
    width: 45,
    height: 45,
  },
  title: {
    lineHeight: 25
  }
})
export default class ItemBg extends  Component {
  eventClick = () => {
    this.props && this.props.onClick()
  }
  render() {
    return (
      <TouchableOpacity onPress={this.eventClick} style={styles.itemBg}>
        <View style={styles.itemBg}>
          <View style={[styles.bg,{ backgroundColor: this.props.bgColor}]}></View>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}