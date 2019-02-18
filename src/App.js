import React, { Component } from 'react';
import Player from './components/Player/Player';
import NewPlayerForm from './components/NewPlayerForm/NewPlayerForm';
import Rankings from './components/Rankings/Rankings';
import LongestTrain from './components/LongestTrain/LongestTrain';
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
    this.handleNewPlayer = this.handleNewPlayer.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.handleCardAction = this.handleCardAction.bind(this);
    this.handleLongestTrain = this.handleLongestTrain.bind(this);
  }

  handleNewPlayer(player, event) {
    const newPlayer = { name: player, score: 0, longestTrain: false };
    this.setState(state => ({
      players: [...state.players, newPlayer],
    }));
    event.preventDefault();
  }

  handleScoreChange(name, score) {
    this.setState(state => ({
      players: state.players.map(player => {
        if (player.name === name) {
          let playerScore = player.longestTrain ? score + 10 : score;
          return Object.assign({}, player, { score: playerScore });
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

  handleLongestTrain(name) {
    this.setState(state => ({
      players: state.players.map(player => {
        if (name === player.name && !player.longestTrain) {
          return { name, score: player.score += 10, longestTrain: true };
        } else if (player.longestTrain && player.name !== name) {
          return { name: player.name, score: player.score -= 10, longestTrain: false };
        } else {
          return player;
        }
      })
    }))
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

  maybeRenderRankings() {
    return this.state.players.length ?
      <Rankings players={this.state.players}></Rankings> :
      null
  }

  maybeRenderLongestTrain() {
    return this.state.players.length ?
      <LongestTrain
        players={this.state.players}
        handleLongestTrain={this.handleLongestTrain}>
      </LongestTrain> :
      null
  }

  render() {
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
            <NewPlayerForm handleSubmit={this.handleNewPlayer}></NewPlayerForm>
          </Grid>
          <Grid item xs={12}>
            {this.maybeRenderRankings()}
          </Grid>
          <Grid item xs={12}>
            {this.maybeRenderLongestTrain()}
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
