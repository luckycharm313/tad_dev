import React, { Component } from 'react';
import { connect } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faSave, faTrash);
import ReactModal from 'react-modal';

import {web3connect, initContract, fetchContracts, loadGovAndTax, updateGov, updateTax, postMessage } from '../../actions/home';
import Govenors from '../../components/govenors';
import Taxation from '../../components/taxation';
import Currency from '../../components/currency';
import Messages from '../../components/messages';
import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';
import '../../App.css';
import './style.css';

const customStyles = {
  overlay: { 
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  content : {
    color: "white", 
    backgroundColor: "rgba(0,0,0,0.8)", 
    margin: "15% calc(15% - 60px)", 
    width: "70%", 
    height: "35%", 
    border: "none", 
    borderRadius: "5px", 
    textAlign: "center",    
  }
};

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      indexModal: 0,
      totalSupply: 20000,
      isGovOpen: false,
      isTaxOpen: false,
      taxIndex: 1,
      userCode: null,
      govId: null,
      taxValue: null,
      addAmount: 0,
      exchangeValues: [
        { currency: "USD", price: 5 }
        // { currency: "GBP", price: 5 },
        // { currency: "VND", price: 5 },
        // { currency: "AUD", price: 5 }
      ]
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See actions/index.js => web3connect for more info.
    /*
    window.addEventListener('load', async () => {
      await this.props.web3connect();
      await this.props.initContract();
      await this.props.fetchContracts();      
    }); */
  }

  componentDidMount() {
    this.props.loadGovAndTax();
  }
  postMessage = (params) => {
    this.props.postMessage(params);
  }

  btnChange = (e) => {
    if( e == 0){
      this.props.updateGov(this.state.govId, this.state.userCode);      
    }
    else{
      this.props.updateTax(this.state.taxIndex, this.state.taxValue);
    }

    this.handleCloseModal(e);
  }
  addSupply = () => {
    var temp = parseInt(this.state.totalSupply) + parseInt(this.state.addAmount);
    this.setState({ totalSupply: temp, addAmount: 0 });
  }

  handleOpen = (e, param) => {
    if(e == 0 ){
      this.setState({isGovOpen: true, userCode: param.userCode, govId: param._id});
    }
    else{
      this.setState({isTaxOpen: true, taxIndex: e, taxValue: param});
    }
  }
  
  handleCloseModal = (e) => {
    if(e == 0 ){
      this.setState({isGovOpen: false});
    }
    else{
      this.setState({isTaxOpen: false});
    }
  }

  actionGovCell = (cellInfo) => {
    return (
      <div onClick={()=>this.handleGovOpenModal(cellInfo.original._id)}>
        <FontAwesomeIcon size='lg' color='white' icon='edit' />
      </div>
    );
  }

  render() {
    if(this.props.error){
      alert(this.props.error);
    }

    return (
      <div className='container'>
        <div className='govWrapper'>          
          <Govenors governors={this.props.governors} handleOpen={(e, param)=>this.handleOpen(e, param)}/>
          <Taxation govTax={this.props.govTax} tadTax={this.props.tadTax} handleOpen={(e, param)=>this.handleOpen(e, param)} />
        </div>
        <div className='ddWrapper'>
          <div className="box">
            <h2>DD IN CIRCULATION</h2>
            <h3> { parseInt(this.state.totalSupply, 10).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              <span style={{color:"#d8d51a"}}>&nbsp;&nbsp;DD</span>
            </h3>
            <h3>
              <span style={{color:"#d8d51a"}}>$&nbsp;&nbsp;</span>
              {(parseInt(this.state.totalSupply, 10) * parseInt(this.state.exchangeValues[0].price, 10)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h3>
          </div>

          <div className="box">
            <h2>CREATE DD</h2>
            <div style={{ padding: "5px", textAlign: "center" }}>
              <input onChange={(e)=>this.setState({addAmount: e.target.value})} value={this.state.addAmount} style={{ backgroundColor: "grey", border: "none", borderRadius: "4px" }} />
              <br />
              <br /> <button onClick={()=>this.addSupply()}>ADD</button>
            </div>
          </div>
          <Currency currencies={this.state.exchangeValues}/>
        </div>
        <div className='chatWrapper'>
          <Messages postMessage={(e)=> this.postMessage(e)}/>
        </div>
        <ReactModal
            isOpen={this.state.isGovOpen}
            onRequestClose={()=>this.handleCloseModal(0)}
            contentLabel="Controls"
            style={customStyles}
            ariaHideApp={false}
          >
          <h2>Set GOVERNOR</h2>
          <input
            onChange={(event)=>this.setState({ userCode: event.target.value})}
            value={this.state.userCode}
            style={{ backgroundColor: "grey", border: "none", borderRadius: "4px", padding: 10, width:"50%" }} />
          <br />
          <button className='btnModal' onClick={() => this.btnChange(0)}>SET</button>
        </ReactModal>
        <ReactModal
            isOpen={this.state.isTaxOpen}
            onRequestClose={()=>this.handleCloseModal(this.state.taxIndex)}
            contentLabel="Controls"
            style={customStyles}
            ariaHideApp={false}
          >
          <h2>{this.state.taxIndex == 1 ? 'Set TAD TAX' : 'Set GOV TAX' }</h2>
          <input
            onChange={(event)=>this.setState({ taxValue: event.target.value})}
            value={this.state.taxValue}
            style={{ backgroundColor: "grey", border: "none", borderRadius: "4px", padding: 10, width:"50%" }} />
          <br />
          <button className='btnModal' onClick={() => this.btnChange(this.state.taxIndex)}>SET</button>
        </ReactModal>
      </div>
    );
  }
}

const mapDispatchToProps = {
  web3connect,
  initContract,
  fetchContracts,
  loadGovAndTax,
  updateGov,
  updateTax,
  postMessage,
};

const mapStateToProps = ({home}) => ({
  totalSupply: home.totalSupply,
  govTax: home.govTax,
  tadTax: home.tadTax,
  governors: home.governors,
  error: home.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
