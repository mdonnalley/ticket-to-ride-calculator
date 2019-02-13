import React, { Component } from 'react';
import Player from './components/Player/Player';
import NewPlayerForm from './components/NewPlayerForm/NewPlayerForm';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import DestinationCards from './destinationCards';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#606e8b',
      main: '#34435E',
      dark: '#091c34',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#62f8d4',
      main: '#13c4a3',
      dark: '#009274',
      contrastText: '#000000',
    },
    // error: will use the default color
  },
});

function alpabeticalSort(arr) {
  return arr.sort((a, b) => {
    const aLower = a.title.toLowerCase();
    const bLower = b.title.toLowerCase();
    if (aLower < bLower) {
      return -1;
    } else if (aLower > bLower) {
      return 1;
    } else {
      return 0;
    }
  });
}

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      players: [],
      availableCards: Object.assign([], alpabeticalSort(DestinationCards))
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.handleCardAction = this.handleCardAction.bind(this);
  }

  handleSubmit(player, event) {
    const newPlayer = { name: player, score: 0 };
    this.setState(state => ({
      players: [...state.players, newPlayer],
    }));
    event.preventDefault();
  }

  handleScoreChange(name, score) {
    this.setState(state => ({
      players: state.players.map(player => {
        if (player.name === name) {
          return { name, score };
        } else {
          return player;
        }
      })
    }));
  }

  handleCardAction(card, action) {
    switch (action) {
      case 'add':
        this.setState(state => ({
          availableCards: state.availableCards.filter(c => c.title !== card.title)
        }));
        break;
      case 'remove':
        this.setState(state => ({
          availableCards: alpabeticalSort([...state.availableCards, card])
        }));
        break;
      default:
        break
    }
    
  }

  renderPlayers() {
    return this.state.players.map(player => {
      return <Player
        player={player}
        key={player.name}
        handleScoreChange={this.handleScoreChange}
        availableCards={this.state.availableCards}
        handleCardAction={this.handleCardAction}>
      </Player>
    });
  }

  findWinner() {
    if (this.state.players.length) {
      const maxScore = Math.max(...this.state.players.map(p => p.score));
      const winners = this.state.players.filter(p => p.score === maxScore);
      return winners.reduce((result, current, idx) => {
        return idx === 0 ?
          `${result} ${current.name} (${current.score})` :
          `${result}, ${current.name} (${current.score})`;
      }, '');
    } else {
      return 'None';
    }
    
  }

  render() {

    let winner = this.state.players.length ? 
      <Typography color='primary' variant='h6'> Winner: {this.findWinner()} </Typography> :
      null;

    return (
      <div className='App'>
        <MuiThemeProvider theme={theme}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography color='primary' variant='h2'>
              Ticket to Ride Score Calculator
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <NewPlayerForm handleSubmit={this.handleSubmit}></NewPlayerForm>
          </Grid>
          <Grid item xs={12}>
            {winner}
          </Grid>
          <Grid item xs={12}>
            {this.renderPlayers()}
          </Grid>
        </Grid>
        </MuiThemeProvider>
      </div>
    );
  }
}
