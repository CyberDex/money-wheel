import * as defaultGameConf from 'config/game.json'
import { IGameConfig } from 'helpers/interfaces/IGameConfig'

export class GameConfig {
    private static instance: GameConfig
    public static inst(gameConf: IGameConfig = defaultGameConf as IGameConfig): GameConfig {
        if (!GameConfig.instance) {
            GameConfig.instance = new GameConfig(gameConf)
        }
        return GameConfig.instance
    }

    private constructor(public config: IGameConfig) { }
}