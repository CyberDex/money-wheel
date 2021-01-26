import { GAME } from 'pixil'

(async () => {
  const mainScene = GAME.addScene('main')
  await mainScene.preload(["sprites/forest.json"])

  const btmPanel = mainScene.addImg({
    bg: "Log",
    x: 'center',
    y: 'bottom',
    // h: '30%',
    w: '100%',
    // maxW: 800,
    maxH: 150,
  })

  const hole1 = btmPanel.addImg({
    bg: "Carved_Shape",
    x: -300,
    y: -335,
  })

  const hole2 = btmPanel.addImg({
    bg: "Carved_Shape",
    x: 150,
    y: -335,
  })

  const hole3 = btmPanel.addImg({
    bg: "Carved_Shape",
    x: 600,
    y: -335,
  })
})()