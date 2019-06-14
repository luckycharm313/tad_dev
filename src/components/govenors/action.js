import React from 'react';
import {
    Button,
    Modal,
    Icon, Header, Input,
    Checkbox,
    Grid
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faSave, faTrash);

import './style.css';

export default class Action extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            open: false,
        };
    }

    handleOpen = () => {
        this.setState({ modalOpen: true });
    }

    handleCancel = () => {
        this.setState({ modalOpen: false });
    }

    render() {
        console.log(this.props.id);
        return (
            <Modal trigger={<FontAwesomeIcon size='lg' color='white' icon='edit' />}
                   open={this.state.modalOpen}>
                <Modal.Header
                    style={{
                        background: 'linear-gradient(2deg, rgba(196, 205, 229, 0.1), rgba(206, 221, 246, 0.1), rgba(220, 236, 255, 0.1))'
                    }}>
                    <Header as='h3' icon textAlign='center'>
                        <Header.Content>
                            <span>Notification Information</span>
                        </Header.Content>
                        <Header.Content style={{ fontSize: '12px', color: 'gray', textAlign: 'left', marginBottom: '-20px' }}>

                        </Header.Content>
                    </Header>
                </Modal.Header>
                <Modal.Content style={{ background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column style={{ display: 'flex', flexDirection: 'column'}}>
                                <Grid.Row>
                                    <div className="ui form attached fluid segment">
                                        <div className="one fields">
                                            <label className="paymentInfo">You have a request pending to be a Debtor for a </label>
                                        </div>
                                    </div>
                                </Grid.Row>
                            </Grid.Column> 
                        </Grid.Row>
                    </Grid>
                </Modal.Content>

                <Modal.Actions style={{ background: '#b3bbbf' }}>
                    <Button style={{ color: '#003366', background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }} onClick={this.handleCancel}>
                        <Icon name='close' /> Close
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }    
}