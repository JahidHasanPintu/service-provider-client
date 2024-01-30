
import Features from '../Features/Features';
import NewsLetter from '../NewsLetter/NewsLetter';
import BannersAd from '../Banners/BannersAd';
import HeroBanner from '../Banners/HeroBanner';
import IntoSection from './IntoSection';
import ForYourHome from './ForYourHome';
import RecentlyView from './RecentlyView';
import Recomended from './Recomended';


const Home = () => {
    return (
        <div>
            {/* <HeroBanner/> */}
            <IntoSection/>
            <Features />
            <ForYourHome/>
            <RecentlyView/>
            <Recomended/>
            {/* <BannersAd/> */}
            <NewsLetter />
           
        </div>
    );
};

export default Home;