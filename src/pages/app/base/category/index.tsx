import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { CategoryProps, actions } from "./category.model";
import { AtList, AtListItem, AtSearchBar, AtMessage } from 'taro-ui';

type PageOwnProps = {
    dispatch?: Function
}

type PageState = {
    value: string
}

type IProps = CategoryProps & PageOwnProps

@connect(({ category }) => ({
    ...category
}))
class Category extends Component<IProps, PageState> {
    config: Config = {
        navigationBarTitleText: '存货分类',
        enablePullDownRefresh: true
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch!(actions.query());
    }

    onPullDownRefresh() {
        const { dispatch } = this.props;
        dispatch!(actions.query());
    }

    onReachBottom() {
        const { dispatch } = this.props;
        dispatch!(actions.query());
    }

    onActionClick() {
        console.log("开始搜索")
    }

    render() {
        const { list } = this.props;
        return (
            <View>
                <AtMessage />

                <AtSearchBar
                    fixed={true}
                    actionName="搜一下"
                    value={this.state.value}
                    onChange={(value) => { this.setState({ value: value }) }}
                    onActionClick={this.onActionClick.bind(this)}
                />
                <View style='margin-top:42px;'>
                    <AtList>
                        {
                            list!.map(a => <AtListItem key={a.id} title={a.name} note={a.parentName} arrow='right' />)
                        }
                    </AtList>
                </View>
            </View>
        )
    }
}

export default Category as ComponentClass<PageOwnProps, PageState>
