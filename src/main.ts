import { Game } from 'pixil'
import { Button, View } from 'pixil'

new class App extends View {
  public constructor() {
    super()

    const game = Game.getInstance({ antialias: true })
    game.views.add('game', this)

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
