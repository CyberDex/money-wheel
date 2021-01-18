import { View, Button, Label, App } from 'pixil'
import { store } from '../redux/store'
import { placeBet, startSpin } from 'redux/actions'
import { States } from 'helpers/enums/States'
import gameConf from "config/game"
import config from 'config/ui'

export class UI extends View {
    private spinButton: Button

    constructor(private readonly app: App) {
        super()

        const buttonStyle = {
            fontFamily: "Arial",
            fontSize: 24,
            fontWeight: "bold",
            fill: "#ffffff",
            width: 50,
            height: 50
        }

        this.spinButton = this.addButton(
            'spin',
            config.spinButton,
            buttonStyle,
            () => store.dispatch(startSpin())
        )
        this.addChild(this.spinButton)
        this.app.layout.update()
    }

    private addButton(text: string | number, conf: any = config.betButton, styles, onClick) {
        const button = new Button({
            ...conf,
            text,
            styles
        })
        this.addChild(button)
        button.onClick(() => onClick())
        return button
    }

    public onResize(w, h: number) {
        super.onResize(w, h)
        this.spinButton.x = w / 2
        this.spinButton.y = h / 2
    }
}