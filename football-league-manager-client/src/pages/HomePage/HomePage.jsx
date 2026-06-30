import Slider from "../../components/ui/Slider/Slider";
import LandingContent from "../../components/ui/Slider/LandingContent";

import "./HomePage.css";

function HomePage() {

    return (

        <main className="home-page">

            <Slider>

                <LandingContent />

            </Slider>

        </main>

    );

}

export default HomePage;