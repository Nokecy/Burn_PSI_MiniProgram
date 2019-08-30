import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker, Label, Text } from '@tarojs/components'
import { AtInput, AtForm, AtMessage, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { CategoryProps, actions } from "./category.model";
import CategoryPicker from "../../../../components/categoryPicker";

type PageOwnProps = {
    dispatch?: Function
}

type PageState = {
    name?: string
    value?: string,
    showValue?: string
}

type IProps = CategoryProps & PageOwnProps

@connect(({ category }) => ({
    ...category
}))
class Create extends Component<IProps, PageState> {
    config: Config = {
        navigationBarTitleText: '创建存货分类'
    }

    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            value: undefined,
            showValue: undefined
        }
    }

    handleChange = (value) => {
        this.setState({
            name: value
        })
        return value
    }

    onSubmit(_event) {
        const { name, value } = this.state;
        const { dispatch } = this.props;
        if (!name || !value) {
            Taro.atMessage({ message: "提交参数错误", type: "error" });
            return;
        }
        let dto: any = { name: name, parentId: value };
        dispatch!(actions.create(dto));
    }

    onChange = (value, showValue) => {
        this.setState({
            value: value,
            showValue: showValue
        })
    }

    render() {
        const { value, showValue } = this.state;
        return (
            <View>
                <AtMessage />

                <AtForm onSubmit={this.onSubmit.bind(this)}>
                    <AtInput
                        title={"名称"}
                        name='name'
                        type='text'
                        placeholder="名称"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />

                    <CategoryPicker onChange={this.onChange} value={value} showValue={showValue} />

                    <AtButton type={"primary"} formType='submit'>提交</AtButton>

                </AtForm>
            </View>
        )
    }
}

export default Create;
