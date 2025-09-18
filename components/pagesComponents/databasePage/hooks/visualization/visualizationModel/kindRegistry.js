import proteinCircularLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/protein/proteinCircularLayout"
import proteinLinearLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/protein/proteinLinearLayout"
import tRNACircularLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/tRNA/tRNACircularLayout"
import tRNALinearLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/tRNA/tRNALinearLayout"
import antiCRISPRCircularLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/antiCRISPR/antiCRISPRCircularLayout"
import antiCRISPRLinearLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/antiCRISPR/antiCRISPRLinearLayout"
import secondaryMetabolitesCircularLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/secondaryMetabolites/secondaryMetabolitesCircularLayout"
import secondaryMetabolitesLinearLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/secondaryMetabolites/secondaryMetabolitesLinearLayout"
import signalPeptideCircularLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/signalPeptide/signalPeptideCircularLayout"
import signalPeptideLinearLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/signalPeptide/signalPeptideLinearLayout"
import {
    addStartAndEndToSp
} from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/process/signalPeptideProcess"
import annotatedAntibioticResistanceCircularLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/annotatedAntibioticResistance/annotatedAntibioticResistanceCircularLayout"
import annotatedAntibioticResistanceLinearLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/annotatedAntibioticResistance/annotatedAntibioticResistanceLinearLayout"
import {
    addStartAndEndToARG
} from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/process/annotatedAntibioticResistanceProcess"
import transmembraneProteinCircularLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/transmembraneProtein/transmembraneProteinCircularLayout"
import transmembraneProteinLinearLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/transmembraneProtein/transmembraneProteinLinearLayout"
import {
    flattenHelicesWithGenomePosition
} from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/process/transmembraneProteinProcess"
import CRISPRCasCircularLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/CRISPRCas/CRISPRCasCircularLayout"
import CRISPRCasLinearLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/CRISPRCas/CRISPRCasLinearLayout"
import virulenceFactorCircularLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/virulenceFactor/virulenceFactorCircularLayout"
import virulenceFactorLinearLayout
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/layouts/virulenceFactor/virulenceFactorLinearLayout"
import {
    addStartAndEndToVF
} from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/process/virulenceFactorProcess"

export const KIND_REGISTRY = {
    protein: {
        layouts: {
            circular: proteinCircularLayout,
            linear: proteinLinearLayout
        }
    },
    tRNA: {
        layouts: {
            circular: tRNACircularLayout,
            linear: tRNALinearLayout
        }
    },
    antiCRISPR: {
        layouts: {
            circular: antiCRISPRCircularLayout,
            linear: antiCRISPRLinearLayout
        }
    },
    secondaryMetabolites: {
        layouts: {
            circular: secondaryMetabolitesCircularLayout,
            linear: secondaryMetabolitesLinearLayout
        }
    },
    signalPeptide: {
        layouts: {
            circular: signalPeptideCircularLayout,
            linear: signalPeptideLinearLayout
        },
        process: addStartAndEndToSp
    },
    annotatedAntibioticResistance: {
        layouts: {
            circular: annotatedAntibioticResistanceCircularLayout,
            linear: annotatedAntibioticResistanceLinearLayout
        },
        process: addStartAndEndToARG
    },
    transmembraneProtein: {
        layouts: {
            circular: transmembraneProteinCircularLayout,
            linear: transmembraneProteinLinearLayout
        },
        process: flattenHelicesWithGenomePosition
    },
    CRISPRCas: {
        layouts: {
            circular: CRISPRCasCircularLayout,
            linear: CRISPRCasLinearLayout
        }
    },
    virulenceFactor: {
        layouts: {
            circular: virulenceFactorCircularLayout,
            linear: virulenceFactorLinearLayout
        },
        process: addStartAndEndToVF
    }
}
