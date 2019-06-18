import React, { Component } from 'react';
import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';
import '../../App.css';
import './style.css';

export default class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            DPRmsg: '',
            IAMHIMmsg: '',
            PRESIDENTmsg: '',
        }
    }

    sendMessage = (value) => {
        var params = {}
        if (value == 1) {
            params = {
                message: this.state.DPRmsg,
                sender: value
            }
        }
        else if (value == 2) {
            params = {
                message: this.state.IAMHIMmsg,
                sender: value
            }
        }
        else {
            params = {
                message: this.state.PRESIDENTmsg,
                sender: value
            }
        }

        this.props.postMessage(params);
        if (value == 1) {
            this.setState({ DPRmsg: '' });
        }
        else if (value == 2) {
            this.setState({ IAMHIMmsg: '' });
        }
        else {
            this.setState({ PRESIDENTmsg: '' });
        }
    }

    render() {

        return (
            <div className='box'>
                <h2>MESSAGE</h2>
                <div className='main-container'>
                    <div className='row body-red'>
                        <div className='col-md-3'> <span className='text-white'> DPR </span> </div>
                        <div className='col-md-6'>
                            {/* <Textarea minRows={1} maxRows={6} value={this.state.DPRmsg} onChange={(e)=>this.handleDPRChange(e)} className = 'text-message-white'/> */}
                            <textarea rows={6} value={this.state.DPRmsg} onChange={(e) => this.setState({ DPRmsg: e.target.value })} className='text-message-white' />
                        </div>
                        <div className='col-md-3'>
                            <button className='btn-submit-white' onClick={() => this.sendMessage(1)}>SUBMIT</button>
                        </div>
                    </div>
                    <div className='row body-grey'>
                        <div className='col-md-3'> <span className='text-white'> IAMHIM </span> </div>
                        <div className='col-md-6'>
                            {/* <Textarea minRows={1} maxRows={6} value={this.state.IAMHIMmsg} onChange={(e)=>this.handleIAMHIMChange(e)} className = 'text-message-white'/> */}
                            <textarea rows={6} value={this.state.IAMHIMmsg} onChange={(e) => this.setState({ IAMHIMmsg: e.target.value })} className='text-message-white' />
                        </div>
                        <div className='col-md-3'>
                            <button className='btn-submit-white' onClick={() => this.sendMessage(2)}>SUBMIT</button>
                        </div>
                    </div>
                    <div className='row body-blue'>
                        <div className='col-md-3'> <span className='text-white'> PRESIDENT </span> </div>
                        <div className='col-md-6'>
                            {/* <Textarea minRows={1} maxRows={6} value={this.state.PRESIDENTmsg} onChange={(e)=>this.handlePRESIDENTChange(e)} className = 'text-message-white'/> */}
                            <textarea rows={6} value={this.state.PRESIDENTmsg} onChange={(e) => this.setState({ PRESIDENTmsg: e.target.value })} className='text-message-white' />
                        </div>
                        <div className='col-md-3'>
                            <button className='btn-submit-white' onClick={() => this.sendMessage(0)}>SUBMIT</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
