import React, { Component } from 'react';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faSave, faTrash);
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';
import '../../App.css';

export default class Currency extends Component {
  constructor(props) {
    super(props)
  }

  actionGovCell = (cellInfo) => {      
    return (
        <FontAwesomeIcon size='lg' color='white' icon='edit' /*onClick={()=>this.props.handleOpen(0, cellInfo.original)} *//>
    );
  }

  render() {      
    return (        
        <div className='box'>
            <h2>$ VALUES</h2>
            <ReactTable
                data={this.props.currencies}
                noDataText='No data available!'
                columns={[
                    {
                        Header: 'CURRENCY',
                        accessor: 'currency',
                    },
                    {
                        Header: 'PRICE',
                        accessor: 'price'
                    },
                    {
                        Header: 'ACTION',
                        Cell: this.actionGovCell
                    },
                ]}
                defaultPageSize={5}
                showPagination ={false}
                className='-striped -highlight orgTable'
            />
        </div>
    );
  }
}
