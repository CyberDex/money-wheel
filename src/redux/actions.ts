import { Actions } from '../helpers/enums/Actions'
import { IAction } from '../helpers/interfaces/IAppState';
import { store } from './store'
import { API } from 'api/API';
import * as gameConf from '../config/game.json'

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
    API.getResult().then((result: string) => store.dispatch(resultLoaded(result)))
    return {
        type: Actions.SPIN_START,
    }
}

export function resultLoaded(winNumber: string): IAction {
    const bets = store.getState().bets
    let balance = store.getState().balance
    let winAmount = 0
    if (winNumber === 'X2') {
        let allBets = 0
        for (const bet in bets) {
            allBets += bets[bet]
        }
        winAmount = allBets * 2
        balance += winAmount + allBets
    } else if (bets[winNumber]) {
        winAmount = bets[winNumber] ? bets[winNumber] * Number(winNumber) : 0
        balance += Number(winAmount) + Number(bets[winNumber])
    }

    // console.log(winNumber, bets[winNumber], bets);

    balance > 0
        ? setTimeout(() => store.dispatch({ type: Actions.BETS_OPEN }), gameConf.resultRevealTime * 1000)
        : setTimeout(() => store.dispatch({ type: Actions.GAME_OVER }), gameConf.resultRevealTime * 5000)

    return {
        type: Actions.RESULT_LOADED,
        val: {
            winNumber,
            winAmount,
            balance
        }
    }
}