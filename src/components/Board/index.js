import React from 'react';
import PropTypes from 'prop-types';

import Square from "../Square";
import './index.css'


export default class Board extends React.Component {
    renderSquare(x, y, winner) {
        const index = x * this.props.size + y;
        return <Square
            key={index}
            value={this.props.squares[y][x]}
            winner={winner}
            onClick={() => this.props.onClick(x, y)}
        />;
    }

    render() {
        const winners = this.props.winners;
        const size = this.props.size;
        const rows = [];

        for (let y = 0; y < size; y++) {
            const row = [];
            for (let x = 0; x < size; x++) {
                const winner = winners && !!winners.find((e) => e[0] === x && e[1] === y);
                row.push(this.renderSquare(x, y, winner))
            }
            rows.push(<div className="board-row" key={y}> {row} </div>)
        }

        return (
            <div>
                {rows}
            </div>
        );
    }
}

Board.propTypes = {
    squares: PropTypes.array,
    size: PropTypes.number,
    onClick: PropTypes.func,
    winners: PropTypes.array,
};
