import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';
import '../../App.css';

export default class AuctionTable extends Component {
  constructor(props) {
    super(props)
  }

  render() {
      
    return (        
        <ReactTable
            data={this.props.auctionList}
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
                    Header: 'WINNER NAME',
                    accessor: 'biderName'
                },
                {
                    Header: 'WINNER CODE',
                    accessor: 'biderGamerCode'
                },
                {
                    Header: 'WINNER PRICE',
                    accessor: 'bidPrice'
                },
            ]}
            defaultPageSize={10}
            className='-striped -highlight orgTable'
        />
    );
  }
}
