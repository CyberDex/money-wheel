import * as defaultGameConf from 'config/game.json'

export class GameConfig {
    private static instance: GameConfig
    public static inst(gameConf: {} = defaultGameConf): GameConfig {
        if (!GameConfig.instance) {
            GameConfig.instance = new GameConfig(gameConf)
        }
        return GameConfig.instance
    }

    private constructor(public config) { }
}