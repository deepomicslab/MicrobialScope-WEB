import _ from 'lodash'
import { getPointPosition } from "@/components/Visualization/vizD3/utils/cicularPathUtils"

const COGDict = {
    J: { color: '#d4e4bc', abbr: 'J', name: 'Translation, ribosomal structure and biogenesis' },
    A: { color: '#96acb7', abbr: 'A', name: 'RNA processing and modification' },
    K: { color: '#36558f', abbr: 'K', name: 'Transcription' },
    L: { color: '#40376e ', abbr: 'L', name: 'Replication, recombination and repair' },
    B: { color: '#48233c', abbr: 'B', name: 'Chromatin structure and dynamics' },
    D: { color: '#bcf4de', abbr: 'D', name: 'Cell cycle control, cell division, chromosome partitioning' },
    Y: { color: '#cde5d7', abbr: 'Y', name: 'Nuclear structure' },
    V: { color: '#ded6d1', abbr: 'V', name: 'Defense mechanisms' },
    T: { color: '#eec6ca', abbr: 'T', name: 'Signal transduction mechanisms' },
    M: { color: '#ffb7c3', abbr: 'M', name: 'Cell wall/membrane/envelope biogenesis' },
    N: { color: '#d1d5de', abbr: 'N', name: 'Cell motility' },
    Z: { color: '#b7b6c2', abbr: 'Z', name: 'Cytoskeleton' },
    W: { color: '#837569', abbr: 'W', name: 'Extracellular structures' },
    U: { color: '#657153', abbr: 'U', name: 'Intracellular trafficking, secretion, and vesicular transport' },
    O: { color: '#8aaa79', abbr: 'O', name: 'Posttranslational modification, protein turnover, chaperones' },
    X: { color: '#272727 ', abbr: 'X', name: 'Mobilome: prophages, transposons' },
    C: { color: '#fed766', abbr: 'C', name: 'Energy production and conversion' },
    G: { color: '#009fb7', abbr: 'G', name: 'Carbohydrate transport and metabolism' },
    E: { color: '#696773', abbr: 'E', name: 'Amino acid transport and metabolism' },
    F: { color: '#eff1f3', abbr: 'F', name: 'Nucleotide transport and metabolism' },
    H: { color: '#381d2a', abbr: 'H', name: 'Coenzyme transport and metabolism' },
    I: { color: '#3e6990', abbr: 'I', name: 'Lipid transport and metabolism' },
    P: { color: '#aabd8c', abbr: 'P', name: 'Inorganic ion transport and metabolism' },
    Q: { color: '#e9e3b4', abbr: 'Q', name: 'Secondary metabolites biosynthesis, transport and catabolism' },
    R: { color: '#f39b6d', abbr: 'R', name: 'General function prediction only' },
    S: { color: '#68534d', abbr: 'S', name: 'Function unknown' },
}

export const extractProteinsArrowData = (
    proteins
) => {
    return proteins.map(
        p => ({
            id: p.id,
            name: p['protein_id'],
            start: p.start,
            end: p.end,
            strand: p['strand'],
            cog: p['cog_category'],
            product: p['product'],
            color: p['cog_category'].length !== 1 ? '#FFFFFF' : COGDict[p['cog_category']].color,
        })
    )
}

const moveTo = (x, y) => `M ${x},${y}`
const lineTo = (x, y) => `L ${x},${y}`
const arcTo = (r, largeArc, sweep, x, y) => `A ${r},${r} 0 ${largeArc} ${sweep} ${x},${y}`

export const buildProteinArrowPath = (
    protein,
    cx,
    cy,
    radius,
    radicalScale,
    arrowWidth,
    minDiffRad = 1.5 * (Math.PI / 180)
) => {
    const startAngle = radicalScale(protein.startViz)
    const endAngle = radicalScale(protein.endViz)

    const start = getPointPosition(cx, cy, startAngle, radius)
    const end = getPointPosition(cx, cy, endAngle, radius)

    const startOuter = getPointPosition(cx, cy, startAngle, radius + arrowWidth / 2)
    const startInner = getPointPosition(cx, cy, startAngle, radius - arrowWidth / 2)

    const endOuter = getPointPosition(cx, cy, endAngle, radius + arrowWidth / 2)
    const endInner = getPointPosition(cx, cy, endAngle, radius - arrowWidth / 2)

    let head, arrowOuter, arrowInner, tailOuter, tailInner

    const arrowRad = (endAngle - startAngle < minDiffRad) ? (
        endAngle - startAngle
    ) : (
        minDiffRad
    )

    if (protein.strand === 1) {
        head = start
        arrowOuter = getPointPosition(cx, cy, startAngle + arrowRad, radius + arrowWidth / 2)
        arrowInner = getPointPosition(cx, cy, startAngle + arrowRad, radius - arrowWidth / 2)
        tailOuter = endOuter
        tailInner = endInner
    } else {
        head = end
        arrowOuter = getPointPosition(cx, cy, endAngle - arrowRad, radius + arrowWidth / 2)
        arrowInner = getPointPosition(cx, cy, endAngle - arrowRad, radius - arrowWidth / 2)
        tailOuter = startOuter
        tailInner = startInner
    }

    const outerArcR = radius + arrowWidth / 2
    const innerArcR = radius - arrowWidth / 2

    return protein.strand === 1 ? (
        [
            moveTo(head[0], head[1]),
            lineTo(arrowOuter[0], arrowOuter[1]),
            arcTo(
                outerArcR,
                0,
                1,
                tailOuter[0],
                tailOuter[1]
            ),
            lineTo(tailInner[0], tailInner[1]),
            arcTo(
                innerArcR,
                0,
                0,
                arrowInner[0],
                arrowInner[1]
            ),
            'Z'
        ].join(' ')
    ) : (
        [
            moveTo(head[0], head[1]),
            lineTo(arrowOuter[0], arrowOuter[1]),
            arcTo(
                outerArcR,
                0,
                0,
                tailOuter[0],
                tailOuter[1]
            ),
            lineTo(tailInner[0], tailInner[1]),
            arcTo(
                innerArcR,
                0,
                1,
                arrowInner[0],
                arrowInner[1]
            ),
            'Z'
        ].join(' ')
    )
}
