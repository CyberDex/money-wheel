import { View } from 'pixil'
import { Graphics, Text } from 'pixi.js'
import { wheelGenerator } from 'helpers/wheelGenerator'
import * as gameConf from '../config/game.json'

export class Wheel extends View {
    private background: Graphics
    private center: Graphics
    private wheelNumbers: number[]
    private curRadius: number
    private size = {
        w: 0,
        h: 0
    }

    constructor(
        public positionX: number = 50,
        public positionY: number = 50,
        private radius: number = 50,
        private bgColor: number = 0xffffff,
        private fgColor: number = 0xDE3249
    ) {
        super(positionX, positionY)

        this.background = this.addCircle(0, 0, radius, bgColor)
        this.addChild(this.background)

        this.center = this.addCircle(0, 0, radius * 0.05, fgColor)
        this.addChild(this.center)

        this.wheelNumbers = wheelGenerator(gameConf.bets, gameConf.multipliers)

        const sectorSize = 360 / this.wheelNumbers.length
        let angle = 0

        this.wheelNumbers.forEach(num => {
            this.addChild(this.number(num, angle))
            angle += sectorSize
        })
    }

    private number(num: number, angle: number, color = 0x000000): PIXI.Sprite {
        const text = new Text(String(num), {
            fontFamily: "Arial",
            fontSize: 24,
            fill: color
        })
        text.rotation = this.degToRad(angle)
        text.anchor.set(0.5)
        angle = this.degToRad(angle - 90)

        const radius = this.background.width * 2.35

        text.position.set(radius * Math.cos(angle), radius * Math.sin(angle))
        return text
    }

    private degToRad(deg: number): number {
        return (deg * Math.PI) / 180
    }

    onResize(w, h: number) {
        this.size.w = w
        this.size.h = h
        super.onResize(w, h)
        this.curRadius = (w < h ? w : h) / 100 * this.radius
        this.background.width = this.curRadius
        this.background.height = this.curRadius
    }
}