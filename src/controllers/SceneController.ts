import { SceneManager } from 'pixil'
import { SplashScene } from 'scenes/SplashScene'
import { GameScene } from 'scenes/GameScene'
import { UIScene } from 'scenes/UIScene'
import { GameOverScene } from 'scenes/GameOverScene'
import { store } from 'redux/store'
import { Scenes } from 'helpers/enums/Scenes'
import { States } from 'helpers/enums/States'

export class SceneController extends SceneManager {
    constructor() {
        super()

        this.addScene(Scenes.SPLASH, new SplashScene())
        this.addScene(Scenes.UI, new UIScene())
        this.addScene(Scenes.GAME, new GameScene())
        this.addScene(Scenes.GAME_OVER, new GameOverScene())

        this.showOnlyScene(Scenes.SPLASH)

        store.subscribe(() => this.stateChange())
    }

    private stateChange() {
        switch (store.getState().state) {
            case States.INIT:
                this.showOnlyScene(Scenes.SPLASH)
                break
            case States.BETTING:
                this.hideScene(Scenes.SPLASH)
                this.showScene(Scenes.GAME)
                this.showScene(Scenes.UI)
                break
            case States.RESULT:
                break
            case States.GAME_OVER:
                this.showOnlyScene(Scenes.GAME_OVER)
                break
        }
    }
}