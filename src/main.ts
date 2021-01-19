import { App } from 'pixil'
import { UIView } from 'views/UIView'
import { GameView } from 'views/GameView'

new class Game extends App {
	public constructor() {
		super({ antialias: true })

		this.loadAssets(["sprites/sprites.json"])

		this.views.add('game', new GameView())
		this.views.add('ui', new UIView())
		this.views.showOnly(['game', 'ui'])
		this.layout.update()
	}
}
