import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';
import '../../App.css';

export default class ItemTable extends Component {
  constructor(props) {
    super(props)
  }

  render() {
      
    return (        
        <ReactTable
            data={this.props.itemList}
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
                    accessor: 'total_quantity'
                },
                {
                    Header: 'AVAILABLE',
                    accessor: 'available_quantity'
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
