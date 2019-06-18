import React, { Component } from 'react';
import { connect } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faSave, faTrash);

import Tickets from '../../components/tickets';
import Scratcher from '../../components/scratcher';
import ScratcherWinners from '../../components/scratcherWinners';
import {loadWinningJackpotTicketScratcher, setWinnerNumber, saveJackPot, setScratcherNumber} from '../../actions/lottery';
import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';
import '../../App.css';
import './style.css';

class Lottery extends Component {
  constructor(props) {
    super(props)
    this.state = {
        winningNumbers: [0, 0, 0, 0, 0, 0],
        isEditJackPot: false,
        jackpot: 0,
        scratcherNumbers: [],
    }
  }
  componentDidMount() {
    this.props.loadWinningJackpotTicketScratcher();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.jackpot !== this.props.jackpot){
        this.setState({jackpot: nextProps.jackpot.value});
    }
  }

  onChangeScratcher = (event, index) => {
    var arr = this.props.scratcherNumbers;
    arr[index] = event.target.value;
    
    this.setState({scratcherNumbers: arr});
  }

  setScratcher = async () => {
    if(this.state.scratcherNumbers.length != 25)
      return alert("Please fill all winning numbers.");

    this.props.setScratcherNumber(this.state.scratcherNumbers);
  }

  setNumbers = () => {
      this.props.setWinnerNumber(this.state.winningNumbers);
  }

  editJackPot = () =>{
    this.jackpotInput.focus();
    this.setState({isEditJackPot: true})
  }

  saveJackPot = () =>{
        this.props.saveJackPot(this.props.jackpot._id, this.state.jackpot);
        this.setState({isEditJackPot: false});
  }

  getMatchingElementCount(left, right) {
    let clonedLeft = []
    left.forEach(element => {
      clonedLeft.push(element)
    })

    let matchedCount = 0
    right.forEach(element => {
      //find matching index
      let matchedIndex = clonedLeft.indexOf(element)

      if (matchedIndex !== -1) {
        clonedLeft.splice(matchedIndex, 1)
        matchedCount++
      }
    })

    return matchedCount
  }

  calcPayout(winningNumbers) {
    var isLevel = 0;
    var payout = 0;
    this.props.ticketList.forEach(ticket => {
      let matchingCount = this.getMatchingElementCount(ticket.numbers, winningNumbers)

      if(matchingCount == 6){
        isLevel = 6;
      }
      else if (matchingCount == 5){
        isLevel = 5;
      }
      else if( matchingCount == 4)
        isLevel = 4;

    });

    if(isLevel == 6){
      payout = (parseInt(this.props.jackpot.value, 10)).toFixed(2);
    }
    else if (isLevel == 5){
      payout = (parseInt(this.props.jackpot.value, 10) * 0.1 ).toFixed(2);
    }
    else if(isLevel == 4){
      payout = (parseInt(this.props.jackpot.value, 10) * 0.01).toFixed(2);
    }

    return payout;
  }

  randomizeWinner = () => {
    var arr = [0, 0, 0, 0, 0, 0];
    for (var x = 0; x < 6; x++) {
      arr[x] = (Math.random() * 50).toFixed(0);
    }
    this.setState({ winningNumbers: arr });
  }

  winningNumberUp = (val)=> {
    var arr = this.state.winningNumbers;
    arr[val] = (parseInt(arr[val], 10) + parseInt(1, 10)) % 51;
    this.setState({ winningNumbers: arr });
  }

  winningNumberDown = (val)=> {
    var arr = this.state.winningNumbers;
    if (arr[val] > 0) arr[val] = (parseInt(arr[val], 10) - parseInt(1, 10)) % 51;
    else {
      arr[val] = 50;
    }
    this.setState({ winningNumbers: arr });
  }

  render() {
    if(this.props.error){
      alert(this.props.error);
    }
    
    return (
      <div className='containers'>
        <div className='lottWrapper'>
            <div className='box'>
                <h2>LOTTO</h2>
                <div className='row'>
                    <div className='col-md-6'>
                        <Tickets ticketList={this.props.ticketList}/>
                    </div>
                    <div className='col-md-6'>
                        <div className='text-align-center'>
                            <div style={{ display: 'inline-block', padding: '5px' }}>
                                <p onClick={() => this.winningNumberUp(0)} style={{ cursor: 'pointer', color: 'white' }} > &#9650; </p>
                                <div className='lotto'>{this.state.winningNumbers[0]}</div>
                                <p onClick={() => this.winningNumberDown(0)} style={{ cursor: 'pointer', color: 'white' }} > &#9660; </p>
                            </div>
                            <div style={{ display: 'inline-block', padding: '5px' }}>
                                <p onClick={() => this.winningNumberUp(1)} style={{ cursor: 'pointer', color: 'white' }} > &#9650; </p>
                                <div className='lotto'>{this.state.winningNumbers[1]}</div>
                                <p onClick={() => this.winningNumberDown(1)} style={{ cursor: 'pointer', color: 'white' }} > &#9660; </p>
                            </div>
                            <div style={{ display: 'inline-block', padding: '5px' }}>
                                <p onClick={() => this.winningNumberUp(2)} style={{ cursor: 'pointer', color: 'white' }} > &#9650; </p>
                                <div className='lotto'>{this.state.winningNumbers[2]}</div>
                                <p onClick={() => this.winningNumberDown(2)} style={{ cursor: 'pointer', color: 'white' }} > &#9660; </p>
                            </div>
                            <div style={{ display: 'inline-block', padding: '5px' }}>
                                <p onClick={() => this.winningNumberUp(3)} style={{ cursor: 'pointer', color: 'white' }} > &#9650; </p>
                                <div className='lotto'>{this.state.winningNumbers[3]}</div>
                                <p onClick={() => this.winningNumberDown(3)} style={{ cursor: 'pointer', color: 'white' }} > &#9660; </p>
                            </div>
                            <div style={{ display: 'inline-block', padding: '5px' }}>
                                <p onClick={() => this.winningNumberUp(4)} style={{ cursor: 'pointer', color: 'white' }} > &#9650; </p>
                                <div className='lotto'>{this.state.winningNumbers[4]}</div>
                                <p onClick={() => this.winningNumberDown(4)} style={{ cursor: 'pointer', color: 'white' }} > &#9660; </p>
                            </div>
                            <div style={{ display: 'inline-block', padding: '5px' }}>
                                <p onClick={() => this.winningNumberUp(5)} style={{ cursor: 'pointer', color: 'white' }} > &#9650; </p>
                                <div className='lotto'>{this.state.winningNumbers[5]}</div>
                                <p onClick={() => this.winningNumberDown(5)} style={{ cursor: 'pointer', color: 'white' }} > &#9660; </p>
                            </div>
                            <br />
                            <button className='btn btn-success'  style={{width: '100px', marginRight: 10}} onClick={() => this.setNumbers()}>SET</button>
                            <button className='btn btn-success'  style={{width: '150px'}} onClick={() => this.randomizeWinner()}>RANDOMIZE</button>
                        </div>
                        <div className='box payout'>
                            <h2>PROJECTED PAYOUT</h2>
                            <div style={{ padding: '5px', textAlign: 'center' }}>
                            <h2><span style={{color:'#d8d51a'}}>$&nbsp;&nbsp;</span>{this.calcPayout(this.state.winningNumbers)}</h2>
                            </div>
                        </div>
                        <div className='box payout'>
                            <h2>LAST WINNING NUMBERS</h2>
                            <div style={{ padding: '5px', textAlign: 'center' }}>
                            <h2>{this.props.lastWinningNumber[0]+
                            ', '+this.props.lastWinningNumber[1]+
                            ', '+this.props.lastWinningNumber[2]+
                            ', '+this.props.lastWinningNumber[3]+
                            ', '+this.props.lastWinningNumber[4]+
                            ', '+this.props.lastWinningNumber[5]
                            }</h2>
                            </div>
                        </div>    
                    </div>
                </div>                
            </div>
        </div>
        <div className='scratcherWrapper'>
            <div className='row'>
                <div className="box col-md-6">
                    <h2>CURRENT JACKPOT</h2>
                    <div style={{
                            marginTop: "10px",
                            marginBottom: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                    }}>              
                        <span style={{ fontSize: "30px", color: "white", fontWeight: "bold", marginRight: "5px", textAlign: "left" }}>$</span>
                        <input
                            ref={(input) => { this.jackpotInput = input; }} 
                            value={ this.state.isEditJackPot?this.state.jackpot: this.state.jackpot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            onChange={(event)=>this.setState({ jackpot: event.target.value })}
                            style={{ backgroundColor: "transparent", border: "none", fontSize: "30px", color: "white", fontWeight: "bold", marginRight: "20px", width: "70%", textAlign: "left"}}
                            readOnly={this.state.isEditJackPot?false:true }/>
                        
                        <div onClick={()=>{
                            if(this.state.isEditJackPot)
                                return this.saveJackPot();
                            else
                                return this.editJackPot();
                            }}>
                            <FontAwesomeIcon size="lg" color="white" icon={this.state.isEditJackPot?"save":"edit" } />
                        </div>
                    </div>              
                </div>
                <div className="box col-md-6">
                    <h2>SCRATCHER</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <ScratcherWinners scratcherList={this.props.scratcherList}/>
                        </div>
                        <div className="col-md-6">
                            <Scratcher 
                                scratcherNumbers={this.props.scratcherNumbers}
                                onChangeScratcher={(e, value)=>this.onChangeScratcher(e, value)}
                                setScratcher={()=>this.setScratcher()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
    loadWinningJackpotTicketScratcher,
    setWinnerNumber,
    saveJackPot,
    setScratcherNumber
};

const mapStateToProps = ({lottery}) => ({
    lastWinningNumber: lottery.lastWinningNumber,
    jackpot: lottery.jackpot,
    ticketList: lottery.ticketList,
    scratcherNumbers: lottery.scratcherNumbers,
    scratcherList: lottery.scratcherList,
    error: lottery.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Lottery);
