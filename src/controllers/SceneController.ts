import { View, App } from 'Pixil'
import { SplashScene } from '../scenes/SplashScene'
import { GameScene } from '../scenes/GameScene'
import { UIScene } from '../scenes/UIScene'
import { Scenes } from '../helpers/enums/Scenes'
import { gsap } from "gsap"
import { States } from '../helpers/enums/States'
import { store } from 'redux/store'

export class SceneController {
    private scenes: {
        [key: string]: View
    } = {}

    constructor(private app: App) {
        this.addScene(Scenes.UI, new UIScene())
        this.addScene(Scenes.GAME, new GameScene())
        this.addScene(Scenes.SPLASH, new SplashScene())

        store.subscribe(() => this.stateChange())
    }

    private stateChange() {
        switch (store.getState().state) {
            case States.BETTING:
                this.hide(Scenes.SPLASH)
                this.show(Scenes.GAME)
                this.show(Scenes.UI)
                break;
            case States.SPIN:

                break;
            case States.RESULT:

                break;
            default:
                break;
        }
    }

    public show(scene: Scenes) {
        this.scenes[scene].visible = true
        gsap.to(this.scenes[scene], {
            alpha: 1,
            duration: .3
        })
    }

    public hide(scene: Scenes) {
        gsap.to(this.scenes[scene], {
            alpha: 0,
            duration: .3,
            onComplete: () => {
                this.scenes[scene].visible = false
            }
        })
    }

    public resize(w, h: number) {
        for (const scene in this.scenes) {
            this.scenes[scene].resize(w, h)
        }
    }

    public addScene(scene: Scenes, sceneInst: View) {
        sceneInst.visible = false
        this.scenes[scene] = sceneInst
        this.app.stage.addChild(sceneInst)
    }
}