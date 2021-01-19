import { View, Button, Label, App, IButton } from 'pixil'
import { store } from '../redux/store'
import { startSpin } from 'redux/actions'

export class UIView extends View {
    private spinButton: Button

    constructor() {
        super()

        this.spinButton = new Button({
            text: 'spin',
            positionX: 50,
            positionY: 50,
            width: 150,
            height: 60,
            radius: 30,
            style: {
                fontFamily: "Arial",
                fontSize: 24,
                fontWeight: "bold",
                fill: "#ffffff",
            },
            onClick: () => store.dispatch(startSpin()),
        })

        this.addChild(this.spinButton)
    }
}