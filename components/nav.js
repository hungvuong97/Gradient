// import React, { useState, useEffect, Component } from "react";
// import { getUser } from '../redux/action/action';
// import { connect } from 'react-redux';
// import { bindActionCreators } from "redux";
// class Nav extends Component {
//     constructor(props) {
//         super();
//         this.state = {
//             user: '',
//         }
//     }
//     onClick = () => {
//         this.props.getUser();
//     }
//     componentDidUpdate() {
//         this.state.user = this.props.listUser;
//     }
//     render() {
//         let postUser;
//         console.log(this.state.user)
//         if (this.state.user === null || Object.keys(this.state.user).length === 0) {
//             postUser = (
//                 <tr>
//                 </tr>

//             )
//         } else {
//             // postUser = (
//             //     this.state.user(e => {
//             //         <tr>
//             //             <th>{e.name}</th>
//             //             <th>{e.age}</th>
//             //         </tr>
//             //     })

//             // )
//         }
//         return (
//             <div>
//                 <button onClick={this.onClick}>add </button>
//                 <table>
//                     <tbody><tr>
//                         <th> Name </th>
//                         <th> Age </th>
//                         <th> Picture </th>
//                         <th> Delete </th>
//                     </tr>

//                         {postUser}

//                     </tbody></table>
//             </div >

//         )
//     }

// }

// const mapStateToProps = state => ({
//     listUser: state.listUser
// });

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getUser: bindActionCreators(getUser, dispatch)
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Nav);