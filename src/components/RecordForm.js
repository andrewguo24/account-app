import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';

export default class RecordForm extends Component {
    state = {
        date: "",
        title: "",
        amount: ""
    }

    handleChange(e) {
        let name, obj;
        name = e.target.name;
        this.setState((
            obj = {},
            obj[""+name] = e.target.value,
            obj
        ))
    }

    handleSubmit(e) {
        e.preventDefault();
        RecordsAPI.create(this.state).then(
            response => console.log(response.date)
        ).catch(
            error => console.log(error.message)
        )
    }

    valid() {
        return this.state.date&&this.state.title&&this.state.amount
    }

    render() {
        return (
            <form className="form-inline mb-3" onSubmit={ (e) => this.handleSubmit(e) }>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" onChange={ (e) => this.handleChange(e) } placeholder="Date" name="date" value={ this.state.date } />
                </div>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" onChange={ (e) => this.handleChange(e) } placeholder="Title" name="title" value={ this.state.title }/>
                </div>
                <div className="form-group mr-1">
                    <input type="text" className="form-control" onChange={ (e) => this.handleChange(e) } placeholder="Amount" name="amount" value={ this.state.amount }/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={ !this.valid() }>Create Records</button>
            </form>
        );
    }
}