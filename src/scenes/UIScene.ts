import { View, Button, Label } from 'pixil'
import { store } from '../redux/store'
import { Texts } from 'helpers/enums/Texts'
import { placeBet, startSpin } from 'redux/actions'
import { States } from 'helpers/enums/States'
import * as style from '../config/styles.json'
import * as config from '../config/scenes/UIScene.json'
import * as gameConf from '../config/game.json'
import { text } from 'helpers/help'

export class UIScene extends View {
    private balance: Label
    private bets: { [bet: string]: Button } = {}
    private betsVal: { [bet: string]: Label } = {}
    private spinButton: Button

    constructor() {
        super()
        this.balance = new Label("", style.subTitle, config.balance.x, config.balance.y)
        this.addChild(this.balance)

        for (const bet in gameConf.betNumers) {
            this.bets[bet] = this.addButton(
                bet,
                config.betButton,
                style.button,
                () => store.dispatch(placeBet(bet, 1))
            )
            this.betsVal[bet] = new Label("", style.betValue, config.betVal.x, config.betVal.y)
            this.addChild(this.betsVal[bet])
        }

        this.spinButton = this.addButton(
            text(Texts.SPIN_BUTTON),
            config.spinButton,
            style.button,
            () => store.dispatch(startSpin())
        )
        this.addChild(this.spinButton)

        store.subscribe(() => this.stateChange())
    }

    private addButton(text: string, conf: any = config.betButton, styles, onClick) {
        const button = new Button(
            conf.x,
            conf.y,
            conf.widht,
            conf.height,
            text,
            styles,
            conf.radius
        )
        this.addChild(button)
        button.onClick(() => onClick())
        return button
    }

    private stateChange() {
        switch (store.getState().state) {
            case States.BETTING:
                for (const bet in gameConf.betNumers) {
                    this.bets[bet].active = store.getState().balance > 0
                }
                this.balance.text = text(Texts.BALANCE) + ': ' + store.getState().balance
                this.spinButton.active = Object.keys(store.getState().bets).length > 0
                const bets = store.getState().bets
                if (Object.keys(bets).length) {
                    for (const bet in bets) {
                        this.betsVal[bet].text = bets[bet] ? bets[bet] : ""
                    }
                } else {
                    for (const bet in this.betsVal) {
                        this.betsVal[bet].text = ""
                    }
                }
                break
            case States.SPIN:
                this.spinButton.active = false
                for (const bet in gameConf.betNumers) {
                    this.bets[bet].active = false
                }
                this.spinButton.active = false
                break
        }
    }

    public onResize(w, h: number) {
        super.onResize(w, h)
        let x = w / 100 * config.betButton.x
        for (const bet in gameConf.betNumers) {
            this.bets[bet].x = x
            this.bets[bet].y = h / 100 * config.betButton.y

            this.betsVal[bet].x = x + config.betButton.widht / 2
            this.betsVal[bet].y = h / 100 * config.betVal.y

            x += config.betButton.widht + config.betButton.margin
        }
    }
}