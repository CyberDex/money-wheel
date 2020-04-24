import { Application } from 'pixi.js'
import { SceneManager } from 'pixi-scenes'
import { BaseScene } from './scenes/BaseScene'
import { SplashScene } from './scenes/SplashScene'
import { GameScene } from './scenes/GameScene'
import { UIScene } from './scenes/UIScene'
import { Scenes } from './helpers/enums/Scenes'

new class Game extends Application {
    private sceneManager: SceneManager
    private scenes: {
        [key: string]: BaseScene
    } = {}

    constructor() {
        super()
        this.init()
        window.addEventListener('resize', () => this.resizeHandler())
        document.body.appendChild(this.view)
    }

    private init() {
        this.initScenes()
        this.startScene(Scenes.SPLASH)
        this.resizeHandler()
    }

    private initScenes() {
        this.sceneManager = new SceneManager(this)
        this.addScene(Scenes.UI, new UIScene())
        this.addScene(Scenes.GAME, new GameScene())
        this.addScene(Scenes.SPLASH, new SplashScene())
    }

    private addScene(scene: Scenes, sceneInst: BaseScene) {
        this.scenes[scene] = sceneInst
        this.sceneManager.add(scene, sceneInst)
    }

    private startScene(scene: Scenes) {
        this.sceneManager.start(scene)
    }

    private resizeHandler() {
        this.renderer.resize(window.innerWidth, window.innerHeight)
        for (const scene in this.scenes) {
            this.scenes[scene].resize()
        }
    }
}