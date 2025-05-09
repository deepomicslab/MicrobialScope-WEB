import { Splitter } from "antd"

export const TableSplitterLayout = ({ isShowLeft, leftPanel, rightPanel }) => {

    return (
        <Splitter>
            <Splitter.Panel
                style={{ paddingRight: isShowLeft ? '12px' : 0 }}
                size={isShowLeft ? '20%' : 0}
                min={isShowLeft ? '10%' : 0}
                max={isShowLeft ? '30%' : 0}
                resizable={isShowLeft}
            >
                {isShowLeft ? leftPanel : null}
            </Splitter.Panel>
            <Splitter.Panel style={{ paddingLeft: '12px' }} resizable={false}>
                {rightPanel}
            </Splitter.Panel>
        </Splitter>
    )
}

export default TableSplitterLayout
