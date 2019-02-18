import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class LongestTrain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection : ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const playerId = event.target.value;
    this.setState({ selection: playerId});
    this.props.handleLongestTrain(playerId);
  }

  render() {
    return (
      <React.Fragment>
        <Typography color='primary' variant='h6'>Longest Train</Typography>
        <Select
          value={this.state.selection}
          onChange={this.handleChange}
          inputProps={{ name: 'longest-train', id: 'longest-train' }}
          displayEmpty>
          <MenuItem value='' disabled>
            Select Player with Longest Train
          </MenuItem>
          {
            this.props.players.map(player => {
              return <MenuItem key={player.id} value={player.id}>{player.name}</MenuItem>
            })
          }
        </Select>
      </React.Fragment>
      
    );
  }

}
