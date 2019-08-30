import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker, Label } from '@tarojs/components'
import { ProductCategoryServiceProxy as ServiceProxy, ProductCategoryDto } from "../../services/service-proxies";

import "./index.less";
import { AtIcon } from 'taro-ui';
type IProps = {
    value?: string
    showValue: any
    onChange: Function
}
type PageState = {
    range: ProductCategoryDto[]
}

class CategoryPicker extends Component<IProps, PageState> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        new ServiceProxy().getList(undefined, 30, 0, undefined).then(value => {
            this.setState({ range: value.items! })
        })
    }

    onChange = (event: any) => {
        const { range } = this.state;
        const { onChange } = this.props;
        let index = event.currentTarget.value;
        let value = range[index].id;
        let showValue = range[index].name;
        onChange && onChange(value, showValue);
    }

    render() {
        const { value, showValue } = this.props;
        let index = value ? this.state.range.findIndex(a => a.id == value) : 0;
        return (
            <View style={{ display: "flex", flexDirection: "row", marginLeft: "32rpx" }}>
                <Label className={"title"}>选择分类</Label>
                <View style={{ flex: 1 }}>
                    <Picker
                        mode='selector'
                        range={this.state.range}
                        rangeKey={"name"}
                        onChange={this.onChange}
                        value={index}>
                        {
                            !showValue ? (<View className="label">
                                <Text>选择分类</Text>
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

export default CategoryPicker;
