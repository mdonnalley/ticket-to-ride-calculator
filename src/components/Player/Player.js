import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TrainCounter from '../TrainCounter/TrainCounter';
import DestinationCounter from '../DestinationCounter/DestinationCounter';
import Button from '@material-ui/core/Button';
import './Player.css';


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
]

export default  class Player extends Component {
	constructor(props) {
		super(props);
		this.state = {
			destinationCards: {},
			oneCount: 0,
			twoCount: 0,
			threeCount: 0,
			fourCount: 0,
			fiveCount: 0,
			sixCount: 0
		};

		this.incrementTrain = this.incrementTrain.bind(this);
		this.decrementTrain = this.decrementTrain.bind(this);
		this.addNewDestinationCard = this.addNewDestinationCard.bind(this);
		this.updateDesintationCard = this.updateDesintationCard.bind(this);
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
		}, 0)
		const destinationCardScore = Object
			.values(this.state.destinationCards)
			.reduce((result, current) => result += current, 0);
		const score = trainScore + destinationCardScore;
		this.props.handleScoreChange(this.props.player.name, score);
	}

	addNewDestinationCard() {
		const { destinationCards } = this.state;
		const currentNumber = Object.keys(destinationCards).length;
		const newCard = {
			[`Destination Card #${currentNumber + 1}`]: 0
		};
		this.setState(state => ({
			destinationCards: Object.assign({}, destinationCards, newCard)
		}));
	}

	updateDesintationCard(name, points) {
		this.setState(state => ({
			destinationCards: Object.assign({}, state.destinationCards, { [name]: points })
		}), this.updateFinalScore);
	}

	render() {
		return (
			<div className="Player">
				<hr></hr>
				<Typography variant='h5'>
					{titleCase(this.props.player.name)}: {this.props.player.score} 
				</Typography>
				<hr></hr>
				{
						TRAIN_LENGTHS.map(trainLength => {
							return <TrainCounter
									key={trainLength.key}
									decrement={this.decrementTrain}
									increment={this.incrementTrain}
									trainLengthKey={trainLength.key}
									label={trainLength.label}
									value={this.state[trainLength.key]}>
								</TrainCounter>
						})
				}
				{
					Object.keys(this.state.destinationCards).map(card => {
						return <DestinationCounter
							key={card}
							name={card}
							points={this.state.destinationCards[card]}
							update={this.updateDesintationCard}>
						</DestinationCounter>
					})					
				}
				<Button
            type='submit'
            color='primary'
            variant='contained'
						onClick={this.addNewDestinationCard}>
            Add Destination Card
        </Button>
				
			</div>
		)
	}
}