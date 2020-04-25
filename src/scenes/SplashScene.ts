import { View, Slider } from 'Pixil'
import { Text, TextStyle } from 'pixi.js'
import * as lang from '../config/local/en.json'
import * as styles from '../config/styles.json'
import { Texts } from 'helpers/enums/Texts'

export class SplashScene extends View {
    private text, balance: Text
    private slider: Slider

    constructor() {
        super()
        this.text = this.addText(lang[Texts.STARTING_BALANCE], styles[Texts.STARTING_BALANCE] as TextStyle)
        this.balance = this.addText("0", styles[Texts.STARTING_BALANCE] as TextStyle)
        this.slider = new Slider(0, 0, 200, 40)
        this.addChild(this.slider)
    }

    public resize(w, h: number) {
        this.text.x = w * .5
        this.text.y = h * .35
        this.balance.x = w * .5
        this.balance.y = h * .42
        this.slider.x = w * .5
        this.slider.y = h * .5
    }
}