// @flow
import React from 'react';
import classNames from 'classnames'

import './index.css'

type Props = {
    value: string | null,
    onClick: () => void,
    winner?: boolean,
}

export default function Square(props: Props) {
    const winner = props.winner ? 'winner' : null;
    return (
        <button className={classNames(["square", winner])}
                onClick={props.onClick}>
            {props.value}
        </button>
    );
}
