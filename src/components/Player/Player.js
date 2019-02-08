import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Counter from '../Counter/Counter';
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
			oneCount: 0,
			twoCount: 0,
			threeCount: 0,
			fourCount: 0,
			fiveCount: 0,
			sixCount: 0
		};

		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
	}

	increment(key) {
		this.setState(state => ({ [key]: state[key] + 1 }), this.updateFinalScore);
	}

	decrement(key) {
		this.setState(state => ({ [key]: state[key] - 1 }), this.updateFinalScore);
	}

	updateFinalScore() {
		const score = TRAIN_LENGTHS.reduce((result, current) => {
			return result += (this.state[current.key] * current.multiplier)
		}, 0)
		this.props.handleScoreChange(this.props.player.name, score);
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
							return <Counter
									key={trainLength.key}
									decrement={this.decrement}
									increment={this.increment}
									trainLengthKey={trainLength.key}
									label={trainLength.label}
									value={this.state[trainLength.key]}>
								</Counter>
						})
				}
			</div>
		)
	}
}