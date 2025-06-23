export const getDensityPoints = (proteins, windowSize, genomeEnd) => {
    const sorted = [...proteins].sort((a, b) => a.start - b.start)

    const points = []
    let currentIndex = 0

    for (let windowStart = 0; windowStart < genomeEnd; windowStart += windowSize) {
        const windowEnd = windowStart + windowSize
        let count = 0

        while (currentIndex < sorted.length && sorted[currentIndex].end <= windowStart) {
            currentIndex++
        }

        let tempIndex = currentIndex
        while (
            tempIndex < sorted.length &&
            sorted[tempIndex].start < windowEnd
            ) {
            count++
            tempIndex++
        }

        points.push([windowStart, count])
        points.push([windowEnd, count])
    }

    return points
}


