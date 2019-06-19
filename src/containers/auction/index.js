import React, { Component } from 'react';
import { connect } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faSave, faTrash);
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import AuctionTable from '../../components/auctionTable';
import ItemTable from '../../components/itemTable';
import TrackTable from '../../components/trackTable';

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
        itemPrice: 0,
        itemQuantity: 0,
    }
  }
  componentDidMount() {
    
  }

  onHandleCategory = () => {

  }

  onHandleItem = () => {

  }

  setItem = () => {

  }

  render() {
    if(this.props.error){
      alert(this.props.error);
    }
    
    return (
      <div className='containers'>
            <div className='row'>
                <div className='box col-md-6'>
                    <h2>ITEMS</h2>
                    <ItemTable itemList={this.props.itemList} />
                </div>
                <div className='box col-md-6'>
                    <h2>AUCTIONS</h2>
                    <AuctionTable auctionList={this.props.auctionList} />
                </div>
            </div>
            <div className='row'>
                <div className='box col-md-4'>
                    <h2>CREATE ITEM</h2>
                    <div className='form-group'>
                        <div className='form-control'>
                            <span className='form-label'>Category Name: </span>
                            <Dropdown 
                                options={this.props.categories} 
                                onChange={this.onHandleCategory} 
                                value={''}
                                placeholder="Select an category"
                                className='dropdown'
                            />
                        </div>
                        <div className='form-control'>
                            <span className='form-label'>Item Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                            <Dropdown 
                                options={this.props.items} 
                                onChange={this.onHandleItem} 
                                value={''}
                                placeholder="Select an item"
                                className='dropdown'
                            />
                        </div>
                        <div className='form-control'>
                            <span className='form-label'>Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <input
                                onChange={(event)=>this.setState({ itemPrice: event.target.value})}
                                value={this.state.itemPrice}
                                className='input'
                            />
                        </div>
                        <div className='form-control'>
                            <span className='form-label'>Quantity:</span>
                            <input
                                onChange={(event)=>this.setState({ itemQuantity: event.target.value})}
                                value={this.state.itemQuantity}
                                className='input'
                            />
                        </div>
                        <div className='form-control'>
                            <div className='btn-wrapper'>
                                <button className='btn btn-success' onClick={() => this.setItem()}>SET</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='box col-md-8'>
                    <h2>TRACKING ITEMS</h2>
                    <TrackTable trackList={this.props.trackList} />
                </div>
            </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = ({auction}) => ({
    itemList: auction.itemList,
    auctionList: auction.auctionList,
    trackList: auction.trackList,
    categories: auction.categories,
    items: auction.items,
});

export default connect(mapStateToProps, mapDispatchToProps)(Auction);
