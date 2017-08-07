import React from 'react';

import Square from "../Square";
import './index.css'


export default class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: new Array(9).fill(null),
            xIsNext: true,
        };
    }


    renderSquare(i) {
        return <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

    render() {
        const size = 5;
        const rows = [];

        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(this.renderSquare(i * size + j))
            }
            rows.push(<div className="board-row" key={i}>{row}</div>)
        }

        return (
            <div>
                {rows}
            </div>
        );
    }
}
