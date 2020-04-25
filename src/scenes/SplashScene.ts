import { View, Slider } from 'Pixil'
import { Text, TextStyle } from 'pixi.js'
import { Texts } from 'helpers/enums/Texts'
import * as lang from '../config/local/en.json'
import * as styles from '../config/styles.json'
import * as config from '../config/SplashScene.json'

export class SplashScene extends View {
    private text: Text
    private balance: Text
    private slider: Slider

    constructor() {
        super()
        this.text = this.addText(lang[Texts.STARTING_BALANCE], styles[Texts.STARTING_BALANCE] as TextStyle)
        this.balance = this.addText(String(config.minCoins), styles[Texts.STARTING_BALANCE] as TextStyle)

        this.slider = new Slider(config.slider.w, config.slider.h, config.minCoins, config.maxCoins)
        this.slider.onChange(value => this.balance.text = String(value))
        this.addChild(this.slider)
    }

    public resize(w, h: number) {
        this.text.x = w * .5
        this.text.y = h * .35

        this.balance.x = w * .5
        this.balance.y = h * .4

        this.slider.x = w / 2 - config.slider.w / 2
        this.slider.y = h * .43
    }
}