import React from 'react'
import Head from 'next/head'
import Slider from '../components/Slider'
import { throws } from 'assert';
// import Gradient from '../components/Gradient'

class Home extends React.Component {
    constructor() {
        super();
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
                },
            },
            angle: 90
        }
    }
    render() {
        return (
            <div>
                <Slider range={this.state.range} angle={this.state.angle} />
            </div>
        )
    }

}

export default Home
