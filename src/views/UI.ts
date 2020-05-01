import { View, Button, Label, App } from 'pixil'
import { store } from '../redux/store'
import { Texts } from 'helpers/enums/Texts'
import { placeBet, startSpin } from 'redux/actions'
import { States } from 'helpers/enums/States'
import { text } from 'helpers/help'
import { TextStyle } from 'pixi.js'
import * as style from '../config/styles.json'
import * as config from '../config/views/UI.json'
import * as gameConf from '../config/game.json'

export class UI extends View {
    private balance: Label
    private winAmount: Label
    private winNumber: Label
    private bets: { [bet: string]: Button } = {}
    private betsVal: { [bet: string]: Label } = {}
    private spinButton: Button
    private betNumbers = []

    constructor(private readonly app: App) {
        super()
        this.balance = new Label("", style.label as TextStyle, config.balance.x, config.balance.y)
        this.winAmount = new Label("", style.label as TextStyle, config.winAmount.x, config.winAmount.y)
        this.winNumber = new Label("", style.label as TextStyle, config.winNumber.x, config.winNumber.y)
        this.addChild(this.balance)
        this.addChild(this.winAmount)
        this.addChild(this.winNumber)

        this.betNumbers = [...new Set(gameConf.wheel)]
        this.betNumbers.forEach(betNumber => {
            this.bets[betNumber] = this.addButton(
                betNumber,
                config.betButton,
                style.button,
                () => store.dispatch(placeBet(betNumber, 1))
            )
            this.betsVal[betNumber] = new Label("", style.label as TextStyle, 0, 0)
            this.addChild(this.betsVal[betNumber])
        })

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
        const button = new Button({
            ...conf,
            text,
            styles
        })
        this.addChild(button)
        button.onClick(() => onClick())
        return button
    }

    private stateChange() {
        switch (store.getState().state) {
            case States.BETTING:
                this.betNumbers.forEach(betNumber => {
                    this.bets[betNumber].active = store.getState().balance > 0
                })

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
                this.winAmount.text = ""
                this.winNumber.text = ""
                this.spinButton.active = false
                this.betNumbers.forEach(betNumber => {
                    this.bets[betNumber].active = false
                })
                this.spinButton.active = false
                break
            case States.RESULT_REVEAL:
                if (store.getState().winNumber) {
                    const state = store.getState()
                    if (typeof state.winNumber === 'string') {
                        this.winNumber.text = text(Texts.MULTIPLY) + " " + parseInt(state.winNumber) + " !!!"
                        if (store.getState().winAmount) {
                            this.winAmount.text = `${text(Texts.WIN_AMOUNT)}: ${state.winAmount / 2} X 2 = ${state.winAmount}`
                        }
                    } else {
                        this.winNumber.text = text(Texts.WIN_NUMBER) + ': ' + state.winNumber
                        if (store.getState().winAmount) {
                            this.winAmount.text = `${text(Texts.WIN_AMOUNT)}: ${state.bets[state.winNumber]} X ${state.winNumber} = ${state.winAmount}`
                        }
                    }
                }
                break
        }
    }

    public onResize(w, h: number) {
        super.onResize(w, h)
        let x = w / 100 * config.betButton.positionX
        this.betNumbers.forEach(betNumber => {
            this.bets[betNumber].x = x
            this.bets[betNumber].y = h / 100 * config.betButton.positionY

            this.betsVal[betNumber].x = x
            this.betsVal[betNumber].y = h - config.betButton.height * 1.65

            x += config.betButton.width + config.betButton.margin
        })
    }
}