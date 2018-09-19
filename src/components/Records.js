import React, { Component } from 'react';
import Record from './Record';
import * as RecordsAPI from '../utils/RecordsAPI'
import RecordForm from '../components/RecordForm'

export default class Records extends Component {
    state = {
        error: null,
        isLoaded: false,
        records: []
    }

    componentDidMount() {
        RecordsAPI.getAll().then(
            response => this.setState({
                records: response.data,
                isLoaded: true
            })
        ).catch(
            error => this.setState({
                isLoaded: true,
                error
            })
        )
    }

    addRecords(record) {
        this.setState({
            error: null,
            isLoaded: true,
            records: [
                ...this.state.records,
                record
            ]
        })
    }

    updateRecord(record, data) {
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.map((item, index) => {
            if(index !== recordIndex) {
            //This is not the item we care about - keep it as-is
            return item;
            }

            //Otherwise, this is the one we want - return an updated value
            return {
                ...item,
                ...data
            };
        });
        this.setState({
            records: newRecords
        });
    }

    render() {
        const {error, isLoaded, records} = this.state;
        let recordsComponent;

        if (error) {
            recordsComponent = <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            recordsComponent = <div>Loading...</div>;
        } else {
            recordsComponent = (
                <div>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {records.map((record) => <Record key={ record.id } record={record}  handleEditRecord={ (record, data) => this.updateRecord(record, data) } />)}
                        </tbody>
                    </table>
                </div>
            );
        }

        return (
            <div>
                <h2>Records</h2>
                <RecordForm handleNewRecord={ (e) => this.addRecords(e) }/>
                { recordsComponent }
            </div>
        )
    }
}