import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import { connect } from '@tarojs/redux'

import './index.less'
import { Counter, actions } from "../../models/global";

type PageOwnProps = {
  dispatch?: Function
}

type PageState = {
}

type IProps = Counter & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  ...counter
}))
class Index extends Component<IProps, PageState> {
  config: Config = {
    navigationBarTitleText: '我'
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>

      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
