import { useNavigate } from "react-router-dom";

import Table from "../../components/common/Table/Table";
import FootballLayout from "../../components/layout/FootballLayout/FootballLayout";

import { useLeagues } from "../../hooks/league/useLeagues";

import chairs from "../../assets/images/home/chairs.jpg";

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

            render: row =>

                `${row.currentTeams}/${row.maxTeams}`

        }

    ];

    return (

        <FootballLayout

            background={chairs}

            title="Leagues"

        >

            {loading && (

                <p className="page-message">

                    Loading leagues...

                </p>

            )}

            {!loading && error && (

                <p className="page-message error">

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

        </FootballLayout>

    );

}

export default LeaguePage;