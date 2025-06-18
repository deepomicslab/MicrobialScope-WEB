import HomeContent from "@/components/pagesComponents/homePage/HomeContent"
import { getMicrobeStatisticsURL } from "@/dataFetch/get"

export default function Home({ statistic }) {
    return <HomeContent statistic={statistic}/>
}

export async function getStaticProps() {
    const statistic = await fetch(getMicrobeStatisticsURL).then(res => res.json())

    return {
        props: {
            statistic,
        }
    }
}
