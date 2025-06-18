import _ from 'lodash'

export const countGC = (sequence) => {
    const gcNumber = _.countBy(sequence.split(''), s => {
        return s === 'G' || s === 'C'
    }).true

    if (Number.isNaN(gcNumber) || typeof gcNumber === 'undefined') {
        return 0
    }

    return gcNumber / sequence.length
}

export const countGCSkew = (stringTxt) => {
    let gNumber = _.countBy(stringTxt.split(''), s => {
        return s === 'G'
    }).true
    let cNumber = _.countBy(stringTxt.split(''), s => {
        return s === 'C'
    }).true

    if (Number.isNaN(gNumber) || typeof gNumber === 'undefined') {
        gNumber = 0
    }

    if (Number.isNaN(cNumber) || typeof cNumber === 'undefined') {
        cNumber = 0
    }

    if (gNumber + cNumber === 0) return 0

    return (gNumber - cNumber) / (gNumber + cNumber)
}

export const analyzeGCSkew = (fastaSequence, windowSize) => {
    const contentArr = []
    const skewPlusArr = []
    const skewMinusArr = []

    let plusGroup = { start: undefined, mid: [], end: undefined }
    let minusGroup = { start: undefined, mid: [], end: undefined }
    let isPlus = false

    let x = 0

    while (x + windowSize < fastaSequence.length) {
        const segment = fastaSequence.slice(x, x + windowSize)
        const endPoint = x + windowSize - 1
        const middlePoint = (x + endPoint) / 2

        const contentValue = countGC(segment)
        const skewValue = countGCSkew(segment)

        contentArr.push([middlePoint, contentValue])

        if (x === 0) {
            plusGroup.start = x
            minusGroup.start = x
            isPlus = skewValue >= 0
        }

        if (skewValue >= 0) {
            if (!isPlus) {
                // Minus => Plus
                minusGroup.end = x - 1
                skewMinusArr.push(minusGroup)
                minusGroup = {
                    start: x,
                    mid: [[middlePoint, 0]],
                    end: undefined,
                }

                plusGroup.end = x - 1
                skewPlusArr.push(plusGroup)
                plusGroup = {
                    start: x,
                    mid: [[middlePoint, skewValue]],
                    end: undefined,
                }
                isPlus = true
            } else {
                // Plus => Plus
                minusGroup.mid.push([middlePoint, 0])
                plusGroup.mid.push([middlePoint, skewValue])
            }
        } else {
            if (isPlus) {
                // Plus => Minus
                plusGroup.end = x - 1
                skewPlusArr.push(plusGroup)
                plusGroup = {
                    start: x,
                    mid: [[middlePoint, 0]],
                    end: undefined,
                }

                minusGroup.end = x - 1
                skewMinusArr.push(minusGroup)
                minusGroup = {
                    start: x,
                    mid: [[middlePoint, skewValue]],
                    end: undefined,
                }
                isPlus = false
            } else {
                // Minus => Minus
                plusGroup.mid.push([middlePoint, 0])
                minusGroup.mid.push([middlePoint, skewValue])
            }
        }

        x += windowSize
    }

    // Finalize last groups
    plusGroup.end = x - 1
    skewPlusArr.push(plusGroup)
    minusGroup.end = x - 1
    skewMinusArr.push(minusGroup)

    return {
        gcContent: contentArr,
        skewPlus: skewPlusArr,
        skewMinus: skewMinusArr,
    }
}
