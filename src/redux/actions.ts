import { Actions } from '../helpers/enums/Actions'
import { IAction } from '../helpers/interfaces/IAppState';
import { store } from './store'
import { API, IResult } from 'api/API';
import { gameConf } from "helpers/help"

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

export function startSpin(): IAction {
    API.getResult().then((result: IResult) => store.dispatch(resultLoaded(result)))
    return {
        type: Actions.SPIN_START,
    }
}

export function resultLoaded(result: IResult): IAction {
    const bets = store.getState().bets
    let balance = store.getState().balance
    let winAmount = 0
    if (typeof result.winNumber === 'string') {
        let allBets = 0
        for (const bet in bets) {
            allBets += bets[bet]
        }
        winAmount = allBets * parseInt(result.winNumber)
        balance += winAmount + allBets
    } else if (bets[result.winNumber]) {
        winAmount = bets[result.winNumber] ? bets[result.winNumber] * Number(result.winNumber) : 0
        balance += Number(winAmount) + Number(bets[result.winNumber])
    }

    // console.log(winNumber, bets[winNumber], bets);

    return {
        type: Actions.RESULT_LOADED,
        val: {
            winNumber: result.winNumber,
            wheelField: result.wheelField,
            winAmount,
            balance
        }
    }
}

export function revealResult() {
    store.getState().balance > 0
        ? setTimeout(() => store.dispatch({ type: Actions.BETS_OPEN }), gameConf.resultRevealTime * 1000)
        : setTimeout(() => store.dispatch({ type: Actions.GAME_OVER }), gameConf.resultRevealTime * 5000)
    return {
        type: Actions.RESULT_REVEAL
    }
}