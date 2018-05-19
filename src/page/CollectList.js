import React, { Component } from 'react';
import NavigtionBar from '../components/NavigationBar'
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  ScrollView,
  WebView
} from 'react-native';
const collectItemStyle = StyleSheet.create({
  item: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    color: '#333'
  },
  separator: {
    height: 0.5,
    backgroundColor: '#666'
  },
  author: {
    paddingLeft: 10,
    fontSize: 12,
    color: '#666',
  }
})
import DaoArticle from '../expand/dao/DaoArticle'
export default class AnimPage extends Component {
  static navigationOptions = {
    title: 'Details',
  };
  componentDidMount(){
    DaoArticle.getCollectArticle().then((value)=>{
      this.setState({
        collectList: value
      })
    })
  }
  getCollectItem(props) {
    return (
      <TouchableOpacity  style={collectItemStyle.item} onPress={this.gotoArticle.bind(this, props)}>
          <Text style={collectItemStyle.name}>{props.title}</Text>
          <Text style={collectItemStyle.author}>{props.author}</Text>
      </TouchableOpacity>
    )
  }
  gotoArticle = (article) => {
    //接口有问题，暂不可点击跳转。
    return;
    this.props.navigation.navigate('ReadPage', {
      article
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      collectList: []
    };
  }
  back = () => {
    this.props.navigation.goBack();
  }
  render() {
    let leftBackBtn = 
    <TouchableOpacity
      style={{padding: 8}}
      onPress={this.back}>
      <Image style={{width: 26, height: 26,}} source={require('../res/images/ic_arrow_back_white_36pt.png')}/>
    </TouchableOpacity>
    return (
      <View>
        <NavigtionBar
          titleStyle={{
            color: '#fff'
          }}
          navBar={{
            backgroundColor: '#3e9ce9'
          }}
          leftButton={
            leftBackBtn
          }
          title={'我的收藏'}
          statusBar={{
          }}>
        </NavigtionBar>
        <FlatList
          ItemSeparatorComponent={()=> <View style={collectItemStyle.separator}></View>}
          data={this.state.collectList}
          keyExtractor={(item, index) => item.date.curr}
          renderItem={({ item }) => this.getCollectItem(item)}
        />
      </View>
    )
  }
}