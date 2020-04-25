import { Actions } from '../enums/Actions'
import { States } from '../enums/States'

export interface IAppState {
    state?: States
    result?: number
    balance?: number
}

export interface IAction extends IAppState {
    type: Actions,
    val?: any
}