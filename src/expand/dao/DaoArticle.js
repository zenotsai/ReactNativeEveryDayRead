import React, {
  AsyncStorage
} from 'react-native';
import axios from 'axios'
import LocalStorageUtils from '../../common/LocalStorageUtils'
// 每日一文
const toDay_url = "https://www.easy-mock.com/mock/5b0029ac8aca094b58bb0c9e/dev/today#!method=get";
// 随机一文
const random_url = 'https://www.easy-mock.com/mock/5b0029ac8aca094b58bb0c9e/dev/random#!method=get';
export default {
  COLLECT_KEY: "_TODAY_ARTICLE_01",
  COLLECTTOP_KEY: "_TODAY_ARTICLE_02",
  GetArtilceMethod: {
    Random: 1,
    ToDay: 2,
    Date: 3
  },
  /**
   * 已收藏的文章牵引
   */
  setCollectToc(value) {
    this.getCollectToc().then((currCollect) => {
      if (!currCollect) {
        currCollect = new Array();
      }
      currCollect.push(value);
      LocalStorageUtils.set(this.COLLECTTOP_KEY, currCollect);
    })
  },
  createdTocStr(article) {
    return `${article.title}-${article.author}`
  },
  async getCollectToc() {
    return LocalStorageUtils.get(this.COLLECTTOP_KEY).then((value) => {
      return value;
    }).catch(() => {
      return null;
    });
  },
  /**
   * 文章是否已经被收藏过
   */
  async hasArticleCollected({ date, title, author }) {
    let collectList = await this.getCollectArticle();
    let existIndex = -1;
    if (collectList) {
      collectList.forEach((item, index) => {
        if (item.date.curr == date.curr) {
          existIndex = index;
          return;
        }
      })
    }
    return existIndex;
  },
  /**
   * 收藏文章
   */
  async collectArticle(article) {
    let collectList = await this.getCollectArticle();
    let existIndex = await this.hasArticleCollected(article);
    if (!collectList) {
      collectList = new Array();
    }
    if (existIndex != -1) {
      collectList.splice(existIndex, 1);
    } else {
      collectList.push({
        title: article.title,
        date: article.date,
        author: article.author
      })
    }
    LocalStorageUtils.set(this.COLLECT_KEY, collectList);
  },
  /**
   * 获取收藏的所有文章
   */
  getCollectArticle() {
    return LocalStorageUtils.get(this.COLLECT_KEY).then((value) => {
      return value;
    }).catch(() => {
      return null;
    });
  },
  getArticleByTagrteDate(date) {
    const url = `https://interface.meiriyiwen.com/article/day?dev=1&date=${date}`;
    return this._getArticle(url);
  },
  getArticle(type, params) {
    switch (type) {
      case this.GetArtilceMethod.Random:
        return this._getArticle(random_url);
      case this.GetArtilceMethod.ToDay:
        return this._getArticle(toDay_url);
      case this.GetArtilceMethod.Date:
        return this.getArticleByTagrteDate(params)
    }
  },
  _getArticle(url) {
    return new Promise((resolve, reject) => {
      fetch(url).then((response) => {
        return response.json();
      }).then(result => {
        result.data.content = result.data.content.replace(/<p>/g, "");
        result.data.content = result.data.content.replace(/<\/p>/g, "\n");
        resolve(result);
      }).catch(error => {
        console.log(error);
        reject(error);
      })
    })
  }
}