import React from 'react';
import "./style.css";
export default class Circle extends React.Component {
    constructor() {
        super();
        this.state = {
            angle: 90,
        }
    }
    componentDidMount() {
        const obj = this
        let circle = document.getElementById('circle');
        let picker = document.getElementById('picker');
        let pickerCircle = picker.firstElementChild;
        let rect = circle.getBoundingClientRect();

        let center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };

        let transform = (function () {
            let prefs = ['t', 'WebkitT', 'MozT', 'msT', 'OT'];
            let style = document.documentElement.style;
            let p
            for (var i = 0, len = prefs.length; i < len; i++) {
                if ((p = prefs[i] + 'ransform') in style) return p
            }
        })();
        picker.style[transform] = 'rotate(90deg)'
        let rotate = function (x, y) {
            let deltaX = x - center.x;
            let deltaY = y - center.y;
            let angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI
            return angle
        };

        // DRAGSTART
        let mousedown = (event) => {
            event.preventDefault()
            document.body.style.cursor = 'default'
            mousemove(event)
            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup)
        };

        // DRAG
        let mousemove = function (event) {
            obj.setState({ angle: rotate(event.pageX, event.pageY) });
            obj.handleAngle();
            picker.style[transform] = 'rotate(' + rotate(event.pageX, event.pageY) + 'deg)'
        };

        // DRAGEND
        let mouseup = function () {
            document.body.style.cursor = null;
            document.removeEventListener('mouseup', mouseup)
            document.removeEventListener('mousemove', mousemove)
        };



        // DRAG START
        pickerCircle.addEventListener('mousedown', mousedown)

        // ENABLE STARTING THE DRAG IN THE BLACK CIRCLE
        circle.addEventListener('mousedown', function (event) {
            if (event.target == this) mousedown(event)

        })
    }
    handleAngle = () => {
        console.log(1)
        this.props.chooseAngle(this.state.angle)
    }

    render() {
        return (
            <div id="circle">
                <div id="picker"
                // onClick={this.handleAngle}
                >
                    <div id="picker-circle"

                    >
                    </div>
                </div>
            </div>
        )
    }
}