import { App } from 'pixil'

export class Preload {
    public loader = new PIXI.loaders.Loader();
    constructor(private app: App) { }

    public loadConfig(config: string): Promise<{}> {
        return new Promise((resolve, reject) => {
            fetch(config)
                .then(response => response.json())
                .then(json => resolve(json))
                .catch(error => reject(error))
        })
    }

    public async loadAsset(url): Promise<any> {
        return new Promise(async resolve => {
            this.loader.add(url)
            this.loader.load(() => resolve())
        })
    }
}