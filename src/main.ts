import { Game, Scene } from 'pixil'

new class App extends Scene {
  public constructor() {
    super()

    const game = Game.getInstance()
    game.views.add('game', this)

    this.addButton({
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
      onClick: async () => {
        await game.loadAssets(["sprites/forest.json"])

        this.addImg({
          positionX: 10,
          positionY: 3,
          texture: "Pause_Button",
        })
      }
    })
  }
}
