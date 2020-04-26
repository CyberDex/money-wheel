import * as lang from '../config/local/en.json'
import { Texts } from './enums/Texts'

export const text = (text: Texts) => lang[text]