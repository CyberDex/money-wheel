import { App } from 'pixil'
import { UI } from 'views/ui'
import { Game } from 'views/game'
import { store } from 'redux/store'
import { States } from 'helpers/enums/States'
import { loadAsset } from 'helpers/preload'

new class MoneyWheel extends App {
	public constructor() {
		super({ antialias: true })
		this.init()
	}

	private async init() {
		await this.loadAssets(["sprites/sprites.json"])
		this.createLayouts()
		document.body.appendChild(this.view)
		// store.subscribe(() => this.updateLayouts())
	}

	private async loadAssets(assets: string[]) {
		for (const asset of assets) {
			await loadAsset(asset)
		}
	}

	private createLayouts() {
		this.views.add('game', new Game(this))
		this.views.add('ui', new UI(this))
		this.views.showOnly(['game', 'ui'])
	}

	// private updateLayouts() {
	// 	switch (store.getState().state) {
	// 		case States.INIT:
	// 			this.views.showOnly(Scenes.SPLASH)
	// 			break
	// 		case States.BETTING:
	// 			this.views.showOnly([Scenes.UI, Scenes.GAME])
	// 			break
	// 		case States.GAME_OVER:
	// 			this.views.showOnly(Scenes.GAME_OVER)
	// 			break
	// 	}
	// }
}
