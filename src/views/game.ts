import { View, Animation, App } from 'pixil'
import { store } from 'redux/store'
import { States } from 'helpers/enums/States'
import { revealResult } from 'redux/actions'
import gameConf from "config/game"
import { Wheel } from 'components/Wheel'
import config from 'config/views/gameView'

export class Game extends View {
	public wheel: Wheel
	private readonly animation: Animation

	public constructor(private readonly app: App) {
		super()

		this.wheel = new Wheel(config.wheel.bg)
		this.wheel.anchor.set(.5)
		this.addChild(this.wheel)

		this.animation = new Animation(
			this.wheel,
			{
				delay: gameConf.spinTime,
				animate: {
					rotation: 1
				}
			}
		)
		this.app.layout.update()
		store.subscribe(() => this.stateChange())
	}

	public onResize(w, h: number) {
		super.onResize(w, h)
		this.wheel.x = w / 100 * config.wheel.positionX
		h > this.wheel.height
			? this.wheel.y = h / 100 * config.wheel.positionY
			: this.wheel.y = this.wheel.height / 2
	}

	private stateChange() {
		switch (store.getState().state) {
			case States.SPIN:
				this.animation.play()
				break
			case States.RESULT_LOADED:
				setTimeout(() => {
					this.animation.stop()

					const angle = this.radToDeg(this.wheel.rotation)
					const sectorSize = 360 / gameConf.wheel.length
					const wheelField = store.getState().wheelField

					// TODO: stop the wheel slowly on this angle
					this.wheel.rotation = this.degToRad(-wheelField * sectorSize)

					store.dispatch(revealResult())
				}, gameConf.spinTime * 1000)
				break
		}
	}

	private degToRad(deg: number): number {
		return (deg * Math.PI) / 180
	}

	private radToDeg(rad: number): number {
		return rad * 180 * Math.PI
	}
}
