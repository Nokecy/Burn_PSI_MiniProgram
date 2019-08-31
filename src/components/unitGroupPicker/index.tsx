import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker, Label } from '@tarojs/components'
import { UnitServiceProxy as ServiceProxy, ProductCategoryDto } from "../../services/service-proxies";

import "./index.less";
import { AtIcon } from 'taro-ui';
type IProps = {
    value?: string
    showValue: any
    onChange: Function
}
type PageState = {
    range: string[]
}

class UnitGroupPicker extends Component<IProps, PageState> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        new ServiceProxy().getGroups()
            .then(value => {
                this.setState({ range: value })
            })
    }

    onChange = (event: any) => {
        const { range } = this.state;
        const { onChange } = this.props;
        let index = event.currentTarget.value;
        let value = range[index];
        let showValue = range[index];
        onChange && onChange(value, showValue);
    }

    render() {
        const { value, showValue } = this.props;
        let index = value ? this.state.range.findIndex(a => a == value) : 0;
        return (
            <View style={{ display: "flex", flexDirection: "row", marginLeft: "32rpx" }}>
                <Label className={"title"}>选择组</Label>
                <View style={{ flex: 1 }}>
                    <Picker
                        mode='selector'
                        range={this.state.range}
                        onChange={this.onChange}
                        value={index}>
                        {
                            !showValue ? (<View className="label">
                                <Text>选择组</Text>
                                <AtIcon value='chevron-right'></AtIcon>
                            </View>) : (<View className="picker-item">
                                <Text>{showValue}</Text>
                                <AtIcon value='chevron-right'></AtIcon>
                            </View>)
                        }
                    </Picker>
                </View>
            </View>
        )
    }
}

export default UnitGroupPicker;
