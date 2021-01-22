import { GAME, Scene } from 'pixil'

const mainScene = new Scene()
GAME.views.add('main', mainScene)
initGame()

async function initGame() {
  await GAME.loadAssets(["sprites/forest.json"])

  mainScene.addImg({
    texture: "Log",
  })
}