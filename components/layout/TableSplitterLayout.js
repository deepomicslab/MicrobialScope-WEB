import { Splitter } from "antd"

export const TableSplitterLayout = ({ isShowLeft, leftPanel, rightPanel }) => {
    const handleResize = (size) => {}

    return (
        <Splitter onResize={handleResize}>
            <Splitter.Panel
                style={{ paddingRight: isShowLeft ? '12px' : 0 }}
                size={isShowLeft ? 280 : 0}
            >
                {isShowLeft ? leftPanel : null}
            </Splitter.Panel>
            <Splitter.Panel
                style={{ paddingLeft: '12px' }}
                resizable={false}
            >
                {rightPanel}
            </Splitter.Panel>
        </Splitter>
    )
}

export default TableSplitterLayout
