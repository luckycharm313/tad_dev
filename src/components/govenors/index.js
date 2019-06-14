import React, { Component } from 'react';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Popup } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faSave, faTrash);
import ReactTable from 'react-table';
import 'react-table/react-table.css'; //http://3.19.73.217:3000/

import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';
import '../../App.css';
import './style.css';
import Action from './action';

export default class Govenors extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  actionGovCell = (cellInfo) => {

    return (
        <div><Action id={cellInfo.original._id} /></div>
    );
  }

  render() {
    console.log(this.props.governors);
    return (        
        <div className='box'>
            <h2>GOVENORS</h2>
            <ReactTable
                data={this.props.governors}
                noDataText='No data available!'
                columns={[
                    {
                        Header: 'STATE',
                        accessor: 'state',
                    },
                    {
                        Header: 'GAMER CODE',
                        accessor: 'userCode'
                    },
                    {
                        Header: 'NAME',
                        accessor: 'userName'
                    },
                    {
                        Header: 'ACTION',
                        Cell: this.actionGovCell
                    },
                ]}
                defaultPageSize={10}
                className='-striped -highlight orgTable'
            />
        </div>
    );
  }
}
