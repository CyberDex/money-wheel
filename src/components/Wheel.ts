import { Sprite, Texture } from 'pixi.js'

export class Wheel extends Sprite {
    constructor(conf: string) {
        super(Texture.fromImage(conf))
    }
}