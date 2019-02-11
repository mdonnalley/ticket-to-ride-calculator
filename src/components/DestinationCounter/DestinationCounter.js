import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import './DestinationCounter.css';

export default class DestinationCounter extends Component {
  constructor(props) {
    super(props);
    this.updateValue = this.updateValue.bind(this);
  }
  
  updateValue(event) {
    this.props.update(this.props.name, Number(event.target.value))
  }

  render() {
    return (
      <Grid container spacing={24} className='DestinationCounter'>
        <Grid item xs={3}>
          <label>{this.props.name}</label>
        </Grid>
        <Grid item xs={9}>
          <Input
            type="number"
            name={this.props.name}
            placeholder="Points…"
            onChange={this.updateValue}>
          </Input>
        </Grid>
      </Grid>
    )
  }
}