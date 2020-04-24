

if (new URLSearchParams(window.location.search).get('debug')) {
    import('pixi.js').then(PIXI => window['PIXI'] = PIXI)
}