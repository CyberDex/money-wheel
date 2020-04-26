import { Container, Sprite, Text, TextStyle, Graphics } from 'pixi.js'

export class View extends Container {
    private readonly bg: Sprite

    constructor(
        private bgImage?: string,
        private content?: {
            [key: string]: View
        }
    ) {
        super()
        if (bgImage) {
            this.bg = Sprite.fromImage(bgImage)
            this.addChild(this.bg)
        }
        if (content) {
            for (const child in content) {
                this.addChild(content[child])
            }
        }
    }

    public addText(text: string, style) {
        const textEl = new Text(text, style)
        textEl.anchor.set(.5)
        this.addChild(textEl)
        return textEl
    }

    public addRect(
        x: number = 0,
        y: number = 0,
        width: number = 200,
        height: number = 40,
        color: number = 0xDE3249,
        round: number = 0
    ) {
        const rect = new Graphics()
        rect.beginFill(color)
        rect.drawRoundedRect(x, y, width, height, round)
        rect.endFill()
        return rect
    }

    public addCircle(
        x: number = 0,
        y: number = 0,
        radius: number = 40,
        color: number = 0xDE3249
    ) {
        const circle = new Graphics()
        circle.lineStyle(0)
        circle.beginFill(color, 1)
        circle.drawCircle(x, y, radius)
        circle.endFill()
        return circle
    }

    public resize(w, h: number) {
        this.x = w * .5
        this.y = h * .5
    }
}