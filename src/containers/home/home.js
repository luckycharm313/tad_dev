import React, { Component } from 'react';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faSave, faTrash);
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import {web3connect, initContract, fetchContracts, loadGovAndTax } from '../../actions/home';
import Govenors from '../../components/govenors';
import Taxation from '../../components/taxation';
import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';
import '../../App.css';
import './style.css';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
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

  actionGovCell = (cellInfo) => {
    return (
      <div onClick={()=>this.handleGovOpenModal(cellInfo.original._id)}>
        <FontAwesomeIcon size='lg' color='white' icon='edit' />
      </div>
    );
  }

  render() {
    return (
      <div className='container'>
        <div className='govWrapper'>          
          <Govenors governors={this.props.governors}/>
          <Taxation govTax={this.props.govTax} tadTax={this.props.tadTax} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  web3connect,
  initContract,
  fetchContracts,
  loadGovAndTax,
};

const mapStateToProps = ({home}) => ({
  totalSupply: home.totalSupply,
  govTax: home.govTax,
  tadTax: home.tadTax,
  governors: home.governors,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
