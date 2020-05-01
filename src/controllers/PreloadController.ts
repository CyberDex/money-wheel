import { App } from 'pixil'

export class PreloadController {
    constructor(private application: App) { }

    public loadConfig(config: string): Promise<{}> {
        return new Promise((resolve, reject) => {
            fetch(config)
                .then(response => response.json())
                .then(json => resolve(json))
                .catch(error => reject(error))
        })
    }

    public async loadAsset(url) {
        this.application.loader.add(url)
        await this.application.loader.load()
    }
}