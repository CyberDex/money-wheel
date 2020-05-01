import { App } from 'pixil'
import { Scenes } from 'helpers/enums/Scenes'
import { Splash } from 'views/Splash'
import { UI } from 'views/UI'
import { Game } from 'views/Game'
import { GameOver } from 'views/GameOver'
import { store } from 'redux/store'
import { States } from 'helpers/enums/States'

new class MoneyWheel extends App {
	public constructor() {
		super({ antialias: true })
		document.body.appendChild(this.view)

		this.scenes.add(Scenes.SPLASH, new Splash())
		this.scenes.add(Scenes.GAME, new Game(this))
		this.scenes.add(Scenes.UI, new UI())
		this.scenes.add(Scenes.GAME_OVER, new GameOver())

		store.subscribe(() => this.switchScene())
	}

	private switchScene() {
		switch (store.getState().state) {
			case States.INIT:
				this.scenes.showOnly(Scenes.SPLASH)
				break
			case States.BETTING:
				this.scenes.showOnly([Scenes.UI, Scenes.GAME])
				break
			case States.GAME_OVER:
				this.scenes.showOnly(Scenes.GAME_OVER)
				break
		}
	}
}
