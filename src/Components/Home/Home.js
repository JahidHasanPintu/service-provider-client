
import Features from '../Features/Features';
import NewsLetter from '../NewsLetter/NewsLetter';
import BannersAd from '../Banners/BannersAd';
import HeroBanner from '../Banners/HeroBanner';
import IntoSection from './IntoSection';


const Home = () => {
    return (
        <div>
            {/* <HeroBanner/> */}
            <IntoSection/>
            <Features />
            {/* <BannersAd/> */}
            <NewsLetter />
           
        </div>
    );
};

export default Home;