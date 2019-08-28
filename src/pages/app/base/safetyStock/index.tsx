import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { SafetyStockProps, actions } from "./safetyStock.model";
import { AtList, AtListItem, AtSearchBar, AtMessage } from 'taro-ui';

type PageOwnProps = {
    dispatch?: Function
}

type PageState = {
    value: string
}

type IProps = SafetyStockProps & PageOwnProps

@connect(({ safetyStock }) => ({
    ...safetyStock
}))
class SafetyStock extends Component<IProps, PageState> {
    config: Config = {
        navigationBarTitleText: '安全库存',
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
                            list!.map(a => <AtListItem key={a.id}
                                title={a.product!.name}
                                note={a.product!.spec}
                                extraText={a.maxQuantity!.toString()}
                                arrow='right' />)
                        }
                    </AtList>
                </View>
            </View>
        )
    }
}

export default SafetyStock as ComponentClass<PageOwnProps, PageState>
