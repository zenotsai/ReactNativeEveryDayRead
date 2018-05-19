import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  View,
  StatusBar,
  Text,
  Image,
  StyleSheet,
  Platform
} from 'react-native';

const NAV_BAR_HEIGHT_ANDROID = 50; //ANDROID下的高度
const NAV_BAR_HEIGHT_IOS = 44; // IOS下的高度
const STATUS_BAR_HEIGHT = 20;// 状态栏的高度
const StatusBarShape = {
  backgroundColor: PropTypes.string,
  barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
  hidden: PropTypes.bool
}
export default class NavigationBar extends Component {
  static propTypes = {
    style: View.propTypes.style,
    title: PropTypes.string,
    titleView: PropTypes.element,
    hide: PropTypes.bool,
    leftButton: PropTypes.element,
    rightButton: PropTypes.element,
    statusBar: PropTypes.shape(StatusBarShape)
  }
  static defaultProps = {
    statusBar: {
      barStyle: 'light-content',
      hidden: false,
      backgroundColor: '#f00'
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      hide: false
    }
  }
  render() {
    let statusBar = <View style={[styles.statusBar,this.props.statusBar]}>
                      <StatusBar {...this.props.statusBar} idden={true}/>
                    </View>
    let titleView = this.props.titleView ? this.props.titleView : 
    <Text style = {[styles.title,this.props.titleStyle]}>{this.props.title}</Text>
    let content = <View style={[styles.navBar, this.props.navBar]}>
                    {this.props.leftButton}
                    <View style={[styles.titleViewContainer]}>
                      {titleView}
                    </View>
                    {this.props.rightButton}
                  </View>
    return (
      <View style={[styles.container,this.props.style]}>
        {statusBar}
        {content}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f00'
  },
  navBar: {
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  titleViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0
  },
  statusBar: {
    // height: Platform.OS === 'ios'?STATUS_BAR_HEIGHT:0
    height: 0
  },
  title: {
    fontSize: 20,
    color: '#333'
  }
})