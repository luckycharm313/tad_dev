import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';
import '../../App.css';
import './style.css';

export default class TrackTable extends Component {
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
    for (let index = 0; index < this.props.trackList.length; index++) {
        const element = this.props.trackList[index];
        
        var obj = {
            'ownerGamerCode': element.ownerGamerCode,
            'itemId': element.itemId,
            'itemCategory': element.itemCategory,
            'itemName': element.itemName,
            'price': element.price,
            'quantity': element.quantity,
            'isTSR': element.isTSR,
            'date': new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(parseInt(element.createdAt)*1000)),
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
                    Header: 'GAMER',
                    accessor: 'ownerGamerCode',
                },
                {
                    Header: 'CATEGORY',
                    accessor: 'itemCategory',
                },
                {
                    Header: 'ITEM NAME',
                    accessor: 'itemName'
                },
                {
                    Header: 'PRICE',
                    accessor: 'price'
                },
                {
                    Header: 'QUANTITY',
                    accessor: 'quantity'
                },
                {
                    Header: 'DATE',
                    accessor: 'date'
                }
            ]}
            defaultPageSize={10}
            className='-striped -highlight orgTable'
        />
    );
  }
}
