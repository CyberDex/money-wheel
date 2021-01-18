import { StringsObject } from "helpers/types";

export async function loadConfig(config: string): Promise<StringsObject> {
    const response = await fetch(config)
    return response.json()
}

export function loadAsset(url): Promise<void> {
    const loader = new PIXI.loaders.Loader()
    return new Promise(resolve => {
        loader
            .add(url)
            .load(resolve)
    })
}