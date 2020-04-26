import { App } from 'pixil'
import { SceneController } from 'controllers/SceneController'

new class Game extends App {
    constructor() {
        super({ antialias: true })
        this.stage.addChild(new SceneController())
        document.body.appendChild(this.view)
    }
}