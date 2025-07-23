import dynamic from "next/dynamic"

const TagCloud = dynamic(() => Promise.resolve(() => {
    return (
        <iframe
            src="/html/cloudTag.html"
            style={{
                width: '480px',
                height: '480px',
                border: 'none'
            }}
            title="3D Tag Cloud"
        />
    );
}), {
    ssr: false  // 关键：禁用服务端渲染
});

export default TagCloud
