import useSWR from "swr"
import {
    fetcher, getAnalysisTaskDetailURL, getAnalysisTaskLogURL, getAnalysisTaskResultURL, getAnalysisTaskTreeURL
} from "@/dataFetch/get"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import { Box, Stack } from "@mui/system"
import DataDetailDescription from "@/components/pagesComponents/analysisPage/shared/AnalysisResultTaskDetail"
import BoldLabel from "@/components/pagesComponents/analysisPage/shared/BoldLabel"
import DownloadOutputResult, {
    TaskOutputDownloadButton
} from "@/components/pagesComponents/analysisPage/shared/DownloadOutputResult"
import { Button, Progress } from "antd"
import SubmittedMicrobialSequences from "@/components/pagesComponents/analysisPage/shared/SubmittedMicrobialSequences"
import parseNewick from "@/components/utils/newick"
import * as d3 from "d3"
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react"
import ResponsiveVisualizationContainer from "@/components/Visualization/containers/ResponsiveVisualizationContainer"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import { createPortal } from "react-dom"
import CustomTooltip from "@/components/Visualization/tooltip/Tooltip"
import { TooltipHeader, TooltipItem, TooltipWrapper } from "@/components/Visualization/tooltip/BasicTooltipTemplate"
import { downloadSvg, downloadSvgAsPng } from "@/components/Visualization/vizD3/utils/svgExportUtils"

const getComparativeAnalysisOutputItems = (uploadPath) => [
    {
        key: '1',
        label: <BoldLabel text='Comparative Tree Results (sequence.phy)'/>,
        children: <TaskOutputDownloadButton uploadPath={uploadPath} filePath='/rawdata/tree/sequence.phy'/>
    },
    {
        key: '2',
        label: <BoldLabel text='Alfree Result (demotree.txt)'/>,
        children: <TaskOutputDownloadButton uploadPath={uploadPath} filePath='/rawdata/tree/alfree_output.txt'/>
    }
]

const submittedMicrobialSequenceColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        align: 'center',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Microbial ID',
        dataIndex: 'Acession_ID',
        align: 'center',
        sorter: (a, b) => a['Acession_ID'].localeCompare(b['Acession_ID']),
    },
    {
        title: 'GC Content(%)',
        dataIndex: 'gc_content',
        align: 'center',
        sorter: (a, b) => parseFloat(a['gc_content']) - parseFloat(b['gc_content']),
        render: value => (
            <Box
                sx={{
                    pl: '16px'
                }}
            >
                <Progress
                    percent={value}
                    size="small"
                    format={(percent) => Number(percent).toFixed(4) + '%'}
                    strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }}
                />
            </Box>
        )
    },
    {
        title: 'Genes',
        dataIndex: 'genes',
        align: 'center',
        sorter: (a, b) => parseInt(a['genes']) - parseInt(b['genes']),
    },
    {
        title: 'Length(bp)',
        dataIndex: 'length',
        align: 'center',
        sorter: (a, b) => parseInt(a.length) - parseInt(b.length),
    }
]

const setRadius = (d, y0, k) => {
    d.radius = (y0 += d.data.length) * k
    if (d.children) d.children.forEach(d => setRadius(d, y0, k))
}

const maxLength = (d) => {
    return d.data.length + (d.children ? d3.max(d.children, maxLength) : 0)
}

const parseNewickTree = (newickTreeString, innerRadius) => {
    const root = d3.hierarchy(parseNewick(newickTreeString), d => d.children)
        .sum(d => d.children ? 0 : 1)
        .sort((a, b) => (a.value - b.value) || d3.ascending(a.data.length, b.data.length))

    d3.cluster()
        .size([360, innerRadius])
        .separation((a, b) => 1)
        (root)

    setRadius(root, root.data.length = 0, innerRadius / maxLength(root))

    // setDistanceToRoot(root)

    return root
}

// const setDistanceToRoot = (node, parentDistance = 0) => {
//     const branchLength = node.data.length || 0; // 防止 undefined
//     node.data.distanceToRoot = parentDistance + branchLength;
//
//     if (Array.isArray(node.children) && node.children.length > 0) {
//         node.children.forEach(child => {
//             setDistanceToRoot(child, node.data.distanceToRoot);
//         });
//     }
// }

function linkStep(startAngle, startRadius, endAngle, endRadius) {
    const c0 = Math.cos(startAngle = (startAngle - 90) / 180 * Math.PI);
    const s0 = Math.sin(startAngle);
    const c1 = Math.cos(endAngle = (endAngle - 90) / 180 * Math.PI);
    const s1 = Math.sin(endAngle);
    return "M" + startRadius * c0 + "," + startRadius * s0
        + (endAngle === startAngle ? "" : "A" + startRadius + "," + startRadius + " 0 0 " + (endAngle > startAngle ? 1 : 0) + " " + startRadius * c1 + "," + startRadius * s1)
        + "L" + endRadius * c1 + "," + endRadius * s1;
}

function linkConstant(d) {
    return linkStep(d.source.x, d.source.y, d.target.x, d.target.y);
}

function nodePolarPosition(x, y) {
    return `rotate(${x - 90}) translate(${y},0)`
}

function mouseovered(active) {
    return function (event, d) {
        d3.select(this).classed("label--active", active);
        do d3.select(d.linkNode).classed("link--active", active).raise();
        while (d = d.parent);
    }
}

const TreeNodeTooltipTemplate = (treeNode) => {
    return (
        <TooltipWrapper>
            {
                treeNode.data.name ? (
                    <TooltipHeader headerName={treeNode.data.name}/>
                ) : (
                    <></>
                )
            }
            <TooltipItem groupName='Distance To Root' groupValue={treeNode.data.length}/>
        </TooltipWrapper>
    )
}

const ComparativeTreeVisualization = forwardRef(({ tree }, ref) => {
    const svgWidth = 920
    const svgHeight = 920
    const outerRadius = svgWidth / 2
    const innerRadius = outerRadius - 170

    const svgRef = useRef(null)
    const gLinksRef = useRef(null)
    const gNodesRef = useRef(null)
    const gTextsRef = useRef(null)
    const toolTipRef = useRef(null)

    const root = useMemo(() => parseNewickTree(tree, innerRadius), [innerRadius, tree])
    const links = useMemo(() => root.links(), [root])
    const nodes = useMemo(() => root.descendants(), [root])
    const leaves = useMemo(() => root.leaves(), [root])

    const showTooltip = (event, node) => {
        toolTipRef.current.showTooltip(event, TreeNodeTooltipTemplate(node))
    }

    const hideTooltip = () => {
        toolTipRef.current.hideTooltip()
    }

    useEffect(() => {
        const gLinks = d3.select(gLinksRef.current)

        gLinks.selectAll('path')
            .data(links)
            .join('path')
            .each(function (d) {
                d.target.linkNode = this
            })
            .attr('d', linkConstant)
    }, [links])

    useEffect(() => {
        const gNodes = d3.select(gNodesRef.current)

        gNodes.selectAll('circle')
            .data(nodes)
            .join('circle')
            .attr('fill', d => d.children ? '#999' : '#8fc8f5')
            .attr('r', d => d.children ? 3 : 4)
            .attr('transform', d => nodePolarPosition(d.x, d.y))
            .on('pointermove', (event, d) => showTooltip(event, d))
            .on('pointerout', hideTooltip)
    }, [nodes])

    useEffect(() => {
        const gText = d3.select(gTextsRef.current)

        gText.selectAll('text')
            .data(leaves)
            .join("text")
            .attr("dy", ".31em")
            .attr("transform", d => `rotate(${d.x - 90}) translate(${innerRadius + 12},0)${d.x < 180 ? "" : " rotate(180)"}`)
            .attr("text-anchor", d => d.x < 180 ? "start" : "end")
            .text(d => d.data.name.replace(/_/g, " "))
            .on("mouseover", mouseovered(true))
            .on("mouseout", mouseovered(false))
            .on('pointermove', (event, d) => showTooltip(event, d))
            .on('pointerout', hideTooltip)
    }, [innerRadius, leaves])

    useImperativeHandle(ref, () => ({
        downloadSvg: () => {
            if (!svgRef.current) return
            downloadSvg(svgRef.current, `Comparative_tree.svg`)
        },
        downloadPng: () => {
            if (!svgRef.current) return
            downloadSvgAsPng(svgRef.current, `Comparative_tree.png`, 2)
        }
    }))

    return (
        <Stack alignItems="center">
            <svg
                ref={svgRef}
                width={svgWidth}
                height={svgHeight}
                viewBox={[-outerRadius, -outerRadius, svgWidth, svgWidth]}
                fontFamily='sans-serif'
                fontSize={10}
            >
                <style>
                    {
                        `
                        .link--active {
                          stroke: #000 !important;
                          stroke-width: 1.5px;
                        }
                    
                        .link-extension--active {
                          stroke-opacity: .6;
                        }
                    
                        .label--active {
                          font-weight: bold;
                        }
                    `
                    }
                </style>
                <g
                    className='Links'
                    ref={gLinksRef}
                    fill='none'
                    stroke='#aaa'
                ></g>
                <g
                    className='Nodes'
                    ref={gNodesRef}
                >
                </g>
                <g
                    className='Texts'
                    ref={gTextsRef}
                ></g>
            </svg>
            {createPortal(<CustomTooltip ref={toolTipRef}/>, document.body)}
        </Stack>
    )
})

ComparativeTreeVisualization.displayName = 'ComparativeTreeVisualization'

const ComparativeTreeVisualizationWrapper = ({ tree }) => {
    const vizRef = useRef(null)

    return (
        <Stack>
            <Stack direction='row' spacing={2} alignItems="center" sx={{ paddingBottom: '32px', }}>
                <H6 sx={{
                    fontSize: '24px',
                    m: '0px',
                    fontWeight: 500
                }}>
                    Comparative Tree
                </H6>
                <Stack direction='row' spacing={2}>
                    <Button
                        type="primary"
                        onClick={() => vizRef.current?.downloadSvg()}
                    >
                        Download SVG Chart
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => vizRef.current?.downloadPng()}
                    >
                        Download PNG Chart
                    </Button>
                </Stack>
            </Stack>
            <ResponsiveVisualizationContainer
                containerSx={{
                    minHeight: '920px',
                    mb: '12px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    overflowX: 'auto',
                    scrollbarColor: '#eaeaea transparent',
                    '&::-webkit-scrollbar': {
                        height: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#eaeaea',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <ComparativeTreeVisualization tree={tree} ref={vizRef}/>
            </ResponsiveVisualizationContainer>
        </Stack>
    )
}

const ComparativeAnalysisResult = ({ taskId }) => {
    const {
        data: taskDetail,
        isLoading: isLoadingTaskDetail,
        error: errorTaskDetail
    } = useSWR(`${getAnalysisTaskDetailURL}?taskid=${taskId}`, fetcher)

    const {
        data: taskResult,
        isLoading: isLoadingTaskResult,
        error: errorTaskResult
    } = useSWR(`${getAnalysisTaskResultURL}?taskid=${taskId}`, fetcher)

    const {
        data: taskLog,
        isLoading: isLoadingTaskLog,
        error: errorTaskLog
    } = useSWR(`${getAnalysisTaskLogURL}?taskid=${taskId}&moudlename=tree`, fetcher)

    const {
        data: treeResult,
        isLoading: treeIsLoading,
        error: treeError
    } = useSWR(`${getAnalysisTaskTreeURL}?taskid=${taskId}`, fetcher)

    if (isLoadingTaskDetail || isLoadingTaskResult || isLoadingTaskLog || treeIsLoading) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    if (errorTaskDetail || errorTaskResult || errorTaskLog || treeError) {
        return <ErrorView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    const downloadOutputResultItems = getComparativeAnalysisOutputItems(taskDetail?.results?.['uploadpath'])

    return (
        <Stack spacing={4}>
            <DataDetailDescription
                title='Comparative Analysis'
                taskDetail={taskDetail?.results}
                sequenceNum={taskResult?.results?.length}
                taskLog={taskLog}
            />
            <DownloadOutputResult items={downloadOutputResultItems}/>
            <SubmittedMicrobialSequences sequences={taskResult?.results} columns={submittedMicrobialSequenceColumns}/>
            <ComparativeTreeVisualizationWrapper tree={treeResult}/>
        </Stack>
    )
}

export default ComparativeAnalysisResult
