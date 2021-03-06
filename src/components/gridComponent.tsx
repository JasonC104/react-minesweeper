import * as React from 'react';
import { connect } from 'react-redux';

import { Grid, Store } from '../model';
import { GridButton } from './';
import { getCell } from '../utils';

interface GridComponentProps {
    gameOver: boolean;
    win: boolean
}

interface GridComponentStateProps {
    grid: Grid;
}

function GridComponentView(props: GridComponentProps & GridComponentStateProps) {
    const grid = props.grid;
    const gridButtons: JSX.Element[] = [];
    for (let row = grid.rows - 1; 0 <= row; row--) {
        const rowButtons: JSX.Element[] = [];
        for (let column = 0; column < grid.columns; column++) {
            const cell = getCell(grid, column, row);
            rowButtons.push(<GridButton key={`${row}, ${column}`} gridValue={cell} open={cell.open} flag={cell.flag} disabled={props.gameOver || props.win} />);
        }
        gridButtons.push(<div key={row} className="buttons has-addons is-marginless is-centered">{rowButtons}</div>);
    }

    return (
        <div>
            <div className="grid">
                {gridButtons}
            </div>
        </div>
    );
}

function mapStateToProps(state: Store): GridComponentStateProps {
    return { grid: state.grid };
}

export const GridComponent = connect(mapStateToProps)(GridComponentView);
