import { Game, Scene } from 'pixil'

new class App extends Scene {

  public constructor() {
    super()
  }

  async init() {
    const game = Game.getInstance()
    game.views.add('game', this)
    await game.loadAssets(["sprites/forest.json"])
    this.initScene()
  }

  private initScene() {
    this.addImg({
      texture: "Log",
    })
  }
}
