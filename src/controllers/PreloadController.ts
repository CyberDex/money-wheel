import { App } from 'pixil'

export class PreloadController {
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
            this.app.loader.add(url)
            this.app.loader.load(() => resolve())
        })
    }
}