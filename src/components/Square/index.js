import React from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';

import './index.css'


export default function Square(props) {
    const winner = props.winner ? 'winner' : null;
    return (
        <button className={classNames(["square", winner])}
                onClick={props.onClick}>
            {props.value}
        </button>
    );
}

Square.propTypes = {
    value: PropTypes.string,
    winner: PropTypes.bool,
    onClick: PropTypes.func,
};
