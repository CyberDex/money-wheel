import { Actions } from '../helpers/enums/Actions'
import { store } from './store'
import { API, IResult } from 'api/API'
import gameConf from "config/game"
import { IAction } from './reducers'


export function startSpin(): IAction {
    setTimeout(() => store.dispatch({ type: Actions.BETS_OPEN }), 1000)
    return {
        type: Actions.SPIN_START,
    }
}

export function revealResult() {
    store.dispatch({ type: Actions.BETS_OPEN })
    return {
        type: Actions.RESULT_REVEAL
    }
}