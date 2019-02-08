import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import './NewPlayerForm.css';

export default class NewPlayerForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      player: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({player: event.target.value});
  }

  handleNewPlayer(event) {
    this.props.handleSubmit(this.state.player, event);
    this.setState({player: ''});
  }

  isEmpty() {
    return this.state.player === '';
  }

  render() {
    return (
      <form>
        <label>
          <Input
            type='text'
            name='name'
            placeholder='Player Name…'
            value={this.state.player}
            onChange={this.handleChange}
          />
        </label>
        <Input
          type='submit'
          value='Add'
          disabled={this.isEmpty()}
          onClick={e => this.handleNewPlayer(e)}
        />
      </form>
    )
  }

}