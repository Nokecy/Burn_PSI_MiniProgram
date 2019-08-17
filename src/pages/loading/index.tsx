import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtToast } from 'taro-ui'

class Index extends Component<any, any> {
  config: Config = {
    navigationBarTitleText: '加载中'
  }

  componentWillReceiveProps(_nextProps) { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View style={{ height: "100%", width: "100%" }}>
        <AtToast isOpened={true} duration={0} text="加载中" status={"loading"}></AtToast>
      </View>
    )
  }
}

export default Index as ComponentClass<any, any>
