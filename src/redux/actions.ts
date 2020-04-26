import { Actions } from '../helpers/enums/Actions'
import { IAction } from '../helpers/interfaces/IAppState'
import { store } from './store'

export function startSpin(): IAction {
    setTimeout(() => store.dispatch(resultLoaded(5)), 2)
    return {
        type: Actions.SPIN_START,
    }
}

export function resultLoaded(val: number): IAction {
    setTimeout(() => store.dispatch({ type: Actions.BETS_OPEN }), 2)
    return {
        type: Actions.RESULT_LOADED,
        val
    }
}

export function startGame(val: number): IAction {
    return {
        type: Actions.START_GAME,
        val
    }
}

export function placeBet(bet: string, amount: number): IAction {
    return {
        type: Actions.PLACE_BET,
        val: { bet, amount }
    }
}