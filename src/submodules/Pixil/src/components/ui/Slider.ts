import { View } from '../View'
import { Graphics } from 'pixi.js'

export class Slider extends View {
    public value = 0
    private background: Graphics
    private slider: Graphics
    private sliderData: any
    private sliderDragging: boolean = false
    private cb: { (data: number): void }[] = []

    constructor(
        private w: number = 200,
        private h: number = 30,
        private min: number = 0,
        private max: number = 100,
        private bgColor: number = 0xffffff,
        private fgColor: number = 0xDE3249
    ) {
        super()
        this.width = w
        this.height = h
        this.value = min
        const radius = h / 2
        this.background = this.addRect(-h / 2, 0, w + h, h, bgColor, radius)
        this.addChild(this.background)

        this.slider = this.addCircle(0, radius, radius + 5, fgColor)
        this.addChild(this.slider)
        this.slider.interactive = true
        this.slider.buttonMode = true
        this.slider
            .on('pointerdown', event => this.onDragStart(event))
            .on('pointerup', event => this.onDragEnd())
            .on('pointerupoutside', event => this.onDragEnd())
            .on('pointermove', event => this.onDragMove())
    }

    public onDragStart(event) {
        this.slider.scale.set(0.95)
        this.sliderData = event.data
        this.sliderDragging = true
    }

    public onDragEnd() {
        this.sliderDragging = false
        this.sliderData = null
        this.slider.scale.set(1)
    }

    public onDragMove() {
        if (this.sliderDragging) {
            const newPosition = this.sliderData.getLocalPosition(this)
            this.slider.x =
                newPosition.x > this.w
                    ? this.w
                    : newPosition.x < 0
                        ? 0
                        : newPosition.x
            this.value = Math.round(this.min + (this.max - this.min) / 100 * Math.round(this.slider.x * 100 / this.w))
            this.cb.forEach(cb => cb(this.value))
        }
    }

    public onChange(cb: { (data: number): void }): number {
        this.cb.push(cb)
        return this.cb.length
    }

    public offChange(cbID: number) {
        delete this.cb[cbID]
    }
}