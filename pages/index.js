import React from 'react'
import Head from 'next/head'
import Slider from '../components/Slider'
// import Gradient from '../components/Gradient'

class Home extends React.Component {
    render() {
        return (
            <div>
                <Slider r={20} g={30} b={40} offsetX={30} a={1} />
            </div>
        )
    }

}

export default Home
