import { Actions } from '../helpers/enums/Actions'
import { IAction } from '../helpers/interfaces/IAppState';
import { store } from './store'
import * as gameConf from '../config/game.json'
import { API } from 'api/API';

export function startSpin(): IAction {
    API.getResult().then(result => store.dispatch(resultLoaded(result)))
    return {
        type: Actions.SPIN_START,
    }
}

export function resultLoaded(winNumber: number): IAction {
    const bets = store.getState().bets
    const winMultiplyer = gameConf.multipliers[winNumber] ? gameConf.multipliers[winNumber] : 1
    const winAmount = bets[winNumber] ? bets[winNumber] * winNumber : 0
    const balance = store.getState().balance + (winAmount ? (Number(bets[winNumber]) + Number(winAmount)) : 0)

    setTimeout(() => store.dispatch({
        type: balance > 0 ? Actions.BETS_OPEN : Actions.GAME_OVER
    }), gameConf.resultRevealTime * 1000)

    return {
        type: Actions.RESULT_LOADED,
        val: {
            winNumber,
            winAmount,
            winMultiplyer,
            balance
        }
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