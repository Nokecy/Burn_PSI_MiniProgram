import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { UnitProps, actions } from "./unit.model";
import { AtList, AtListItem, AtSearchBar, AtMessage, AtFab, AtModal, AtModalHeader, AtModalContent, AtInput, AtModalAction } from 'taro-ui';
import { UnitDto } from 'src/services/service-proxies';
import UnitGroupPicker from "../../../../components/unitGroupPicker/index";

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

    onOpenOrHideModal = (editEntity?: UnitDto) => {
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
                    <AtModalHeader>添加新计量单位</AtModalHeader>
                    <AtModalContent>

                        <UnitGroupPicker
                            showValue={entity ? entity.groupName : undefined}
                            value={entity ? entity.groupName : undefined}
                            onChange={(value) => {
                                const { dispatch, entity } = this.props;
                                let unit: any = { ...entity, groupName: value };
                                dispatch!(actions.updateState({ entity: unit }))
                            }} />

                        <AtInput title={"名称"} name={"name"} placeholder={"输入计量单位名称"}
                            value={entity ? entity.name : undefined}
                            onChange={(value) => {
                                const { dispatch, entity } = this.props;
                                let unit: any = { ...entity, name: value };
                                dispatch!(actions.updateState({ entity: unit }))
                            }} />

                        <AtInput
                            type='digit'
                            title={"换算率"}
                            name={"rate"}
                            placeholder={"输入计量单位名称"}
                            value={entity ? entity.rate : 0}
                            onChange={(value) => {
                                const { dispatch, entity } = this.props;
                                let unit: any = { ...entity, rate: value };
                                dispatch!(actions.updateState({ entity: unit }))
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

export default Unit as ComponentClass<PageOwnProps, PageState>
