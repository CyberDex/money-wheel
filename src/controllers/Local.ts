import { Texts } from '../helpers/enums/Texts'

export class Local {
    private static instance: Local
    public static inst(lang?: {}): Local {
        if (!Local.instance) {
            Local.instance = new Local(lang)
        }
        return Local.instance
    }

    private constructor(public lang: {}) { }

    public get(string: Texts): string {
        return this.lang[string]
    }
}