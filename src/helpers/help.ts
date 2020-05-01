import { Texts } from './enums/Texts'
import { Local } from '../controllers/Local';
import { GameConfig } from '../controllers/GameConfig';
import { IGameConfig } from './interfaces/IGameConfig';

export const text = (text: Texts) => Local.inst().get(text)
export const gameConf: IGameConfig = GameConfig.inst().config