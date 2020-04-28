import { Actions } from '../helpers/enums/Actions'
import { wheelGenerator } from '../helpers/wheelGenerator'
import { IAction } from '../helpers/interfaces/IAppState';
import { store } from './store'
import * as gameConf from '../config/game.json'

export function startSpin(): IAction {
    getResult().then(result => store.dispatch(resultLoaded(result)))
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

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json()
}

async function getResult() {
    const wheel = wheelGenerator(gameConf.bets, gameConf.multipliers)

    const responce = await postData('https://api.random.org/json-rpc/2/invoke', {
        "jsonrpc": "2.0",
        "method": "generateIntegers",
        "params": {
            "apiKey": "2bf06986-9294-493e-8bc8-bace9a2e16c2",
            "n": 1,
            "min": 0,
            "max": wheel.length - 1,
            "replacement": true,
            "base": 10
        },
        "id": 21012
    })
    const wheelField = responce.result.random.data[0]
    const winNumber = wheel[wheelField]

    return wheel[winNumber]
}