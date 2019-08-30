import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider, connect } from '@tarojs/redux'
import "./config/taroConfig"

import dva from './utils/dva'
import models from './models'
import 'taro-ui/dist/style/index.scss'

import './assets/font/iconfont.css'
import './app.less'

import { actions, Global } from "./models/global";

type PageOwnProps = {
  dispatch?: Function
}

type PageState = {
}

type IProps = Global & PageOwnProps

const dvaApp = dva.createApp({
  namespacePrefixWarning: false,
  initialState: {},
  models: models,
});

const store = dvaApp.getStore();


class App extends Component<IProps, PageState> {

  config: Config = {
    pages: [
      'pages/loading/index',//加载页
      'pages/login/index',//登录页
      'pages/home/index',//首页
      'pages/report/index',//报表页
      'pages/profile/index',//用户页

      'pages/app/base/category/index',//存货分类
      'pages/app/base/category/create',//存货分类
      // 'pages/app/base/category/index',//存货分类
      
      'pages/app/base/customer/index',//客户管理
      'pages/app/base/product/index',//存货管理
      'pages/app/base/safetyStock/index',//安全库存
      'pages/app/base/supplier/index',//供应商管理
      'pages/app/base/unit/index',//计量单位
      'pages/app/base/warehouse/index',//仓库管理
    ],
    tabBar: {
      color: '#666',
      selectedColor: '#000',
      backgroundColor: '#fff',
      list: [
        {
          pagePath: 'pages/home/index',
          iconPath: 'assets/icons/home.png',
          selectedIconPath: 'assets/icons/home-active.png',
          text: '首页'
        },
        {
          pagePath: 'pages/report/index',
          iconPath: 'assets/icons/report.png',
          selectedIconPath: 'assets/icons/report-active.png',
          text: '报表'
        },
        {
          pagePath: 'pages/profile/index',
          iconPath: 'assets/icons/profile.png',
          selectedIconPath: 'assets/icons/profile-active.png',
          text: '我的'
        },
      ]
    },
    window: {
      backgroundColor: '#d8d8d8',
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount() {
    const { dispatch } = dvaApp;
    if (Taro.getStorageSync('token')) {
      dispatch!(actions.loadConfiguration());
    } else {
      Taro.reLaunch({
        url: 'pages/login/index'
      })
    }
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
