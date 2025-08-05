import { useContainerSize } from "@/components/Visualization/containers/ResponsiveVisualizationContainer"
import { useEffect, useRef } from "react"
import { Box } from "@mui/system"
import * as echarts from "echarts"

const MicrobeStatisticBarChart = ({ data }) => {
    const { width, height } = useContainerSize()

    const chartRef = useRef(null)
    const chartInstanceRef = useRef(null)

    useEffect(() => {
        if (!chartInstanceRef.current) {
            chartInstanceRef.current = echarts.init(chartRef.current);
        }

        const option = getOptions(data)
        const drillDownData = buildDrillDownData(data)

        chartInstanceRef.current.on('click', function (event) {
            if (event.data) {
                let subData = drillDownData.find(function (data) {
                    return data.dataGroupId === event.data.groupId
                })

                if (!subData) {
                    return
                }

                chartInstanceRef.current.clear()
                chartInstanceRef.current.setOption(
                    {
                        xAxis: {
                            data: subData.data.map(function (item) {
                                return item[0];
                            }),
                            axisTick: {
                                alignWithLabel: true,
                                interval: 0
                            },
                            axisLabel: {
                                interval: 0,
                                rotate: 15,
                                align: 'center',
                                margin: 30
                            }
                        },
                        yAxis: {
                            type: 'log',
                            name: 'Count',
                            nameLocation: 'middle',
                            nameTextStyle: {
                                padding: [0, 0, 40, 0],
                                fontWeight: 'bold'
                            },
                            axisLabel: {
                                formatter: function (value) {
                                    return dynamicFormat(value)
                                }
                            },
                            min: 1
                        },
                        title: {
                            text: `${event.data.name} Statistics`,
                            left: 'center',
                            textStyle: {
                                fontSize: 24
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        series: [
                            {
                                type: 'bar',
                                dataGroupId: subData.dataGroupId,
                                data: subData.data.map(function (item) {
                                    return item[1];
                                }),
                                barMaxWidth: '50%',
                                itemStyle: {
                                    color: event.data.name.startsWith('MAG') ? '#F28E2B' : '#4E79A7'
                                },
                                universalTransition: {
                                    enabled: true,
                                    divideShape: 'clone'
                                }
                            }
                        ],
                        graphic: [
                            {
                                type: 'text',
                                left: 50,
                                top: 20,
                                style: {
                                    text: 'Back',
                                    fontSize: 18
                                },
                                onclick: function (params) {
                                    chartInstanceRef.current.clear()
                                    chartInstanceRef.current.setOption(option)
                                }
                            }
                        ]
                    }
                )
            }
        });

        option && chartInstanceRef.current.setOption(option)

    }, [data])

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.resize();
        }
    }, [height, width])

    return (
        <Box ref={chartRef} sx={{ height: height }}></Box>
    )
}

const getOptions = (data) =>{
    return {
        xAxis: {
            data: ['Archaea', 'Bacteria', 'Fungi', 'Viruses'],
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            type: 'log',
            name: 'Genome Count',
            nameLocation: 'middle',
            nameTextStyle: {
                padding: [0, 0, 40, 0],
                fontWeight: 'bold'
            },
            axisLabel: {
                formatter: function (value) {
                    return dynamicFormat(value)
                }
            },
            min: 1
        },
        title: {
            text: 'Microorganism Statistics',
            subtext: 'Click on a bar to view specific Assembly Level Microbe Annotations Count',
            left: 'center',
            textStyle: {
                fontSize: 24
            },
            subtextStyle: {
                fontSize: 16,
                color: '#888'
            }
        },
        legend: {
            show: true,
            top: 'bottom',
            data: ['Monoisolate', 'MAG'],
            itemGap: 20
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        dataGroupId: '',
        animationDurationUpdate: 500,
        series: buildSeries(data)
    }
}

const buildSeries = (data) => {
    return [
        {
            type: 'bar',
            name: 'Monoisolate',
            id: 'Monoisolate',
            itemStyle: {
                color: '#4E79A7'
            },
            barMaxWidth: '20%',
            barGap: '15%',
            data: [
                {
                    value: data['unMAGArchaeaCount'],
                    name: 'Monoisolate Archaea',
                    groupId: 'unMAGArchaea'
                },
                {
                    value: data['unMAGBacteriaCount'],
                    name: 'Monoisolate Bacteria',
                    groupId: 'unMAGBacteria'
                },
                {
                    value: data['unMAGFungiCount'],
                    name: 'Monoisolate Fungi',
                    groupId: 'unMAGFungi'
                },
                {
                    value: data['unMAGVirusesCount'],
                    name: 'Monoisolate Viruses',
                    groupId: 'unMAGViruses'
                }
            ],
            universalTransition: {
                enabled: true,
                divideShape: 'clone'
            }
        },
        {
            type: 'bar',
            name: 'MAG',
            id: 'MAG',
            itemStyle: {
                color: '#F28E2B'
            },
            barMaxWidth: '20%',
            data: [
                {
                    value: data['MAGArchaeaCount'],
                    name: 'MAG Archaea',
                    groupId: 'MAGArchaea'
                },
                {
                    value: data['MAGBacteriaCount'],
                    name: 'MAG Bacteria',
                    groupId: 'MAGBacteria'
                },
                {
                    value: data['MAGFungiCount'],
                    name: 'MAG Fungi',
                    groupId: 'MAGFungi'
                },
                {
                    value: data['MAGVirusesCount'],
                    name: 'MAG Viruses',
                    groupId: 'MAGViruses'
                }
            ],
            universalTransition: {
                enabled: true,
                divideShape: 'clone'
            }
        }
    ]
}

function dynamicFormat(value) {
    if (value >= 1e9) {
        return (value / 1e9).toFixed(1) + 'B';
    } else if (value >= 1e6) {
        return (value / 1e6).toFixed(1) + 'M';
    } else if (value >= 1e3) {
        return (value / 1e3).toFixed(1) + 'K';
    } else {
        return value.toLocaleString()
    }
}


const buildDrillDownData = (data) => {
    return [
        {
            dataGroupId: 'MAGArchaea',
            data: [
                // ['Taxonomy', data['MAGArchaeaTaxonomyCount']],
                ['Protein', data['MAGArchaeaProteinCount']],
                ['tRNA & tmRNA', data['MAGArchaeaTrnaCount']],
                ['CRISPR/Cas System', data['MAGArchaeaCRISPRCount']],
                ['Anti-CRISPR Protein', data['MAGArchaeaAntiCRISPRAnnotationCount']],
                ['Secondary Metabolite', data['MAGArchaeaSecondaryMetaboliteRegionCount']],
                ['Signal Peptide', data['MAGArchaeaSignalPeptidePredictionCount']],
                ['Virulence Factor', data['MAGArchaeaVirulenceFactorCount']],
                ['Antibiotic Resistance Gene', data['MAGArchaeaAntibioticResistanceCount']],
                ['Transmembrane Protein', data['MAGArchaeaTransmembraneHelicesCount']]
            ]
        },
        {
            dataGroupId: 'MAGBacteria',
            data: [
                // ['Taxonomy', data['MAGBacteriaTaxonomyCount']],
                ['Protein', data['MAGBacteriaProteinCount']],
                ['tRNA & tmRNA', data['MAGBacteriaTrnaCount']],
                ['CRISPR/Cas System', data['MAGBacteriaCRISPRCount']],
                ['Anti-CRISPR Protein', data['MAGBacteriaAntiCRISPRAnnotationCount']],
                ['Secondary Metabolite', data['MAGBacteriaSecondaryMetaboliteRegionCount']],
                ['Signal Peptide', data['MAGBacteriaSignalPeptidePredictionCount']],
                ['Virulence Factor', data['MAGBacteriaVirulenceFactorCount']],
                ['Antibiotic Resistance Gene', data['MAGBacteriaAntibioticResistanceCount']],
                ['Transmembrane Protein', data['MAGBacteriaTransmembraneHelicesCount']]
            ]
        },
        {
            dataGroupId: 'MAGFungi',
            data: [
                // ['Taxonomy', data['MAGFungiTaxonomyCount']],
                ['Protein', data['MAGFungiProteinCount']],
                ['tRNA & tmRNA', data['MAGFungiTrnaCount']],
                ['Secondary Metabolite', data['MAGFungiSecondaryMetaboliteRegionCount']],
                ['Signal Peptide', data['MAGFungiSignalPeptidePredictionCount']],
                ['Virulence Factor', data['MAGFungiVirulenceFactorCount']],
                ['Antibiotic Resistance Gene', data['MAGFungiAntibioticResistanceCount']],
                ['Transmembrane Protein', data['MAGFungiTransmembraneHelicesCount']]
            ]
        },
        {
            dataGroupId: 'MAGViruses',
            data: [
                // ['Taxonomy', data['MAGVirusesTaxonomyCount']],
                ['Protein', data['MAGVirusesProteinCount']],
                ['tRNA & tmRNA', data['MAGVirusesTrnaCount']],
                ['CRISPR/Cas System', data['MAGVirusesCRISPRCount']],
                ['Anti-CRISPR Protein', data['MAGVirusesAntiCRISPRAnnotationCount']],
                ['Virulence Factor', data['MAGVirusesVirulenceFactorCount']],
                ['Antibiotic Resistance Gene', data['MAGVirusesAntibioticResistanceCount']],
                ['Transmembrane Protein', data['MAGVirusesTransmembraneHelicesCount']]
            ]
        },
        {
            dataGroupId: 'unMAGArchaea',
            data: [
                // ['Taxonomy', data['unMAGArchaeaTaxonomyCount']],
                ['Protein', data['unMAGArchaeaProteinCount']],
                ['tRNA & tmRNA', data['unMAGArchaeaTrnaCount']],
                ['CRISPR/Cas System', data['unMAGArchaeaCRISPRCount']],
                ['Anti-CRISPR Protein', data['unMAGArchaeaAntiCRISPRAnnotationCount']],
                ['Secondary Metabolite', data['unMAGArchaeaSecondaryMetaboliteRegionCount']],
                ['Signal Peptide', data['unMAGArchaeaSignalPeptidePredictionCount']],
                ['Virulence Factor', data['unMAGArchaeaVirulenceFactorCount']],
                ['Antibiotic Resistance Gene', data['unMAGArchaeaAntibioticResistanceCount']],
                ['Transmembrane Protein', data['unMAGArchaeaTransmembraneHelicesCount']]
            ]
        },
        {
            dataGroupId: 'unMAGBacteria',
            data: [
                // ['Taxonomy', data['unMAGBacteriaTaxonomyCount']],
                [
                    'Protein',
                    // 134348834
                    data['unMAGBacteriaProteinCount']
                ],
                [
                    'tRNA & tmRNA',
                    // 8238192
                    data['unMAGBacteriaTrnaCount']
                ],
                [
                    'CRISPR/Cas System',
                    // 39273
                    data['unMAGBacteriaCRISPRCount']
                ],
                [
                    'Anti-CRISPR Protein',
                    // 2476
                    data['unMAGBacteriaAntiCRISPRAnnotationCount']
                ],
                [
                    'Secondary Metabolite',
                    // 14237
                    data['unMAGBacteriaSecondaryMetaboliteRegionCount']
                ],
                [
                    'Signal Peptide',
                    // 1232347
                    data['unMAGBacteriaSignalPeptidePredictionCount']
                ],
                [
                    'Virulence Factor',
                    // 54238
                    data['unMAGBacteriaVirulenceFactorCount']
                ],
                [
                    'Antibiotic Resistance Gene',
                    // 87374485
                    data['unMAGBacteriaAntibioticResistanceCount']
                ],
                [
                    'Transmembrane Protein',
                    // 11234564
                    data['unMAGBacteriaTransmembraneHelicesCount']
                ]
            ]
        },
        {
            dataGroupId: 'unMAGFungi',
            data: [
                // ['Taxonomy', data['unMAGFungiTaxonomyCount']],
                ['Protein', data['unMAGFungiProteinCount']],
                ['tRNA & tmRNA', data['unMAGFungiTrnaCount']],
                ['Secondary Metabolite', data['unMAGFungiSecondaryMetaboliteRegionCount']],
                ['Signal Peptide', data['unMAGFungiSignalPeptidePredictionCount']],
                ['Virulence Factor', data['unMAGFungiVirulenceFactorCount']],
                ['Antibiotic Resistance Gene', data['unMAGFungiAntibioticResistanceCount']],
                ['Transmembrane Protein', data['unMAGFungiTransmembraneHelicesCount']]
            ]
        },
        {
            dataGroupId: 'unMAGViruses',
            data: [
                // ['Taxonomy', data['unMAGVirusesTaxonomyCount']],
                ['Protein', data['unMAGVirusesProteinCount']],
                ['tRNA & tmRNA', data['unMAGVirusesTrnaCount']],
                ['CRISPR/Cas System', data['unMAGVirusesCRISPRCount']],
                ['Anti-CRISPR Protein', data['unMAGVirusesAntiCRISPRAnnotationCount']],
                ['Virulence Factor', data['unMAGVirusesVirulenceFactorCount']],
                ['Antibiotic Resistance Gene', data['unMAGVirusesAntibioticResistanceCount']],
                ['Transmembrane Protein', data['unMAGVirusesTransmembraneHelicesCount']]
            ]
        },
    ]
}

export default MicrobeStatisticBarChart
