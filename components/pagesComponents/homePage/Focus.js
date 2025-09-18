import { Box } from "@mui/system"
import { Typography } from "antd"
import Slider from 'react-slick'
import Image from "next/image"

const { Title } = Typography

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <Box
            className={className}
            sx={{
                ...style,
                display: 'block',
                right: -16,
                '&::before' : {
                    color: '#111',
                    fontSize: '32px'
                }
            }}
            onClick={onClick}
        />
    )
}

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <Box
            className={className}
            sx={{
                ...style,
                display: 'block',
                paddingRight: '16px',
                '&::before' : {
                    color: '#111',
                    fontSize: '32px'
                }
            }}
            onClick={onClick}
        />
    )
}

const Carousel = ({}) => {
    // 配置轮播图参数
    const settings = {
        dots: true, // 显示分页点
        infinite: true, // 无限滚动
        speed: 500, // 滚动速度
        slidesToShow: 1, // 每次显示一个幻灯片
        slidesToScroll: 1, // 每次滚动一个幻灯片
        autoplay: true, // 自动播放
        autoplaySpeed: 3000, // 每个幻灯片的停留时间
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    }

    return (
        <Box sx={{ width: '80%', margin: '0 auto' }}>
            <Slider {...settings} adaptiveHeight={false}>
                <Box sx={{ position: "relative", width: "100%", aspectRatio: '4 / 3' }}>
                    <Image
                        src='/Figure1.svg'
                        alt='Focus Figure 1'
                        fill
                        style={{ objectFit: "contain" }}
                        priority={true}
                    />
                </Box>
                <Box sx={{ position: "relative", width: "100%", aspectRatio: '4 / 3' }}>
                    <Image
                        src='/Figure2.svg'
                        alt='Focus Figure 2'
                        fill
                        style={{ objectFit: "contain" }}
                        priority={true}
                    />
                </Box>
            </Slider>
        </Box>
    )
}

const Focus = ({}) => {

    return (
        <Box sx={{ mt: 2 }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
                Focus
            </Title>
            <Carousel/>
        </Box>
    )
}

export default Focus
