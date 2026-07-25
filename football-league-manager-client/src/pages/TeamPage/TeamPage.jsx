import { useParams, useNavigate  } from "react-router-dom";

import FootballLayout from "../../components/layout/FootballLayout/FootballLayout";
import InfoCards from "../../components/common/InfoCards/InfoCards";
import Table from "../../components/common/Table/Table";

import { useTeam } from "../../hooks/team/useTeam";
import { useTeamPlayers } from "../../hooks/team/useTeamPlayers";

import chairs from "../../assets/images/home/chairs.jpg";

function TeamPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const {

        team,

        loading: teamLoading,

        error: teamError

    } = useTeam(id);

    const {

        players,

        loading: playersLoading,

        error: playersError

    } = useTeamPlayers(id);

    const loading = teamLoading || playersLoading;

    const error = teamError || playersError;

    const cards = team
        ? [

            {
                title: "League",
                value: team.leagueName
            },

            {
                title: "Manager",
                value: team.managerName
            },

            {
                title: "Players",
                value: team.playerCount
            },

            {
                title: "Average Age",
                value: team.averageAge
            }

        ]
        : [];

    const columns = [

        {
            key: "fullName",
            header: "Player"
        },

        {
            key: "age",
            header: "Age"
        },

        {
            key: "position",
            header: "Position"
        }

    ];

    return (

        <FootballLayout

            background={chairs}

            title={team?.name ?? "Team"}

            subtitle={
                team
                    ? `${team.city}, ${team.country}`
                    : ""
            }

            loading={loading}

            error={error}

        >

            {!loading && !error && team && (

                <>

                    <InfoCards

                        items={cards}

                    />

                    <Table

                        columns={columns}

                        data={players}

                        onRowClick={(player) =>

                            navigate(`/player/${player.id}`)

                        }

                    />

                </>

            )}

        </FootballLayout>

    );

}

export default TeamPage;