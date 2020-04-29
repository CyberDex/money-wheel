import { View } from 'pixil'
import { Graphics, Text } from 'pixi.js'
import * as gameConf from '../config/game.json'

export class Wheel extends View {
    private background: Graphics
    private wheelNumbers: (number | string)[]

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

        this.wheelNumbers = gameConf.wheel

        // console.log(this.wheelNumbers);

        const sectorSize = 360 / this.wheelNumbers.length
        let angle = 0

        this.wheelNumbers.forEach(num => {
            this.addChild(this.number(num, angle))
            angle += sectorSize
        })
    }

    private number(num: number | string, angle: number, color = 0x000000): PIXI.Sprite {
        const text = new Text(String(num), {
            fontFamily: "Arial",
            fontSize: 24,
            fill: color
        })
        text.rotation = this.degToRad(angle)
        text.anchor.set(0.5)
        angle = this.degToRad(angle - 90)

        text.position.set(this.radius * .95 * Math.cos(angle), this.radius * .95 * Math.sin(angle))
        return text
    }

    private degToRad(deg: number): number {
        return (deg * Math.PI) / 180
    }
}