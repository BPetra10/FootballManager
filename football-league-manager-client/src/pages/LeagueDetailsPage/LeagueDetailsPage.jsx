import { useParams, useNavigate } from "react-router-dom";

import Table from "../../components/common/Table/Table";
import FootballLayout from "../../components/layout/FootballLayout/FootballLayout";

import { useLeague } from "../../hooks/league/useLeague";
import { useLeagueTable } from "../../hooks/league/useLeagueTable";

import chairs from "../../assets/images/home/chairs.jpg";

function LeagueDetailsPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const {
        league,
        loading: leagueLoading,
        error: leagueError
    } = useLeague(id);

    const {
        table,
        loading: tableLoading,
        error: tableError
    } = useLeagueTable(id);

    const columns = [

        {
            key: "teamName",
            header: "Team"
        },

        {
            key: "played",
            header: "P"
        },

        {
            key: "wins",
            header: "W"
        },

        {
            key: "draws",
            header: "D"
        },

        {
            key: "losses",
            header: "L"
        },

        {
            key: "goalsFor",
            header: "GF"
        },

        {
            key: "goalsAgainst",
            header: "GA"
        },

        {
            key: "goalDifference",
            header: "GD"
        },

        {
            key: "points",
            header: "Pts"
        }

    ];

    return (

        <FootballLayout

            background={chairs}

            title={
                leagueLoading
                    ? "Loading..."
                    : league?.name
            }

            subtitle={
                !leagueLoading
                    ? league?.country
                    : undefined
            }

        >

            {(leagueLoading || tableLoading) && (

                <p className="page-message">

                    Loading league...

                </p>

            )}

            {!leagueLoading && (leagueError || tableError) && (

                <p className="page-message error">

                    {leagueError || tableError}

                </p>

            )}

            {!leagueLoading &&
                !tableLoading &&
                !leagueError &&
                !tableError && (

                    <Table

                        columns={columns}

                        data={table}

                        onRowClick={(team) =>

                            navigate(`/team/${team.teamId}`)

                        }

                    />

                )}

        </FootballLayout>

    );

}

export default LeagueDetailsPage;