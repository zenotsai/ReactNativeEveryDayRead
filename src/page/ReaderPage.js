import React, { Component } from 'react';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemMenu from '../components/ItemMenu';
import ItemBg from '../components/ItemBg'
import {
  Platform,
  View,
  AsyncStorage,
  Button,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  WebView
} from 'react-native';
import DaoArticle from '../expand/dao/DaoArticle'
import Drawer from 'react-native-drawer'
import NavigtionBar from '../components/NavigationBar'
import FontSizeContro from '../components/FontSizeContro'
const styles = StyleSheet.create({
  endView: {
    borderStyle: 'solid',
    paddingTop: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderColor: '#666',
    borderBottomWidth: 1,
  },
  endText: {
    textAlign: 'center'
  },
  content: {
    marginTop: 20,
  },
  itemMenuTitle: {
    color: '#fff',
    height: 35,
    lineHeight: 35
  },
  author: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  title: {
    marginTop: 20,
    textAlign: 'center'
  },
  itemMenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menu: {
    justifyContent: "flex-end",
    margin: 0
  },
  menuContent: {
    height: 80,
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center'
  },

  cut: {
    height: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#999'
  },
  tips: {
    fontSize: 30,
  },
  bgList: {
    height: 100,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#8e949d',
    flexDirection: 'row'
  }
});

const MODE = {
  NIGHT: 1,
  DAY: 0
}
const dayStyle = {
  bgStyles: {
    backgroundColor: '#333'
  },
  title: {
    color: '#fff'
  },
  content: {
    color: '#fff'
  }

}
const sunStyle = {
  bgStyles: {
    backgroundColor: '#fff'
  },
  title: {
    color: '#333'
  },
  content: {
    color: '#333'
  }
}
const subMenuTye = {
  font: 1,
  bg: 2
}
export default class ReadPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fontSizeStyle: {
        endCountFontSize: 15,
        authorFontSize: 16,
        contentFontSize: 18,
        titleFontSize: 33,
      },
      modeStyle: {
        icon: 'moon-o',
        title: '夜间'
      },
      readStyle: {
        bgStyles: {
          backgroundColor: '#fff'
        }
      },
      article: null,
      modalVisible: false,
      title: '',
      hasLive: false,
      currShowMenu: -1,
      mode: MODE.DAY, // 1 夜间模式 0 日间模式
      thresholdFontSize: 2,
      bgStyles: [
        { title: '羊皮纸', bgColor: '#e5dfce' },
        { title: '淡雅白', bgColor: '#f6f4f0' },
        { title: '冰爽蓝', bgColor: '#c9e0ef' },
        { title: '浪漫粉', bgColor: '#e0b7c4' },
        { title: '护眼绿', bgColor: '#a5bd9c' }
      ]
    }
  }
  componentDidMount() {
    let article = this.props.navigation.getParam("article");
    if (article) {
      this.getArticle(DaoArticle.GetArtilceMethod.Date, article.date.curr)
      return;
    }
    this.getArticle(DaoArticle.GetArtilceMethod.ToDay);
  }
  getArticle(type, params) {
    DaoArticle.getArticle(type, params).then((result) => {
      this.setState({
        article: result.data
      })
      this.initLiveState();
    }).catch((e) => {
      console.log("error", e)
    })
  }
  async initLiveState() {
    if (this.state.article) {
      this.setState({
        hasLive: await DaoArticle.hasArticleCollected(this.state.article) != -1
      })
    }
  }
  onLiveToggle = () => {
    DaoArticle.collectArticle(this.state.article)
    this.setState({
      hasLive: !this.state.hasLive
    })
  }
  setBgStyles = (target) => {
    this.setState({
      readStyle: {
        bgStyles: {
          backgroundColor: target.bgColor
        },
        title: {
          color: '#333'
        },
        content: {
          color: '#333'
        }
      }
    });
  }
  getSubMenu = (type) => {
    if (type == subMenuTye.bg) {
      return <View style={styles.bgList}>
        {
          this.state.bgStyles.map((item) => {
            return <ItemBg onClick={this.setBgStyles.bind(this, item)} key={item.title} title={item.title} bgColor={item.bgColor}></ItemBg>
          })
        }
      </View>
    } else {
      return <FontSizeContro onFontSizeChange={this.onFontSizeChange}></FontSizeContro>
    }
  }
  onOpenMenuPanel = () => {
    this.setState({
      modalVisible: true
    })
  }
  onFontSizeChange = (activity) => {
    let newFontSizeStyle = Object.assign({}, this.state.fontSizeStyle);
    if (activity == 'sub') {
      for (let key in this.state.fontSizeStyle) {
        newFontSizeStyle[key] -= this.state.thresholdFontSize
      }
    } else {
      for (let key in this.state.fontSizeStyle) {
        newFontSizeStyle[key] += this.state.thresholdFontSize
      }
    }
    this.setState({
      fontSizeStyle: newFontSizeStyle
    });
  }
  onScroll = (e) => {
    let y = e.nativeEvent.contentOffset.y;
    if (y > 70) {
      if (this.state.title != this.state.article.title) {
        console.log("设置标题")
        this.setState({
          title: this.state.article.title
        })
      }
    } else {
      if (this.state.title == this.state.article.title) {
        this.setState({
          title: ''
        })
      }
    }
  }
  toggleDraw = () => {
    this.props.navigation.navigate('DrawerOpen')
  }
  /**
   * 日常夜间模式切换
   */
  onModeClickToggle = () => {
    let modeStyle = null;
    let targetStyle = null;
    if (this.state.mode == MODE.DAY) {
      modeStyle = {
        icon: 'moon-o',
        title: '夜间'
      }
      targetStyle = dayStyle;
    } else {
      modeStyle = {
        icon: 'sun-o',
        title: '日常'
      }
      targetStyle = sunStyle;
    }
    this.setState({
      modeStyle: modeStyle,
      readStyle: Object.assign({}, this.state.readStyle, targetStyle)
    })
    this.setState({
      mode: !this.state.mode
    })
  }
  onMenuClick = (type) => {
    this.setState({
      currShowMenu: type
    })
  }
  render() {
    return (
      <View style={[this.state.readStyle.bgStyles,{flex: 1}]}>
        <Modal
          swipeDirection="down"
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setState({ modalVisible: false })}
          style={styles.menu}>
          <View>
            {
              this.getSubMenu(this.state.currShowMenu)
            }
            <View style={styles.menuContent}>
              <ItemMenu onPress={this.onMenuClick.bind(this, subMenuTye.bg)} icon={'file-image-o'} title={'背景'}></ItemMenu>
              <ItemMenu onPress={this.onModeClickToggle} icon={this.state.modeStyle.icon} title={this.state.modeStyle.title}></ItemMenu>
              <ItemMenu onPress={this.onMenuClick.bind(this, subMenuTye.font)} icon={'font'} title={'字体'}></ItemMenu>
              <ItemMenu onPress={this.onLiveToggle} icon={this.state.hasLive ? 'heart' : 'heart-o'} title={'喜欢'}></ItemMenu>
            </View>
          </View>
        </Modal>
        <NavigtionBar
          rightButton={
            <TouchableOpacity onPress={this.getArticle.bind(this, DaoArticle.GetArtilceMethod.Random)}>
              <Icon name='random' size={25} color={'#999'}/>
            </TouchableOpacity>
          }
          leftButton={
            <TouchableOpacity onPress={this.toggleDraw}>
              <Image
                style={{ width: 28, height: 22, margin: 5 }}
                source={require('../res/images/icon_menu.png')}>
              </Image>
            </TouchableOpacity>
          }
          navBar={{
            backgroundColor: this.state.readStyle.bgStyles.backgroundColor
          }}
          title={this.state.title}
          statusBar={{
            backgroundColor: this.state.bgColor
          }}
        />

        <ScrollView
          style={{ padding: 5 }}
          scrollEventThrottle={100}
          onScroll={this.onScroll}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.onOpenMenuPanel}>
            <View
              style={{ flex: 1 }} >
              <Text style={[styles.title, this.state.readStyle.title, { fontSize: this.state.fontSizeStyle.titleFontSize}]}>{this.state.article && this.state.article.title}</Text>
              <Text style={[styles.author, { fontSize: this.state.fontSizeStyle.authorFontSize, }]}>{this.state.article && this.state.article.author}</Text>
              <View style={styles.cut}></View>
              <Text style={[styles.content, this.state.readStyle.content, { fontSize: this.state.fontSizeStyle.contentFontSize, lineHeight: this.state.fontSizeStyle.titleFontSize + 10 }]}>{this.state.article && this.state.article.content}</Text>
            </View>
            {
              this.state.article && (<View style={styles.endView}>
                <Text style={[styles.endText, { fontSize: this.state.fontSizeStyle.endCountFontSize }]}>
                  全文完  共{this.state.article.wc}字
                </Text>
              </View>)
            }
            <View style={{ height: 100 }}></View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}