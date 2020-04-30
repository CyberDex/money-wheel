import { App } from 'pixil'
import { Scenes } from 'helpers/enums/Scenes'
import { SplashScene } from 'scenes/SplashScene'
import { UIScene } from 'scenes/UIScene'
import { GameScene } from 'scenes/GameScene'
import { GameOverScene } from 'scenes/GameOverScene'
import { store } from 'redux/store'
import { States } from 'helpers/enums/States'

new class Game extends App {
	public constructor() {
		super({ antialias: true })
		document.body.appendChild(this.view)

		this.scenes.add(Scenes.SPLASH, new SplashScene())
		this.scenes.add(Scenes.GAME, new GameScene(this))
		this.scenes.add(Scenes.UI, new UIScene())
		this.scenes.add(Scenes.GAME_OVER, new GameOverScene())

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
