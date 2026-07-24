import { useNavigate } from "react-router-dom";

import Table from "../../components/common/Table/Table";

import { useLeagues } from "../../hooks/league/useLeagues";

import chairs from "../../assets/images/home/chairs.jpg";

import "./LeaguePage.css";

function LeaguePage() {

    const navigate = useNavigate();

    const {

        leagues,

        loading,

        error

    } = useLeagues();

    const columns = [

        {
            key: "name",
            header: "League"
        },

        {
            key: "country",
            header: "Country"
        },

        {
            key: "currentTeams",
            header: "Teams",

            render: (row) =>

                `${row.currentTeams}/${row.maxTeams}`

        }

    ];

    return (

<main
    className="league-page"
    style={{
        "--league-bg": `url(${chairs})`
    }}
>

            <div className="league-page-overlay">

                <h1>Leagues</h1>

                {loading && (

                    <p>Loading leagues...</p>

                )}

                {!loading && error && (

                    <p className="league-error">

                        {error}

                    </p>

                )}

                {!loading && !error && (

                    <Table

                        columns={columns}

                        data={leagues}

                        onRowClick={(league) =>

                            navigate(`/league/${league.id}`)

                        }

                    />

                )}

            </div>

        </main>

    );

}

export default LeaguePage;