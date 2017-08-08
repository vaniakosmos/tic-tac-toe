// @flow
import React from 'react';

import Board from '../Board'

import './index.css'


export default class Game extends React.Component {
    size = 0;

    props: {
        size: number,
    };
    state: {
        history: Array<{
            squares: Array<Array<string | null>>,
            pos: [number, number],
            player: string,
        }>,
        stepNumber: number,
        xIsNext: boolean,
    };

    constructor(props: any) {
        super(props);
        this.size = this.props.size;
        this.state = {
            history: [{
                squares: new Array(this.size).fill(new Array(this.size).fill(null)),
                pos: [-1, -1],
                player: '',
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    calculateWinner(squares: Array<any>): { player: string | null, winners: Array<any> } | null {
        const rows = this.calcRows(squares);
        if (rows) return rows;

        const cols = this.calcCols(squares);
        if (cols) return cols;

        const diags = this.calcDiags(squares);
        if (diags) return diags;

        return null;
    }

    calcRows(squares: Array<any>) {
        for (let y = 0; y < this.size; y++) {
            let a = null;
            let p = null;
            const cells = [];
            let i = 0;
            for (let x = 0; x < this.size; x++) {
                p = squares[y][x];
                if (x === 0 || (a && a === p)) {
                    a = p;
                    i++;
                    cells.push([x, y]);
                } else break;
            }
            if (i === this.size)
                return {player: p, winners: cells}
        }
    }

    calcCols(squares: Array<any>) {
        for (let x = 0; x < this.size; x++) {
            let a = null;
            const cells = [];
            let p = null;
            let i = 0;
            for (let y = 0; y < this.size; y++) {
                p = squares[y][x];
                if (y === 0 || (a && a === p)) {
                    a = p;
                    i++;
                    cells.push([x, y])
                } else break;
            }
            if (i === this.size)
                return {player: p, winners: cells}
        }
    }

    calcDiags(squares: Array<any>) {
        const cells1 = [];
        const cells2 = [];
        let p1 = null;
        let p2 = null;
        for (let i = 0; i < this.size; i++) {
            const c1 = squares[i][i];
            const c2 = squares[i][this.size - i - 1];
            if (i === 0 || (p1 && p1 === c1)) {
                p1 = c1;
                cells1.push([i, i])
            }
            if (i === 0 || (p2 && p2 === c2)) {
                p2 = c2;
                cells2.push([i, this.size - i - 1])
            }
        }

        if (cells1.length === this.size)
            return {player: p1, winners: cells1};
        if (cells2.length === this.size)
            return {player: p2, winners: cells2};
        return null;
    }

    handleClick(x: number, y: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = JSON.parse(JSON.stringify(current.squares));
        const player = this.state.xIsNext ? 'X' : 'O';

        if (this.calculateWinner(squares) || squares[y][x]) {
            return;
        }
        squares[y][x] = player;
        this.setState((prevState) => ({
            history: history.concat([{
                squares: squares,
                pos: [x, y],
                player: player,
            }]),
            stepNumber: history.length,
            xIsNext: !prevState.xIsNext,
        }));
    }

    jumpTo(move: number) {
        this.setState({
            stepNumber: move,
            xIsNext: move % 2 === 0,
        });
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const win = this.calculateWinner(current.squares);

        const moves = history.map((history, index) => {
            const desc = index
                ? `${history.player} moved to (${history.pos[0]}, ${history.pos[1]})`  // don't show initial
                : 'Game start';
            const selected = this.state.stepNumber === index ? 'selected' : null;
            return (
                <li key={index} className={selected}>
                    <span className="history-link" onClick={() => this.jumpTo(index)}>{desc}</span>
                </li>
            );
        });

        let status;
        if (win && win.player) {
            status = 'Winner: ' + win.player;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board size={this.size}
                           winners={win && win.winners}
                           squares={current.squares}
                           onClick={(x, y) => this.handleClick(x, y)}/>
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
