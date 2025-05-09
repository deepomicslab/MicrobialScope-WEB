import { Layout, Menu } from "antd"
import { styled } from "@mui/system"

export const CustomHeader = styled(Layout.Header)({
    backgroundColor: '#FFFFFF',
    borderBottom: '0.8px solid #D3D3D3',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100%',
    height: '64px'
})

export const CustomContent = styled(Layout.Content)`
    background-color: rgba(255, 255, 255, 0.90);
    min-height: calc(100vh - 148px);
`

export const CustomFooter = styled(Layout.Footer)({
    backgroundColor: '#FFFFFFE6',
})

export const CustomHeaderMenu = styled(Menu)({
    borderBottom: '0.8px solid #D3D3D3',
    marginLeft: '64px',
    fontWeight: '500',
    fontSize: '16px'
})
