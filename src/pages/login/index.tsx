import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtForm, AtButton, AtInput, AtIcon, AtToast } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { LoginState, actions } from "./login.model";

type PageOwnProps = {
    dispatch?: Function
    authenticateLoading?: boolean
}

type PageState = {
    userName?: string,
    password?: string,
}

type IProps = LoginState & PageOwnProps

@connect(({ login, loading }) => ({
    ...login,
    authenticateLoading: loading.effects["login/authenticate"]
}))
class Index extends Component<IProps, PageState> {

    config: Config = {
        navigationBarTitleText: '用户名密码登录'
    }

    componentWillReceiveProps(_nextProps) { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    onSubmit = (_event) => {
        this.props.dispatch!(actions.authenticate({ userName: this.state.userName!, password: this.state.password! }))
    }

    handleUserNameChange = (value) => {
        this.setState({ userName: value })
    }

    handlePasswordChange = (value) => {
        this.setState({ password: value })
    }

    render() {
        return (
            <View style={{ marginLeft: 20, marginRight: 20, textAlign: "center", justifyContent: "start" }}>

                <AtIcon prefixClass='icon' value='logo' size='180' color={"#1296db"}></AtIcon>

                <AtForm onSubmit={this.onSubmit}>
                    <AtInput name='userName' title='登录名:' type='text' placeholder='登录名或邮箱号码'
                        value={this.state.userName}
                        focus={true}
                        onChange={this.handleUserNameChange}
                    />
                    <AtInput name='password' title='密码:' type='password' placeholder='密码' value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                    <AtButton formType='submit' type={"primary"} disabled={!this.state.userName || !this.state.password}>登 录</AtButton>
                </AtForm>

                <AtToast isOpened={this.props.authenticateLoading!} duration={0} text="登陆中" status={"loading"}></AtToast>
            </View>
        )
    }
}
export default Index as ComponentClass<PageOwnProps, PageState>
