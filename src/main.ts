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
		this.init()
	}

	private async init() {
		// this.scenes.add(Scenes.PRELOAD, new Preload(this))

		await this.initLocal()
		await this.loadAssets()

		this.views.add(Scenes.SPLASH, new Splash(this))
		this.views.add(Scenes.GAME, new Game(this))
		this.views.add(Scenes.UI, new UI(this))
		this.views.add(Scenes.GAME_OVER, new GameOver(this))

		this.layout.update()

		store.subscribe(() => this.switchScene())
	}

	private async initLocal() {
		const queryString = window.location.search
		const urlParams = new URLSearchParams(queryString)
		this.preloader = new PreloadController(this)
		const lang = urlParams.get('lang') || 'en'
		await this.loadLang(lang)
			.catch(async () => await this.loadLang('en'))
	}

	private loadLang(lang): Promise<void | JSON> {
		return this.preloader.loadConfig(`config/local/${lang}.json`)
			.then(lang => {
				Local.inst(lang)
			})
	}

	private async loadAssets() {

	}

	private switchScene() {
		switch (store.getState().state) {
			case States.INIT:
				this.views.showOnly(Scenes.SPLASH)
				break
			case States.BETTING:
				this.views.showOnly([Scenes.UI, Scenes.GAME])
				break
			case States.GAME_OVER:
				this.views.showOnly(Scenes.GAME_OVER)
				break
		}
	}
}
