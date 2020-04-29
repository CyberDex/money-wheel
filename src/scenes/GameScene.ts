import { View, Animation } from 'pixil'
import { Wheel } from '../components/Wheel'
import { store } from 'redux/store'
import { States } from 'helpers/enums/States'
import { revealResult } from 'redux/actions'
import * as config from '../config/scenes/gameScene.json'
import * as gameConf from '../config/game.json'

export class GameScene extends View {
    public wheel: Wheel
    private animation: Animation

    constructor() {
        super()

        this.wheel = new Wheel(config.wheel.x, config.wheel.y, config.wheel.radius)
        this.addChild(this.wheel)

        this.animation = new Animation(
            this.wheel,
            {
                delay: gameConf.spinTime,
                animate: {
                    rotation: 1
                }
            }
        )
        window['wheel'] = this.wheel
        store.subscribe(() => this.stateChange())
    }

    private stateChange() {
        switch (store.getState().state) {
            case States.SPIN:
                this.animation.play()
                break
            case States.RESULT_LOADED:
                setTimeout(() => {
                    this.animation.stop()

                    const angle = this.radToDeg(this.wheel.rotation)
                    const sectorSize = 360 / this.wheel.wheelNumbers.length
                    const wheelField = store.getState().wheelField

                    // TODO: stop the wheel slowly on this angle
                    this.wheel.rotation = this.degToRad(-wheelField * sectorSize)

                    store.dispatch(revealResult())
                }, gameConf.spinTime * 1000)
                break
        }
    }

    private degToRad(deg: number): number {
        return (deg * Math.PI) / 180
    }

    private radToDeg(rad: number): number {
        return rad * 180 * Math.PI
    }
}