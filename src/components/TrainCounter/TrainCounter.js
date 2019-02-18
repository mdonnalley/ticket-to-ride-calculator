import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './TrainCounter.css';

export default class TrainCounter extends Component {
	isNegative(key) {
		return this.props.value <= 0;
	}
  
  render() {
    return (
      <Grid container spacing={8} alignItems='center' className='TrainCounter'>
        <Grid item md={3} xs={12}>
          <label>{this.props.label}</label>	
        </Grid>
        <Grid item md={3} xs={4}>
          <Button
            color='secondary'
            variant='contained'
            disabled={this.isNegative(this.props.trainLengthKey)}
            onClick={() => this.props.decrement(this.props.trainLengthKey)}>
            -
          </Button>
        </Grid>
        <Grid item md={3} xs={4}>
          <span>{this.props.value}</span>
        </Grid>
        <Grid item md={3} xs={4}>
          <Button
            color='primary'
            variant='contained'
            onClick={() => this.props.increment(this.props.trainLengthKey)}>
            +
          </Button>
        </Grid>
      </Grid>
    )
  }

}