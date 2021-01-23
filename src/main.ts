import { GAME } from 'pixil'

const mainScene = GAME.addScene('main')
initGame()

async function initGame() {
  await mainScene.loadAssets(["sprites/forest.json"])

  mainScene.addImg({
    texture: "Log",
    // x: 'center',
    // y: 'center',
    w: '100%',
  })
}