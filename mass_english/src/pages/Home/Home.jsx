import Hero from '../../components/Hero/Hero';
import Instructure from '../../components/LeadInstructure/Instructure';
import Review from '../../components/ReviewPage/Review';
import Timeline from '../../components/TimeLine/TimeLine';
import Footer from '../../components/Footer/Footer';
import './Home.css';
import Faq from '../../components/Faq/Faq';
import AnimatedPage from '../../AnimatedPage';


const Home = () => {

    
    return (
        <>
            <div className="hero">
                <Hero />
                <Timeline />
                <Instructure />
                <Review />
                <Faq />
                <Footer />
            </div>
        </>
    )
}
export default Home;