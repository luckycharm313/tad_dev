import React, { Component } from 'react';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faSave, faTrash);
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';
import '../../App.css';
import './style.css';

export default class Taxation extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (        
        <div className="box">
            <h2>TAXATION</h2>
            <div className="tad-wrap">
                <h3>TAD</h3>
                <h3>{this.props.tadTax}%</h3>
                <div onClick={()=>this.handleTadOpenModal()}>
                    <FontAwesomeIcon size="lg" color="white" icon="edit" />
                </div>
            </div>
            <div className="gov-wrap">
                <h3>GOV</h3>
                <h3>{this.props.govTax}%</h3>
                <div onClick={()=>this.handleOpenModal()}>
                    <FontAwesomeIcon size="lg" color="white" icon="edit" />
                </div>
            </div>
        </div>
    );
  }
}
