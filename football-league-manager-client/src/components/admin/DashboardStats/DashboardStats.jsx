import InfoCards from "../../common/InfoCards/InfoCards";

import "./DashboardStats.css";

function DashboardStats({ stats }) {

    if (!stats) {

        return null;

    }

    return (

        <section className="dashboard-stats">

            <InfoCards

                className="dashboard-info-cards"

                items={[

                    {

                        title: "Leagues",

                        value: stats.leagues

                    },

                    {

                        title: "Teams",

                        value: stats.teams

                    },

                    {

                        title: "Managers",

                        value: stats.managers

                    },

                    {

                        title: "Matches",

                        value: stats.matches

                    }

                ]}

            />

        </section>

    );

}

export default DashboardStats;