export function wheelGenerator(bets: {}, multipliers: {}) {
    const wheel = []

    for (const num in bets) {
        for (let i = 0; i < bets[num]; i++) {
            wheel.push(num)
        }
    }

    for (const num in multipliers) {
        for (let i = 0; i < multipliers[num]; i++) {
            wheel.push(num)
        }
    }

    return wheel
}