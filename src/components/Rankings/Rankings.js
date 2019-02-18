import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function compareScores(player1, player2) {
  if (player1.score < player2.score) {
    return 1;
  } else if (player1.score > player2.score) {
    return -1;
  } else {
    return 0;
  }
}

export default class Rankings extends Component {
  buildRows() {
    const players = Object.assign([], this.props.players);
    return players.sort(compareScores).map(player => {
      return <TableRow key={player.name}>
        <TableCell>{player.name}</TableCell>
        <TableCell>{player.score}</TableCell>
      </TableRow>
    });
  }

  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.buildRows()}
        </TableBody>
      </Table>
    );
  }
}
