import { useRef, useState } from "react"
import { Button, Modal } from "antd"
import { Box } from "@mui/system"
import Draggable from "react-draggable"

const DraggableModal = ({ open, handleConfirm, handleCancel, title, children }) => {
    const [disabled, setDisabled] = useState(true)
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
    const draggableRef = useRef(null)

    const onStart = (_event, uiData) => {
        let _a
        const { clientWidth, clientHeight } = window.document.documentElement
        const targetRect =
            (_a = draggableRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()

        if (!targetRect) {
            return
        }

        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        })
    }

    const handleMouseOver = () => {
        if (disabled) {
            setDisabled(false)
        }
    }

    const handleMouseOut = () => {
        setDisabled(true)
    }

    return (
        <Modal
            title={
                <TitleWrapper handleMouseOver={handleMouseOver} handleMouseOut={handleMouseOut}>
                    {title}
                </TitleWrapper>
            }
            footer={[
                <Button key='confirm' type='primary' onClick={handleConfirm}>
                    Confirm
                </Button>
            ]}
            modalRender={modal => (
                <Draggable
                    disabled={disabled}
                    bounds={bounds}
                    nodeRef={draggableRef}
                    onStart={(event, uiData) => onStart(event, uiData)}
                >
                    <div ref={draggableRef}>{modal}</div>
                </Draggable>
            )}
            open={open}
            onCancel={handleCancel}
            width='70%'
            centered
        >
            {children}
        </Modal>
    )
}

const TitleWrapper = ({ handleMouseOver, handleMouseOut, children }) => (
    <Box
        sx={{ width: '100%', cursor: 'move' }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onFocus={() => {
        }}
        onBlur={() => {
        }}
    >
        {children}
    </Box>
)

export default DraggableModal
