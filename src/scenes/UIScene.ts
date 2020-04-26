import { View, Button } from 'pixil'
import { Text } from 'pixi.js'
import { store } from '../redux/store'
import * as lang from '../config/local/en.json'
import * as styles from '../config/styles.json'
import * as config from '../config/SplashScene.json'
import * as betNumers from '../config/bets.json'
import { Texts } from 'helpers/enums/Texts'
import { placeBet, startSpin } from 'redux/actions'
import { States } from 'helpers/enums/States'

export class UIScene extends View {
    private balance: Text
    private bets: { [bet: string]: Button } = {}
    private spinButton: Button

    constructor() {
        super()
        this.balance = this.addText("0", styles.subTitle)

        for (const bet in betNumers) {
            this.bets[bet] = this.addButton(
                lang[Texts.BET_BUTTON] + ' ' + bet,
                config.button,
                styles.button,
                () => store.dispatch(placeBet(bet, 1))
            )
        }

        this.spinButton = new Button(
            config.button.widht,
            config.button.height,
            lang[Texts.SPIN_BUTTON],
            styles.button,
            Number(config.button.color),
            config.button.radius
        )
        this.addChild(this.spinButton)
        this.spinButton.onClick(() => store.dispatch(startSpin()))

        store.subscribe(() => this.stateChange())
    }

    private addButton(text: string, conf = config.button, styles, onClick) {
        const button = new Button(
            conf.widht,
            conf.height,
            text,
            styles,
            Number(conf.color),
            conf.radius
        )
        this.addChild(button)
        button.onClick(() => onClick())
        return button
    }

    private stateChange() {
        switch (store.getState().state) {
            case States.BETTING:
                for (const bet in betNumers) {
                    this.bets[bet].active = store.getState().balance > 0
                }
                this.balance.text = store.getState().balance
                break
        }
    }

    public resize(w, h: number) {
        this.balance.x = w * .5
        this.balance.y = h * .4

        const betsCount = Object.keys(betNumers).length - 1
        const margin = 10
        const betsPanelWidth = betsCount * config.button.widht + betsCount * margin
        let x = (w - betsPanelWidth) / 2
        for (const bet in betNumers) {
            this.bets[bet].y = h * .5
            this.bets[bet].x = x
            x += config.button.widht + margin
        }

        this.spinButton.x = w / 2
        this.spinButton.y = h * .7
    }
}