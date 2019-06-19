import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';
import '../../App.css';

export default class TrackTable extends Component {
  constructor(props) {
    super(props)
  }

  render() {
      
    return (        
        <ReactTable
            data={this.props.trackList}
            noDataText='No data available!'
            columns={[
                {
                    Header: 'GAMER',
                    accessor: 'gamerCode',
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
