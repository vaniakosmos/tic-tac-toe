// @flow
import React from 'react';

import Square from "../Square";
import './index.css'


export default class Board extends React.Component {
    props: {
        size: number,
        squares: Array<Array<string | null>>,
        onClick: Function,
        winners: Array<[number, number]> | null,
    };

    renderSquare(x: number, y: number, winner: boolean) {
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
                const winner = !!(winners && winners.find((e) => e[0] === x && e[1] === y));
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
