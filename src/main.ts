import { Game, Scene } from 'pixil'

new class App extends Scene {

  public constructor() {
    super()
    this.initGame()
  }

  private async initGame() {
    const game = Game.getInstance()
    game.views.add('game', this)
    await game.loadAssets(["sprites/forest.json"])
    this.initScene()
  }

  private initScene() {
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
        const img = this.addImg({
          positionX: 10,
          positionY: 3,
          width: 100,
          height: 100,
          texture: "Pause_Button",
        })

        console.log(img);

      }
    })
  }
}
