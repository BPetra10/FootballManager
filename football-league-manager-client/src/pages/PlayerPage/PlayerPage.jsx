import { useParams } from "react-router-dom";

import FootballLayout from "../../components/layout/FootballLayout/FootballLayout";
import InfoCards from "../../components/common/InfoCards/InfoCards";
import PlayerRadarChart from "../../components/player/PlayerRadarChart/PlayerRadarChart";
import PlayerAttributes from "../../components/player/PlayerAttributes/PlayerAttributes";

import { usePlayer } from "../../hooks/player/usePlayer";

import chairs from "../../assets/images/home/chairs.jpg";

import "./PlayerPage.css"

function PlayerPage() {

    const { id } = useParams();

    const {

        player,

        loading,

        error

    } = usePlayer(id);

    if (loading) {

        return (

            <FootballLayout

                background={chairs}

                title="Loading..."

            >

                <p className="page-message">

                    Loading player...

                </p>

            </FootballLayout>

        );

    }

    if (error) {

        return (

            <FootballLayout

                background={chairs}

                title="Player"

            >

                <p className="page-message error">

                    {error}

                </p>

            </FootballLayout>

        );

    }

    const cards = [

        {

            title: "Position",

            value: player.position

        },

        {

            title: "Age",

            value: player.age

        },

        {

            title: "Preferred Foot",

            value: player.preferredFoot

        }

    ];

    return (

        <FootballLayout

            background={chairs}

            title={`${player.firstName} ${player.lastName}`}

            subtitle={player.teamName}

        >

            <InfoCards
                items={cards}
            />

            <div className="player-details">

                <PlayerRadarChart player={player} />

                <PlayerAttributes player={player} />

            </div>

        </FootballLayout>

    );

}

export default PlayerPage;