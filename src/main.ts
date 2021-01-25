import { GAME } from 'pixil'

const mainScene = GAME.addScene('main', ["sprites/forest.json"])
  .then((scene) => {

    scene.addImg({
      bg: "Log",
      y: 'bottom',
      w: '100%',
    })

    // mainScene.addImg({
    //   texture: "Carved_Shape",
    //   x: '40%',
    //   y: 'bottom',
    //   w: 300,
    //   h: 250,
    // })

    // mainScene.addImg({
    //   texture: "Carved_Shape",
    //   x: '55%',
    //   y: 'bottom',
    //   w: 300,
    //   h: 250,
    // })

    // mainScene.addImg({
    //   texture: "Carved_Shape",
    //   x: '70%',
    //   y: 'bottom',
    //   w: 300,
    //   h: 250,
    // })
  })