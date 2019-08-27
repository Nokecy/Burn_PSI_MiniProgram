import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.less'
import { Counter } from "../../models/global";
import { AtGrid } from 'taro-ui';
import MainMenus from "../../config/mainMenu";

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
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps(_nextProps) { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View>
        {
          MainMenus.map(mainMenu => (<View>
            <View>
              <Text
                style={{
                  fontSize: "14px",
                  paddingLeft: "12px",
                  fontWeight: "bold", color: "#000"
                }}>
                {mainMenu.title}
              </Text>
            </View>
            <AtGrid mode={"square"}
              hasBorder={false}
              data={mainMenu.menus}
              onClick={(item: any) => {
                Taro.navigateTo({ url: item.url });
              }} />
          </View>)
          )
        }
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
