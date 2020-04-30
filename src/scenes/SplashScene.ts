import { View, Slider, Button, Label } from 'pixil'
import { Texts } from 'helpers/enums/Texts'
import { text } from '../helpers/help'
import { store } from '../redux/store'
import { startGame } from 'redux/actions'
import * as style from '../config/styles.json'
import * as config from '../config/scenes/PopupScene.json'
import * as gameConf from '../config/game.json'


export class SplashScene extends View {
    private balance: Label
    private slider: Slider
    private startButton: Button

    constructor() {
        super()
        this.addChild(new Label(text(Texts.START_TITLE), style.title, config.title.x, config.title.y))
        this.balance = new Label(gameConf.minStartBalance, style.subTitle, config.subtitle.x, config.subtitle.y)
        this.addChild(this.balance)

        this.slider = new Slider(
            config.slider.x,
            config.slider.y,
            config.slider.width,
            config.slider.height,
            gameConf.minStartBalance,
            gameConf.maxStartBalance)
        this.slider.onChange(value => this.balance.text = String(value))
        this.addChild(this.slider)

        this.startButton = new Button({
            ...config.button,
            text: text(Texts.START_BUTTON),
            style: style.button
        })
        this.addChild(this.startButton)
        this.startButton.onClick(() => {
            store.dispatch(startGame(this.slider.value))
        })
    }
}