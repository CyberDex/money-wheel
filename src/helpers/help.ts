import { Texts } from './enums/Texts'
import { Local } from '../controllers/Local';

export const text = (text: Texts) => Local.inst().get(text)