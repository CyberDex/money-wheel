import { App } from 'pixil'
import { Scenes } from 'helpers/enums/Scenes'
import { Splash } from 'views/Splash'
import { UI } from 'views/UI'
import { Game } from 'views/Game'
import { GameOver } from 'views/GameOver'
import { store } from 'redux/store'
import { States } from 'helpers/enums/States'
import { PreloadController } from './controllers/PreloadController'
import { Local } from './controllers/Local'

new class MoneyWheel extends App {
	public preloader: PreloadController

	public constructor() {
		super({ antialias: true })
		document.body.appendChild(this.view)

		const queryString = window.location.search
		const urlParams = new URLSearchParams(queryString)
		this.preloader = new PreloadController(this)
		const lang = urlParams.get('lang') || 'en'
		this.loadLang(lang)
			.catch(() => this.loadLang('en'))
	}

	private loadLang(lang): Promise<void | JSON> {
		return this.preloader.loadConfig(`config/local/${lang}.json`)
			.then(lang => {
				Local.inst(lang)
				this.init()
			})
	}

	private init() {
		this.scenes.add(Scenes.SPLASH, new Splash())
		this.scenes.add(Scenes.GAME, new Game(this))
		this.scenes.add(Scenes.UI, new UI())
		this.scenes.add(Scenes.GAME_OVER, new GameOver())
		this.layout.update()
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
