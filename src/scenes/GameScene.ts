import { View } from 'pixil'
import * as config from '../config/scenes/gameScene.json'
import { Wheel } from '../components/Wheel';

export class GameScene extends View {
    public wheel: Wheel

    constructor() {
        super()

        this.wheel = new Wheel(config.wheel.x, config.wheel.y, config.wheel.radius)
        this.addChild(this.wheel)
    }
}