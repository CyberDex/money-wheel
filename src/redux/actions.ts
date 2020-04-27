import { Actions } from '../helpers/enums/Actions'
import { IAction } from '../helpers/interfaces/IAppState';
import { store } from './store'
import * as gameConf from '../config/game.json'

export function startSpin(): IAction {
    setTimeout(() => store.dispatch(resultLoaded(getResult())), gameConf.spinTime * 1000)
    return {
        type: Actions.SPIN_START,
    }
}

export function resultLoaded(winNumber: number): IAction {
    const bets = store.getState().bets
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

function getResult() {
    const wheel = []
    for (const num in gameConf.bets) {
        for (let i = 0; i < gameConf.bets[num]; i++) {
            wheel.push(num)
        }
    }
    const result = wheel[Math.floor(Math.random() * wheel.length)]
    return result
}