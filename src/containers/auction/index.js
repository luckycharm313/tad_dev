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

import {updateCategory, setItem, loadData} from '../../actions/auction';
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
        itemCategory: '',
        itemName: '',
        itemId: 0,
    }
  }
  componentDidMount() {
    this.props.loadData();
  }

  onHandleCategory = (e) => {
    this.setState({itemCategory: e.label, itemName: ''});
    this.props.updateCategory(e.label);
  }

  onHandleItem = (e) => {
    this.setState({itemName: e.label, itemId: e.value});
  }

  setItem = () => {
    if(this.state.itemPrice == 0 || this.state.itemQuantity == 0 || this.state.itemName == '' || this.state.itemCategory == ''){
        alert("Please Input all options!");
    }
    else{
        var params = {
            'id': this.state.itemId,
            'itemName': this.state.itemName,
            'itemCategory': this.state.itemCategory,
            'price': this.state.itemPrice,
            'quantity': this.state.itemQuantity,
        };
    
        this.props.setItem(params);
        this.setState({itemName: '', itemCategory: '', itemPrice: 0, itemQuantity: 0, itemId: 0});
    }    
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
                                value={this.state.itemCategory}
                                placeholder="Select a category"
                                className='dropdown'
                            />
                        </div>
                        <div className='form-control'>
                            <span className='form-label'>Item Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                            <Dropdown 
                                options={this.props.items} 
                                onChange={this.onHandleItem} 
                                value={this.state.itemName}
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
    updateCategory,
    setItem,
    loadData,
};

const mapStateToProps = ({auction}) => ({
    itemList: auction.itemList,
    auctionList: auction.auctionList,
    trackList: auction.trackList,
    categories: auction.categories,
    items: auction.items,
});

export default connect(mapStateToProps, mapDispatchToProps)(Auction);
