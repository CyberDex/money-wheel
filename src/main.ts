import { Application } from 'pixi.js'

new class Game extends Application {
    constructor() {
        super()
        this.init()
    }

    public async init() {
        // await load config
        this.ready()
    }

    private ready() {
        document.body.appendChild(this.view)
        window.addEventListener('resize', () => this.onResize())
        this.onResize()
    }

    private onResize() {
        this.view.width = window.innerWidth
        this.view.height = window.innerHeight
        this.stage.children.forEach((element: any) => element.resize(this.view.width, this.view.height))
    }
}