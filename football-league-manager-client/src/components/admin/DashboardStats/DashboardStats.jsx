import { useEffect, useState } from "react";

import InfoCards from "../../common/InfoCards/InfoCards";

import { getDashboard } from "../../../services/adminService";

import "./DashboardStats.css";

function DashboardStats() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        async function loadDashboard() {

            try {

                const data = await getDashboard();

                setStats(data);

            }

            catch (error) {

                console.error(error);

            }

        }

        loadDashboard();

    }, []);

    if (!stats) {

        return null;

    }

    return (

        <section className="dashboard-stats">

            <InfoCards className="dashboard-info-cards"

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