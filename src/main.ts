import { View, App } from 'Pixil'
import { SplashScene } from './scenes/SplashScene'
import { GameScene } from './scenes/GameScene'
import { UIScene } from './scenes/UIScene'
import { Scenes } from './helpers/enums/Scenes'

new class Game extends App {
    private scenes: {
        [key: string]: View
    } = {}

    constructor() {
        super()
        this.init()
    }

    private init() {
        this.addScene(Scenes.UI, new UIScene())
        this.addScene(Scenes.GAME, new GameScene())
        this.addScene(Scenes.SPLASH, new SplashScene())
    }

    private addScene(scene: Scenes, sceneInst: View) {
        this.scenes[scene] = sceneInst
        this.stage.addChild(sceneInst)
    }

    public resizeHandler() {
        super.resizeHandler()
        for (const scene in this.scenes) {
            this.scenes[scene].resize()
        }
    }
}