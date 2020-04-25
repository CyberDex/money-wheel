import { View, App } from 'Pixil'
import { SplashScene } from '../scenes/SplashScene'
import { GameScene } from '../scenes/GameScene'
import { UIScene } from '../scenes/UIScene'
import { Scenes } from '../helpers/enums/Scenes'

export class SceneController {
    private scenes: {
        [key: string]: View
    } = {}

    constructor(private app: App) {
        this.addScene(Scenes.UI, new UIScene())
        this.addScene(Scenes.GAME, new GameScene())
        this.addScene(Scenes.SPLASH, new SplashScene())
    }

    public show(scene: Scenes) {
        this.scenes[scene].visible = true
    }

    public hide(scene: Scenes) {
        this.scenes[scene].visible = false
    }

    public resize() {
        for (const scene in this.scenes) {
            this.scenes[scene].resize()
        }
    }

    public addScene(scene: Scenes, sceneInst: View) {
        sceneInst.visible = false
        this.scenes[scene] = sceneInst
        this.app.stage.addChild(sceneInst)
    }
}