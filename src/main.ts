import { App } from 'Pixil'
import { SceneController } from 'controllers/SceneController'
import { Scenes } from 'helpers/enums/Scenes'

new class Game extends App {
    private sceneController: SceneController

    constructor() {
        super({ antialias: true })
        this.sceneController = new SceneController(this)
        this.sceneController.show(Scenes.SPLASH)
        this.resizeHandler()
    }

    public resizeHandler() {
        const w = this.renderer.width
        const h = this.renderer.height
        this.sceneController.resize(w, h)
    }
}