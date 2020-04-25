import { View } from 'Pixil'
import { Text, TextStyle } from 'pixi.js'
import * as lang from '../config/local/en.json'
import * as styles from '../config/styles.json'
import { Texts } from 'helpers/enums/Texts'

export class SplashScene extends View {
    private text: Text

    constructor() {
        super()
        this.text = this.addText(lang[Texts.STARTING_BALANCE], styles[Texts.STARTING_BALANCE] as TextStyle)
    }

    public resize(w, h: number) {
        this.text.x = w * .5
        this.text.y = h * .35
    }
}