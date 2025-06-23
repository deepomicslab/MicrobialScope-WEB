export const moveTo = (x, y) => `M ${x},${y}`
export const lineTo = (x, y) => `L ${x},${y}`
export const arcTo = (r, largeArc, sweep, x, y) => `A ${r},${r} 0 ${largeArc} ${sweep} ${x},${y}`
