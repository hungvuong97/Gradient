import React from 'react';
import { SketchPicker } from 'react-color';
import "./style.css"
const WIDTH_SLIDER = 500;
export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            range: {
                1: {
                    offsetX: 15,
                    r: 34,
                    g: 27,
                    b: 32,
                    a: 1,
                    hex: '#221B20'
                },
                2: {
                    offsetX: 50,
                    r: 134,
                    g: 57,
                    b: 62,
                    a: 1,
                    hex: '#86393E'
                }
            },
            background: { rgba: { r: 164, g: 26, b: 58, a: 1 }, hex: '#A41A3A' },
            rangeVal: '1',
            move: false
        }
        this.isDragging = false;
    }

    onMouseDown = value => event => {
        event.preventDefault();
        const obj = this;
        // this.setState({ move: true })
        let range = this.state.range
        let shiftX = event.clientX - this.refs[value].getBoundingClientRect().left; // lấy khoảng cách giữa thumb và đầu slider
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        function onMouseMove(event) {
            let newLeft = event.clientX - shiftX - obj.slider.getBoundingClientRect().left; // độ dịch chuyển mới so với vị trị cũ của thumb
            // console.log(event.clientX, shiftX, obj.slider.getBoundingClientRect().left)
            if (newLeft < 0) {
                newLeft = 0;
            }
            let rightEdge = obj.slider.offsetWidth - obj.refs[value].offsetWidth; // tinhs độ dài của slider nếu thumb di chuyển vượt quá slider
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }
            range[value].offsetX = newLeft;

            obj.setState({ range: range })

            obj.refs[value].style.left = newLeft + 'px';
            this.isDragging = true;

        }

        function onMouseUp(e) {
            // setTimeout(obj.setState({ move: true }), 10000)
            // obj.setState({ move: false })
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }




    }

    //hàm xử lý màu của react-color, đồng thời lấy màu hiện tại của bảng màu.
    handleChangeComplete = (color) => {
        let temp = this.state.range;
        let range_val = this.state.rangeVal;
        //
        temp[this.state.rangeVal] = {
            offsetX: this.state.range[range_val].offsetX,
            r: color.rgb.r,
            g: color.rgb.g,
            b: color.rgb.b,
            a: color.rgb.a,
            hex: color.hex
        }
        let background = this.state.background;
        background.rgba = color.rgb;
        background.hex = color.hex;
        this.setState({ background: background, range: temp });
    };
    // sự kiện click vào slider để thêm thumb mới.
    onDoubleClick = (e) => {

        if (!this.isDragging) {
            let offset = Math.round(e.nativeEvent.offsetX / 5); //lấy vị trí hiện tại trên thanh slider
            if (offset < 0) offset = 0;
            if (offset > WIDTH_SLIDER) offset = WIDTH_SLIDER;
            const arrayRanges = Object.values(this.state.range);
            // tìm xem thumb đã có trong object range
            for (let i = 0; i < arrayRanges.length; i++) {
                var isExist = Object.values(arrayRanges[i]).find(e => e === offset);
            }
            if (!isExist) {
                let range = Object.entries(this.state.range);
                let index = range[range.length - 1][0]
                const key = `${parseInt(index) + 1}`;
                var newRange = this.state.range;
                let background = this.state.background;
                Object.assign(newRange, {
                    [key]: {
                        offsetX: offset,
                        r: background.rgba.r,
                        g: background.rgba.g,
                        b: background.rgba.b,
                        a: background.rgba.a,
                        hex: background.hex,
                    }
                });
                this.setState({
                    range: newRange,
                    rangeVal: key
                })
            }
        }


    }

    // hàm lấy thumb hiện tại khi click vào
    onClickThumb = (value) => {
        this.setState({
            rangeVal: value

        })
    }

    // hàm xóa thumb khỏi slider và màu khỏi bảng màu
    deleteColor = (offsetX) => {
        let range = this.state.range;
        let objectRange = Object.entries(range);
        let length = objectRange.length;
        let index = objectRange.filter(val => (val[1].offsetX == offsetX && length > 2)); // lấy index của màu cần xóa trong object range và điều kiện là độ  dài của range trên 2
        if (index.length > 0) {
            delete range[index[0][0]];
            let offsetMax = Object.values(range).sort(this.sort_by('offsetX', true, parseInt));
            let rangeVal = objectRange.filter(val => val[1].offsetX == offsetMax[0].offsetX);
            this.setState({ range: range, rangeVal: rangeVal[0][0] })
        }
    }
    // hàm sắp xếp object, với đầu vào là filed là trường cần mong muốn sắp xếp, reverse dưới dạng boolean có muốn sắp xếp ngưowjc hay không, trường primer là trường định dạng giá trị của trường field là int hay float.... 
    sort_by = (field, reverse, primer) => {
        const key = primer ?
            function (x) {
                return primer(x[field])
            } :
            function (x) {
                return x[field]
            };

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }
    // hàm hiển thị các giá trị của bảng màu.
    table = () => {
        let range = this.state.range
        console.log(Object.values(range).sort())
        let fillTable = Object.values(range).sort(this.sort_by('offsetX', true, parseInt));
        return (

            Object.values(fillTable).map((val, index) => {
                return (
                    <tr>
                        <td style={{ background: val.hex, width: '2px', height: '2px' }}></td>
                        <td>{val.hex}</td>
                        <td>{val.offsetX / 5}</td>
                        <td><button onClick={() => this.deleteColor(val.offsetX)}>Delete</button></td>
                    </tr>
                )
            })
        )
    }

    render() {
        const { range } = this.state;
        let val = Object.values(range);
        let background_i = 'linear-gradient(to right, ';
        let background = '-webkit-linear-gradient(285deg, ';
        let color_val = val.sort(this.sort_by('offsetX', true, parseInt));
        for (var i = color_val.length - 1; i >= 0; i--) {
            background_i = background_i + `rgba(${color_val[i].r},${color_val[i].g},${color_val[i].b}, ${color_val[i].a}),`
            background = background + `rgba(${color_val[i].r},${color_val[i].g},${color_val[i].b},${color_val[i].a}) ${color_val[i].offsetX / 5}%,`
        }
        background_i = background_i.substring(0, background_i.length - 1) + ')';
        background = background.substring(0, background.length - 1) + ')';
        Object.entries(this.state.range).map((value, index) => {
            console.log(value)
        })
        return (
            <div id="example">
                <div id="slider"
                    style={{ width: WIDTH_SLIDER, backgroundImage: background_i }}
                    className="slider"
                    ref={
                        el => this.slider = el
                    }
                    onDoubleClick={this.onDoubleClick}
                >
                    {Object.entries(this.state.range).map((value, index) =>
                        <div
                            name={value[0]}
                            style={{
                                left: Math.round(this.state.range[value[0]].offsetX * 5),
                                background: `rgb(${value[1].r},${value[1].g},${value[1].b})`
                            }}
                            className="thumb"
                            ref={
                                value[0]
                            }
                            onMouseDown={
                                this.onMouseDown(value[0])
                            }
                            onClick={() => this.onClickThumb(value[0])}
                        >
                        </div>
                    )}
                </div>
                <div id='color'>
                    <SketchPicker
                        color={this.state.background.rgba}
                        onChangeComplete={this.handleChangeComplete}
                    />
                    <table id="list_color">
                        <tbody>
                            <tr>
                                <th>COLOR</th>
                                <th>HEX</th>
                                <th>STOP</th>
                                <th>DELETE</th>
                            </tr>
                            {this.table()}
                        </tbody></table>
                </div>
                <div id='table'
                    style={{ background: background }}
                ></div>
            </div>
        );
    }
};


