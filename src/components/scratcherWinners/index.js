import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';
import '../../App.css';

export default class ScratcherWinners extends Component {
  constructor(props) {
    super(props)
  }

  render() {      
    return (
        <ReactTable
            data={this.props.scratcherList}
            noDataText='No data available!'
            columns={[
                {
                    Header: 'NAME',
                    accessor: 'userName',
                },
                {
                    Header: 'USER CODE',
                    accessor: 'userCode'
                },
                {
                    Header: 'COST',
                    accessor: 'winingCost'
                }
            ]}
            defaultPageSize={5}
            className='-striped -highlight orgTable'
        />
    );
  }
}
