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
import { GameConfig } from 'controllers/GameConfig'
import * as preloadConf from 'config/preload.json'
import { IGameConfig } from './helpers/interfaces/IGameConfig';

new class MoneyWheel extends App {
	public preloader: PreloadController

	public constructor() {
		super({ antialias: true })
		document.body.appendChild(this.view)
		this.init()
	}

	private async init() {
		// this.scenes.add(Scenes.PRELOAD, new Preload(this))

		await Promise.all([
			this.initLocal(),
			this.initGameConfig(),
			this.loadAssets()
		])
		this.createLayouts()

		store.subscribe(() => this.updateLayouts())
	}

	private async initGameConfig() {
		await this.preloader.loadConfig(preloadConf.gameConfig)
			.then(gameConf => GameConfig.inst(gameConf as IGameConfig))
			.catch(() => console.warn("Game config is missing"))
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
		return this.preloader.loadConfig(`${preloadConf.local}/${lang}.json`)
			.then(lang => {
				Local.inst(lang)
			})
	}

	private async loadAssets() {
		preloadConf.assets.forEach(async asset => {
			await this.preloader.loadAsset(asset)
		})
	}

	private createLayouts() {
		this.views.add(Scenes.SPLASH, new Splash(this))
		this.views.add(Scenes.GAME, new Game(this))
		this.views.add(Scenes.UI, new UI(this))
		this.views.add(Scenes.GAME_OVER, new GameOver(this))
	}

	private updateLayouts() {
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
