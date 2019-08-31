import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { WarehouseProps, actions } from "./warehouse.model";
import { AtList, AtListItem, AtSearchBar, AtMessage, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput, AtFab } from 'taro-ui';
import { WarehouseDto } from 'src/services/service-proxies';

type PageOwnProps = {
    dispatch?: Function
}

type PageState = {
    value: string
}

type IProps = WarehouseProps & PageOwnProps

@connect(({ warehouse }) => ({
    ...warehouse
}))
class Warehouse extends Component<IProps, PageState> {
    config: Config = {
        navigationBarTitleText: '仓库管理',
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

    onOpenOrHideModal = (editEntity?: WarehouseDto) => {
        const { dispatch, openModal } = this.props;
        dispatch!(actions.updateState({ openModal: !openModal, entity: editEntity }))
    }

    render() {
        const { dispatch, list, openModal, entity } = this.props;
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
                                onClick={() => {
                                    this.onOpenOrHideModal(a);
                                }}
                                title={a.name}
                                arrow='right' />)
                        }
                    </AtList>
                </View>

                <View style={{ position: "fixed", bottom: "16px", right: "16px" }}>
                    <AtFab onClick={() => { this.onOpenOrHideModal() }}>
                        <Text className='at-fab__icon at-icon at-icon-add'></Text>
                    </AtFab>
                </View>

                <AtModal
                    isOpened={openModal!}>
                    <AtModalHeader>添加新仓库</AtModalHeader>
                    <AtModalContent>
                        <AtInput title={"名称"} name={"name"} placeholder={"输入仓库名称"}
                            value={entity ? entity.name : undefined}
                            onChange={(value) => {
                                const { dispatch, entity } = this.props;
                                let warehouse: any = { ...entity, name: value };
                                dispatch!(actions.updateState({ entity: warehouse }))
                            }} />
                    </AtModalContent>
                    <AtModalAction>
                        <Button
                            onClick={() => { this.onOpenOrHideModal() }}>取消</Button>
                        <Button
                            onClick={() => {
                                const { entity } = this.props;
                                if (!entity || !entity.name) {
                                    Taro.atMessage({ message: "参数错误", type: "error" });
                                    return;
                                }
                                let warehouse: any = { name: entity.name }
                                dispatch!(actions.create(warehouse));
                            }}>确定</Button>
                    </AtModalAction>
                </AtModal>
            </View>
        )
    }
}

export default Warehouse as ComponentClass<PageOwnProps, PageState>
