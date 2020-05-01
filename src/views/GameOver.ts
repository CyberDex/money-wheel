import { View, Button, Label } from 'pixil'
import { Texts } from 'helpers/enums/Texts'
import { store } from '../redux/store'
import { Actions } from '../helpers/enums/Actions';
import { text } from 'helpers/help'
import * as style from '../config/styles.json'
import * as config from '../config/scenes/PopupScene.json'
import { TextStyle } from 'pixi.js';

export class GameOver extends View {
    private restartButton: Button

    constructor() {
        super()
        this.addChild(new Label(text(Texts.GAME_OVER_TITLE), style.title as TextStyle, config.title.x, config.title.y))
        this.addChild(new Label(text(Texts.GAME_OVER_TEXT), style.subTitle as TextStyle, config.subtitle.x, config.subtitle.y))

        this.restartButton = new Button({
            ...config.button,
            text: text(Texts.GAME_OVER_BUTTON),
            style: style.button as TextStyle
        })
        this.addChild(this.restartButton)
        this.restartButton.onClick(() => {
            store.dispatch({ type: Actions.INIT })
        })
    }
}