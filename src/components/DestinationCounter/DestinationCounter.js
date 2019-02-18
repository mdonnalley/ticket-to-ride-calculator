import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import './DestinationCounter.css';

export default class DestinationCounter extends Component {
  constructor(props) {
    super(props);
    this.updateCard = this.updateCard.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.determineVariant = this.determineVariant.bind(this);
  }
  
  updateCard(key) {  
    const { card } = this.props;
    if (key === 'reached') {
      this.props.update({ title: card.title, value: Math.abs(card.value) });
    } else {
      this.props.update({ title: card.title, value: card.value * -1 });
    }
  }

  removeCard(card) {
    this.props.remove(this.props.card);
  }

  determineVariant(key) {
    if (key === 'reached') {
      return this.props.card.value > 0 ? 'contained' : 'outlined';
    } else {
      return this.props.card.value < 0 ? 'contained' : 'outlined';
    }
  }

  render() {
    return (
      <Grid container alignItems='center' spacing={8} className='DestinationCounter'>
        <Grid item lg={7} md={5} sm={12} xs={12}>
          {this.props.card.title}
        </Grid>
        <Grid item lg={2} md={3} sm={4} xs={12}>
          <Button
            variant={this.determineVariant('reached')}
            color='primary'
            onClick={e => this.updateCard('reached')}>
            Reached
          </Button>
        </Grid>
        <Grid item lg={2} md={3} sm={4} xs={12}>
          <Button
            variant={this.determineVariant('missed')}
            color='primary'
            onClick={e => this.updateCard('missed')}>
            Missed
          </Button>
        </Grid>
        <Grid item lg={1} md={1} sm={4} xs={12}>
          <IconButton onClick={this.removeCard}>
            <Delete color='action' ></Delete>
          </IconButton>
        </Grid>
      </Grid>
    )
  }
}