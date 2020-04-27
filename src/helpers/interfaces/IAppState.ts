import { Actions } from '../enums/Actions'
import { States } from '../enums/States'

export interface IAppState {
    state?: States
    winNumber?: number
    winAmount?: number
    balance?: number
    bets?: {
        [key: string]: number
    }
}

export interface IAction extends IAppState {
    type: Actions,
    val?: any
}