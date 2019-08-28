import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { UnitProps, actions } from "./unit.model";
import { AtList, AtListItem, AtSearchBar, AtMessage } from 'taro-ui';

type PageOwnProps = {
    dispatch?: Function
}

type PageState = {
    value: string
}

type IProps = UnitProps & PageOwnProps

@connect(({ unit }) => ({
    ...unit
}))
class Unit extends Component<IProps, PageState> {
    config: Config = {
        navigationBarTitleText: '计量单位管理',
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
                                title={a.name}
                                arrow='right' />)
                        }
                    </AtList>
                </View>

            </View>
        )
    }
}

export default Unit as ComponentClass<PageOwnProps, PageState>
