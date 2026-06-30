import "./LandingContent.css";
import Option from "../../common/Options/Options";
import Button from "../../common/Button/Button";

function LandingContent() {

    return (

        <section className="landing-content">

            <h1>
                BUILD YOUR
                <br />
                <span>FOOTBALL LEGACY</span>
            </h1>

            <p>
                Explore leagues, discover clubs, analyze players and
                manage your own football team.
            </p>

            <div className="landing-options">

                <Option
                    icon="🏆"
                    title="Explore Leagues"
                    description="Browse competitions, standings and season information."
                />

                <Option
                    icon="🛡️"
                    title="Discover Teams"
                    description="View clubs, players and detailed statistics."
                />

                <Option
                    icon="👔"
                    title="Manage Your Club"
                    description="Build your own football club and compete with others."
                />

            </div>

            <div className="landing-buttons">

                <Button variant="filled">
                    Explore Leagues
                </Button>

                <Button>
                    Create Account
                </Button>

            </div>

        </section>

    );

}

export default LandingContent;