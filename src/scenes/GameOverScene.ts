import { View, Button } from 'Pixil/index'
import { Text } from 'pixi.js'
import { Texts } from 'helpers/enums/Texts'
import * as lang from '../config/local/en.json'
import * as styles from '../config/styles.json'
import * as config from '../config/SplashScene.json'
import { store } from '../redux/store'
import { Actions } from '../helpers/enums/Actions';

export class GameOverScene extends View {
    private text: Text
    private balance: Text
    private startButton: Button

    constructor() {
        super()
        this.text = this.addText(lang[Texts.GAME_OVER_TITLE], styles.title)
        this.balance = this.addText(lang[Texts.GAME_OVER_TEXT], styles.subTitle)

        this.startButton = new Button(
            config.button.widht,
            config.button.height,
            lang[Texts.GAME_OVER_BUTTON],
            styles.button,
            Number(config.button.color),
            config.button.radius
        )
        this.addChild(this.startButton)
        this.startButton.onClick(() => {
            store.dispatch({ type: Actions.INIT })
        })
    }

    public resize(w, h: number) {
        this.text.x = w * .5
        this.text.y = h * .4

        this.balance.x = w * .5
        this.balance.y = h * .5

        this.startButton.x = w / 2
        this.startButton.y = h * .7
    }
}