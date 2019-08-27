import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { CategoryProps } from "./category.model";
import { AtList, AtListItem } from 'taro-ui';
import { UnitServiceProxy } from "../../../../services/service-proxies";

type PageOwnProps = {
    dispatch?: Function
}

type PageState = {
}

type IProps = CategoryProps & PageOwnProps

@connect(({ category }) => ({
    ...category
}))
class Category extends Component<IProps, PageState> {
    config: Config = {
        navigationBarTitleText: '存货分类'
    }

    componentDidMount() {
        new UnitServiceProxy().getList(undefined, 30, 0, undefined);
    }

    componentWillReceiveProps(_nextProps) { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        const array: any[] = [];
        for (let index = 0; index < 100; index++) {
            array.push(index);
        }
        return (
            <View>
                <AtList>
                    {
                        array.map(a => <AtListItem
                            title='标题文字'
                            note='描述信息'
                            extraText='详细信息'
                            arrow='right'
                            thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
                        />)
                    }
                </AtList>
            </View>
        )
    }
}

export default Category as ComponentClass<PageOwnProps, PageState>
