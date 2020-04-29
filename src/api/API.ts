
import * as gameConf from '../config/game.json'

export const API = new class API {
    private async postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return response.json()
    }

    public async getResult(): Promise<IResult> {
        const responce = await this.postData('https://api.random.org/json-rpc/2/invoke', {
            "jsonrpc": "2.0",
            "method": "generateIntegers",
            "params": {
                "apiKey": "2bf06986-9294-493e-8bc8-bace9a2e16c2",
                "n": 1,
                "min": 0,
                "max": gameConf.wheel.length - 1,
                "replacement": true,
                "base": 10
            },
            "id": 21012
        })
        const wheelField = responce.result.random.data[0]
        const winNumber = gameConf.wheel[wheelField]

        // console.log(`wheel[${wheelField}] = ${winNumber}`, wheel)
        return {
            wheelField,
            winNumber
        }
    }
}

export interface IResult {
    wheelField: number,
    winNumber: number | string
} 