import { Button, View } from 'pixil'
export class GameView extends View {
	public constructor() {
		super()

		this.addImg({
			texture: "sprites/sprites.png",
			positionX: 50,
			positionY: 50
		})

		this.addChild(
			new Button({
				text: 'spin',
				positionX: 50,
				positionY: 50,
				color: 0xde3249,
				width: 150,
				height: 60,
				round: 30,
				style: {
					fontFamily: "Arial",
					fontSize: 24,
					fontWeight: "bold",
					fill: "#ffffff",
				},
			})
		)
	}

	private async loadAssets() {
		await GAME.loadAssets(["sprites/sprites.json"])
	}
}
