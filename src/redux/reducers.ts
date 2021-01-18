import { Actions } from '../helpers/enums/Actions'
import { States } from 'helpers/enums/States'

const initialState: IAppState = {
    state: States.BETTING,
}

export function mainReducer(state: IAppState = initialState, action: IAction) {
    switch (action.type) {
        case Actions.BETS_OPEN:
            return {
                ...state,
                state: States.BETTING,
            }
        case Actions.SPIN_START:
            return {
                ...state,
                state: States.SPIN
            }
        default:
            return state
    }
}

export interface IAppState {
    state?: States
}

export interface IAction extends IAppState {
    type: Actions,
    val?: any
}