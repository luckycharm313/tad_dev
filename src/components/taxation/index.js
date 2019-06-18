import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faSave, faTrash);

import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';
import '../../App.css';
import './style.css';

export default class Taxation extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (        
        <div className="box">
            <h2>TAXATION</h2>
            <div className="tad-wrap">
                <h3>TAD</h3>
                <h3>{this.props.tadTax}%</h3>
                <div onClick={()=>this.props.handleOpen(1, this.props.tadTax)}>
                    <FontAwesomeIcon size="lg" color="white" icon="edit" />
                </div>
            </div>
            <div className="gov-wrap">
                <h3>GOV</h3>
                <h3>{this.props.govTax}%</h3>
                <div onClick={()=>this.props.handleOpen(2, this.props.govTax)}>
                    <FontAwesomeIcon size="lg" color="white" icon="edit" />
                </div>
            </div>
        </div>
    );
  }
}
