import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './DestinationSelector.css';

export default class DestinationSelector extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onAdd(event.target.value);
  }

  render() {
    return (
      <Grid container spacing={24} className='DestinationSelector'>
        <Grid item xs={2}>
          <Typography color='primary' variant='h6'>Cards</Typography>
        </Grid>
        <Grid item xs={10}>
          <Select
            value=''
            onChange={this.handleChange}
            inputProps={{ name: 'destination', id: 'destination-card' }}
            displayEmpty>
            <MenuItem value='' disabled>
              Select Destination Card
            </MenuItem>
            {
              this.props.options.map(card => {
                return <MenuItem key={card.title} value={card}>{card.title}</MenuItem>
              })
            }
          </Select>

        </Grid>
      </Grid>
    )
  }

}
