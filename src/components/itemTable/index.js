import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';
import '../../App.css';
import './style.css';

export default class ItemTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: []});
  }

  LoadData = () => {
    for (let index = 0; index < this.props.itemList.length; index++) {
        const element = this.props.itemList[index];
        var obj = {
            'id': element.itemId,
            'itemCategory': element.itemCategory,
            'itemName': element.itemName,
            'price': element.price,
            'quantity': element.quantity,
            'outQuantity': parseInt(element.quantity) - parseInt(element.stock),
            'stock_quantity': element.stock
        }
        this.state.data.push(obj);
    }
  }

  render() {
    this.LoadData();  
    return (        
        <ReactTable
            data={this.state.data}
            noDataText='No data available!'
            columns={[
                {
                    Header: 'CATEGORY',
                    accessor: 'itemCategory',
                },
                {
                    Header: 'NAME',
                    accessor: 'itemName'
                },
                {
                    Header: 'PRICE',
                    accessor: 'price'
                },
                {
                    Header: 'TOTAL',
                    accessor: 'quantity'
                },
                {
                    Header: 'SOLD',
                    accessor: 'outQuantity'
                },
                {
                    Header: 'STOCK',
                    accessor: 'stock_quantity'
                }
            ]}
            defaultPageSize={10}
            className='-striped -highlight orgTable'
        />
    );
  }
}
