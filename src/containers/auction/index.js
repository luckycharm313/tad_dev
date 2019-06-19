import React, { Component } from 'react';
import { connect } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faSave, faTrash);

import {} from '../../actions/lottery';
import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';
import '../../App.css';
import './style.css';

class Auction extends Component {
  constructor(props) {
    super(props)
    this.state = {
        
    }
  }
  componentDidMount() {
    
  }

  render() {
    if(this.props.error){
      alert(this.props.error);
    }
    
    return (
      <div className='containers'>
            <div className='row'>
                <div className='box col-md-6'>
                </div>
                <div className='box col-md-6'>
                </div>
            </div>
            <div className='row'>
                <div className='box col-md-4'>
                    <h2>CREATE ITEM</h2>
                </div>
                <div className='box col-md-8'>
                </div>
            </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = ({lottery}) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Auction);
