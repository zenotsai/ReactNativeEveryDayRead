import React, {
  AsyncStorage
}from 'react-native';
export default {
  constructor() {
  },
  get(key) {
    if(!key) {
      return null;
    }
    key = key.toString();
    return AsyncStorage.getItem(key).then((value)=>{
      if(value) {
        let obj = JSON.parse(value)
        return obj.data;
      }
      return null;
    }).catch(()=>{
      return null
    })
  },
  set(key, value) {
    if(!key) {
      return;
    }
    key = key.toString();
    AsyncStorage.setItem(key, JSON.stringify({
      data: value
    }));
  }
}