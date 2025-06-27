const argTypeDict = {
    'aminocoumarin antibiotic': {
        name: 'aminocoumarin antibiotic',
        color: '#f54291'
    },
    'aminoglycoside antibiotic': {
        name: 'aminoglycoside antibiotic',
        color: '#42f554'
    },
    'antibacterial free fatty acids': {
        name: 'antibacterial free fatty acids',
        color: '#f5a742'
    },
    'bicyclomycin-like antibiotic': {
        name: 'bicyclomycin-like antibiotic',
        color: '#427af5'
    },
    'carbapenem': {
        name: 'carbapenem',
        color: '#e5f542'
    },
    'cephalosporin': {
        name: 'cephalosporin',
        color: '#f54242'
    },
    'cephamycin': {
        name: 'cephamycin',
        color: '#42f5e0'
    },
    'diaminopyrimidine antibiotic': {
        name: 'diaminopyrimidine antibiotic',
        color: '#9a42f5'
    },
    'disinfecting agents and antiseptics': {
        name: 'disinfecting agents and antiseptics',
        color: '#f542d4'
    },
    'elfamycin antibiotic': {
        name: 'elfamycin antibiotic',
        color: '#42f59d'
    },
    'fluoroquinolone antibiotic': {
        name: 'fluoroquinolone antibiotic',
        color: '#f59542'
    },
    'fusidane antibiotic': {
        name: 'fusidane antibiotic',
        color: '#42a2f5'
    },
    'glycopeptide antibiotic': {
        name: 'glycopeptide antibiotic',
        color: '#f5d442'
    },
    'glycylcycline': {
        name: 'glycylcycline',
        color: '#f54242'
    },
    'isoniazid-like antibiotic': {
        name: 'isoniazid-like antibiotic',
        color: '#42f5cb'
    },
    'lincosamide antibiotic': {
        name: 'lincosamide antibiotic',
        color: '#e442f5'
    },
    'macrolide antibiotic': {
        name: 'macrolide antibiotic',
        color: '#42f55a'
    },
    'monobactam': {
        name: 'monobactam',
        color: '#f5a742'
    },
    'mupirocin-like antibiotic': {
        name: 'mupirocin-like antibiotic',
        color: '#4242f5'
    },
    'nitrofuran antibiotic': {
        name: 'nitrofuran antibiotic',
        color: '#f5f542'
    },
    'nitroimidazole antibiotic': {
        name: 'nitroimidazole antibiotic',
        color: '#f54291'
    },
    'nucleoside antibiotic': {
        name: 'nucleoside antibiotic',
        color: '#42f554'
    },
    'orthosomycin antibiotic': {
        name: 'orthosomycin antibiotic',
        color: '#f5a742'
    },
    'oxacephem': {
        name: 'oxacephem',
        color: '#42e1f5'
    },
    'oxazolidinone antibiotic': {
        name: 'oxazolidinone antibiotic',
        color: '#f57f42'
    },
    'penam': {
        name: 'penam',
        color: '#9a42f5'
    },
    'penem': {
        name: 'penem',
        color: '#e442f5'
    },
    'peptide antibiotic': {
        name: 'peptide antibiotic',
        color: '#42f59d'
    },
    'phenicol antibiotic': {
        name: 'phenicol antibiotic',
        color: '#f59542'
    },
    'phosphonic acid antibiotic': {
        name: 'phosphonic acid antibiotic',
        color: '#42a2f5'
    },
    'pleuromutilin antibiotic': {
        name: 'pleuromutilin antibiotic',
        color: '#f5d442'
    },
    'polyamine antibiotic': {
        name: 'polyamine antibiotic',
        color: '#f54242'
    },
    'pyrazine antibiotic': {
        name: 'pyrazine antibiotic',
        color: '#42f5cb'
    },
    'rifamycin antibiotic': {
        name: 'rifamycin antibiotic',
        color: '#e442f5'
    },
    'salicylic acid antibiotic': {
        name: 'salicylic acid antibiotic',
        color: '#42f55a'
    },
    'streptogramin A antibiotic': {
        name: 'streptogramin A antibiotic',
        color: '#f5a742'
    },
    'streptogramin B antibiotic': {
        name: 'streptogramin B antibiotic',
        color: '#4242f5'
    },
    'streptogramin antibiotic': {
        name: 'streptogramin antibiotic',
        color: '#f5f542'
    },
    'sulfonamide antibiotic': {
        name: 'sulfonamide antibiotic',
        color: '#f54291'
    },
    'tetracycline antibiotic': {
        name: 'tetracycline antibiotic',
        color: '#42f554'
    },
    'thioamide antibiotic': {
        name: 'thioamide antibiotic',
        color: '#f5a742'
    },
    'mixed': {
        name: 'mixed',
        color: '#f94eba',
    },
    'Multiply': {
        name: 'Multiply',
        color: '#ffffff'
    },
    'Unknown': {
        name: 'Unknown',
        color: '#000000'
    }
}

export const extractAntibioticResistanceArrowData = (antibioticResistance) => {
    return antibioticResistance.map(
        ar => ({
            id: ar.id,
            name: ar.protein_id,
            start: ar.start,
            end: ar.end,
            strand: ar.strand,
            type: ar['cutoff'],
            drugClass: ar['drug_class'].join(';'),
            color: getDrugClassType(ar['drug_class'])
        })
    )
}

const getDrugClassType = (drugClass) => {
    console.log(drugClass)
    if (Array.isArray(drugClass)) {
        if (drugClass.length === 0) {
            return argTypeDict['Unknown'].color
        }

        if (drugClass.length > 1) {
            return argTypeDict['Multiply'].color
        }
    }

    return argTypeDict[drugClass[0]] ? argTypeDict[drugClass[0]].color : '#000000'
}
