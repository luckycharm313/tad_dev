import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';
import '../../App.css';

export default class Tickets extends Component {
  constructor(props) {
    super(props)
  }

  ticketFormatter = (cellInfo) => {
    var cell = cellInfo.original.numbers;
    return (
        <div>
            {cell[0]}&nbsp;&nbsp;{cell[1]}&nbsp;&nbsp;{cell[2]}&nbsp;&nbsp;{cell[3]}&nbsp;&nbsp;{cell[4]}&nbsp;&nbsp;{cell[5]}
        </div>
    );
  }

  render() {
      
    return (        
        <ReactTable
            data={this.props.ticketList}
            noDataText='No data available!'
            columns={[
                {
                    Header: 'USER',
                    accessor: 'userName',
                },
                {
                    Header: 'USER CODE',
                    accessor: 'userCode'
                },
                {
                    Header: 'NUMBERS',
                    Cell: this.ticketFormatter
                },
            ]}
            defaultPageSize={10}
            className='-striped -highlight orgTable'
        />
    );
  }
}
