import { View, Animation } from 'pixil'
import * as config from '../config/scenes/gameScene.json'
import { Wheel } from '../components/Wheel'
import { store } from 'redux/store'
import { States } from 'helpers/enums/States'
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
                    rotation: 360
                }
            }
        )

        store.subscribe(() => this.stateChange())
    }

    private stateChange() {
        switch (store.getState().state) {
            case States.BETTING:

                break
            case States.SPIN:
                this.animation.play()
                break
            case States.RESULT:

                break
        }
    }
}