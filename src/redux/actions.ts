import { Actions } from '../helpers/enums/Actions'
import { IAction } from '../helpers/interfaces/IAppState';
import { store } from './store'
import * as gameConf from '../config/game.json'

export function startSpin(): IAction {
    setTimeout(() => store.dispatch(resultLoaded(5)), gameConf.spinTime * 1000)
    return {
        type: Actions.SPIN_START,
    }
}

export function resultLoaded(val: number): IAction {
    setTimeout(() => store.dispatch({
        type: store.getState().balance > 0 ? Actions.BETS_OPEN : Actions.GAME_OVER
    }), gameConf.resultRevealTime * 1000)
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
    const balance = store.getState().balance - amount
    const bets = { ...store.getState().bets }
    bets[bet] = bets[bet]
        ? bets[bet] + amount
        : amount
    return {
        type: Actions.PLACE_BET,
        val: { balance, bets }
    }
}