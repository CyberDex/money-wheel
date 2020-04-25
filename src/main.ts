import { App } from 'Pixil'
import { SceneController } from 'controllers/SceneController'

new class Game extends App {
    private sceneController: SceneController

    constructor() {
        super()
        this.sceneController = new SceneController(this)
    }

    public resizeHandler() {
        this.sceneController.resize()
    }
}