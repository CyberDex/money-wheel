import { Actions } from '../helpers/enums/Actions'
import { IAction } from '../helpers/interfaces/IAppState'

export function startSpin(): IAction {
    return {
        type: Actions.SPIN_START,
    }
}

export function resultLoaded(val: number): IAction {
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