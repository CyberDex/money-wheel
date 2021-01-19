import { View, Animation, App, Sprite } from 'pixil'
import { store } from 'redux/store'
import { States } from 'helpers/enums/States'
import { revealResult } from 'redux/actions'
import gameConf from "config/game"

export class GameView extends View {
	public wheel: Sprite
	private readonly animation: Animation

	public constructor() {
		super()

		this.wheel = new Sprite("sprites/sprites.png")
		this.wheel.anchor.set(.5)
		this.addChild(this.wheel)

		this.animation = new Animation(
			this.wheel,
			{
				delay: 1000,
				animate: {
					rotation: 1
				}
			}
		)
		store.subscribe(() => this.stateChange())
	}

	public onResize(w, h: number) {
		super.onResize(w, h)
		this.wheel.x = w / 2
		h > this.wheel.height
			? this.wheel.y = h / 2
			: this.wheel.y = this.wheel.height / 2
	}

	private stateChange() {
		switch (store.getState().state) {
			case States.SPIN:
				this.animation.play()
				break
			case States.BETTING:
				setTimeout(() => {
					this.animation.stop()

					const sectorSize = 360 / gameConf.wheel.length

					// TODO: stop the wheel slowly on this angle
					this.wheel.rotation = this.degToRad(-Math.random() * sectorSize)

					store.dispatch(revealResult())
				}, Math.random() * 1000)
				break
		}
	}

	private degToRad(deg: number): number {
		return (deg * Math.PI) / 180
	}
}
