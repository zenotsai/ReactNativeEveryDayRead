import React from 'react'
import { AppRegistry, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { DrawerItems, DrawerNavigator } from 'react-navigation'
import ReaderPage from './page/ReaderPage'
import CollectList from './page/CollectList'
const everyDayRead = DrawerNavigator({
  ReadPage: {
    screen: ReaderPage,
    navigationOptions: {
      title: '阅读'
    }
  },
  CollectList: {
    screen: CollectList,
    navigationOptions: {
      title: '我的收藏'
    }
  }
}, {
    contentComponent: props => {
      return (
        <ScrollView>
          <View style={{ height: 200, alignItems: 'center', justifyContent: 'center', }}>
            <Image style={{ height: 110, width: 200 }} resizeMode={"stretch"} source={require('./res/images/head.png')} />
          </View>
          <DrawerItems {...props} />
        </ScrollView>
      )
    }
  });

export default everyDayRead;