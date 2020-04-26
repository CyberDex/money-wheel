import { Actions } from '../helpers/enums/Actions'
import { IAppState, IAction } from '../helpers/interfaces/IAppState'
import { States } from 'helpers/enums/States'

const initialState: IAppState = {
    state: States.INIT,
    result: undefined,
    balance: 0,
    bets: {}
}

export function mainReducer(state: IAppState = initialState, action: IAction) {
    switch (action.type) {
        case Actions.INIT:
            return {
                ...state,
                state: States.INIT
            }
        case Actions.START_GAME:
            return {
                ...state,
                state: States.BETTING,
                balance: action.val,
                result: undefined,
                bets: {}
            }
        case Actions.BETS_OPEN:
            return {
                ...state,
                state: States.BETTING,
                result: undefined,
                bets: {}
            }
        case Actions.PLACE_BET:
            return {
                ...state,
                balance: action.val.balance,
                bets: action.val.bets
            }
        case Actions.SPIN_START:
            return {
                ...state,
                state: States.SPIN
            }
        case Actions.RESULT_LOADED:
            return {
                ...state,
                state: States.RESULT,
                result: action.val,
            }
        case Actions.GAME_OVER:
            return {
                ...state,
                state: States.GAME_OVER
            }
        default:
            return state
    }
}