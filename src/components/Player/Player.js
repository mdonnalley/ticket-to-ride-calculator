import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TrainCounter from '../TrainCounter/TrainCounter';
import DestinationCounter from '../DestinationCounter/DestinationCounter';
import DestinationSelector from '../DestinationSelector/DestinationSelector';
import Grid from '@material-ui/core/Grid';
import './Player.css';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';


function titleCase(str) {
	return str.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
}

const TRAIN_LENGTHS = [
	{ key: 'oneCount', label: 'One Trains', multiplier: 1 },
	{ key: 'twoCount', label: 'Two Trains', multiplier: 2 },
	{ key: 'threeCount', label: 'Three Trains', multiplier: 4 },
	{ key: 'fourCount', label: 'Four Trains', multiplier: 7 },
	{ key: 'fiveCount', label: 'Five Trains', multiplier: 10 },
	{ key: 'sixCount', label: 'Six Trains', multiplier: 15 }
];

export default  class Player extends Component {
	constructor(props) {
		super(props);
		this.state = {
			destinationCards: [],
			oneCount: 0,
			twoCount: 0,
			threeCount: 0,
			fourCount: 0,
			fiveCount: 0,
			sixCount: 0
		};

		this.incrementTrain = this.incrementTrain.bind(this);
		this.decrementTrain = this.decrementTrain.bind(this);
		this.addDestinationCard = this.addDestinationCard.bind(this);
		this.updateDestinationCard = this.updateDestinationCard.bind(this);
		this.removeDestinationCard = this.removeDestinationCard.bind(this);
		this.removePlayer = this.removePlayer.bind(this);
	}

	incrementTrain(key) {
		this.setState(state => ({ [key]: state[key] + 1 }), this.updateFinalScore);
	}

	decrementTrain(key) {
		this.setState(state => ({ [key]: state[key] - 1 }), this.updateFinalScore);
	}

	updateFinalScore() {
		const trainScore = TRAIN_LENGTHS.reduce((result, current) => {
			return result += (this.state[current.key] * current.multiplier)
		}, 0);
		const destinationCardScore = this.state.destinationCards
			.reduce((result, current) => result += current.value, 0);
		const score = trainScore + destinationCardScore;
		this.props.handleScoreChange(this.props.player.id, score);
	}

	addDestinationCard(card) {
		this.setState(state => ({
			destinationCards: [...state.destinationCards, card]
		}), this.updateFinalScore);
		this.props.handleCardAction(card, 'add');
	}

	removeDestinationCard(card) {
		this.setState(state => ({
			destinationCards: state.destinationCards.filter(c => c.title !== card.title)
		}), this.updateFinalScore);
		this.props.handleCardAction(card, 'remove');
	}

	updateDestinationCard(card) {
		this.setState(state => ({
			destinationCards: state.destinationCards.map(c => {
				return c.title === card.title ? card : c;
			})
		}), this.updateFinalScore);
	}

	removePlayer(event) {
		this.props.handleRemovePlayer(this.props.player, event);
	}

	render() {
		return (
			<div className='Player'>
				<Typography color='primary' variant='h5'>
					{titleCase(this.props.player.name)}: {this.props.player.score} 
					<IconButton onClick={this.removePlayer}>
						<Delete color='action' ></Delete>
					</IconButton>
				</Typography>
				
				<hr></hr>
				<Grid container spacing={24}>
					<Grid item sm={6} xs={12}>
						<Typography color='primary' variant='h6'>Trains</Typography>
						{TRAIN_LENGTHS.map(trainLength => {
							return <TrainCounter
								key={trainLength.key}
								decrement={this.decrementTrain}
								increment={this.incrementTrain}
								trainLengthKey={trainLength.key}
								label={trainLength.label}
								value={this.state[trainLength.key]}>
							</TrainCounter>
						})}
					</Grid>
					<Grid item sm={6} xs={12}>
						<DestinationSelector
							card={{ title: '', value: 0 }}
							options={this.props.availableCards}
							onAdd={this.addDestinationCard}>
						</DestinationSelector>
						{this.state.destinationCards.map(card => {
							return <DestinationCounter
								key={card.title}
								card={card}
								update={this.updateDestinationCard}
								remove={this.removeDestinationCard}>
							</DestinationCounter>
						})}
						
					</Grid>
				</Grid>
			</div>
		)
	}
}