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
            scratcherNumbers: []
        }
    }

    render() {
        return (
            <div>
                <div className='row-xd'>                    
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[0]} onChange={(e) => this.props.onChangeScratcher(e, 0)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[1]} onChange={(e) => this.props.onChangeScratcher(e, 1)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[2]} onChange={(e) => this.props.onChangeScratcher(e, 2)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[3]} onChange={(e) => this.props.onChangeScratcher(e, 3)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[4]} onChange={(e) => this.props.onChangeScratcher(e, 4)} />
                    </div>
                </div>
                <div className='row-xd'>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[5]} onChange={(e) => this.props.onChangeScratcher(e, 5)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[6]} onChange={(e) => this.props.onChangeScratcher(e, 6)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[7]} onChange={(e) => this.props.onChangeScratcher(e, 7)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[8]} onChange={(e) => this.props.onChangeScratcher(e, 8)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[9]} onChange={(e) => this.props.onChangeScratcher(e, 9)} />
                    </div>
                </div>
                <div className='row-xd'>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[10]} onChange={(e) => this.props.onChangeScratcher(e, 10)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[11]} onChange={(e) => this.props.onChangeScratcher(e, 11)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[12]} onChange={(e) => this.props.onChangeScratcher(e, 12)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[13]} onChange={(e) => this.props.onChangeScratcher(e, 13)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[14]} onChange={(e) => this.props.onChangeScratcher(e, 14)} />
                    </div>
                </div>
                <div className='row-xd'>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[15]} onChange={(e) => this.props.onChangeScratcher(e, 15)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[16]} onChange={(e) => this.props.onChangeScratcher(e, 16)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[17]} onChange={(e) => this.props.onChangeScratcher(e, 17)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[18]} onChange={(e) => this.props.onChangeScratcher(e, 18)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[19]} onChange={(e) => this.props.onChangeScratcher(e, 19)} />
                    </div>
                </div>
                <div className='row-xd'>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[20]} onChange={(e) => this.props.onChangeScratcher(e, 20)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[21]} onChange={(e) => this.props.onChangeScratcher(e, 21)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[22]} onChange={(e) => this.props.onChangeScratcher(e, 22)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[23]} onChange={(e) => this.props.onChangeScratcher(e, 23)} />
                    </div>
                    <div className='col-xd-2'>
                        <input className='input-scratcher' value={this.props.scratcherNumbers[24]} onChange={(e) => this.props.onChangeScratcher(e, 24)} />
                    </div>
                </div>
                <div className='row'>
                    <button className='btn btn-success' style={{ width: '200px', margin: 'auto' }} onClick={() => this.props.setScratcher()}>SET</button>
                </div>
            </div>
        );
    }
}
