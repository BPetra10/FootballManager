import "./PlayerAttributes.css";

function PlayerAttributes({ player }) {

    if (!player) return null;

    const isGoalkeeper = player.position === "Goalkeeper";

    const getBarColor = (value) => {

        if (value >= 90) {

            return "#00c853";

        }

        if (value >= 75) {

            return "#66bb6a";

        }

        if (value >= 60) {

            return "#fdd835";

        }

        if (value >= 40) {

            return "#fb8c00";

        }

        return "#e53935";

    };

    const leftAttributes = isGoalkeeper
        ? [
            {
                label: "DIVING",
                value: player.goalkeeperStats.diving
            },
            {
                label: "HANDLING",
                value: player.goalkeeperStats.handling
            },
            {
                label: "KICKING",
                value: player.goalkeeperStats.kicking
            }
        ]
        : [
            {
                label: "PACE",
                value: player.fieldStats.pace
            },
            {
                label: "SHOOTING",
                value: player.fieldStats.shooting
            },
            {
                label: "PASSING",
                value: player.fieldStats.passing
            }
        ];

    const rightAttributes = isGoalkeeper
        ? [
            {
                label: "REFLEXES",
                value: player.goalkeeperStats.reflexes
            },
            {
                label: "SPEED",
                value: player.goalkeeperStats.speed
            },
            {
                label: "POSITIONING",
                value: player.goalkeeperStats.positioning
            }
        ]
        : [
            {
                label: "DRIBBLING",
                value: player.fieldStats.dribbling
            },
            {
                label: "DEFENDING",
                value: player.fieldStats.defending
            },
            {
                label: "PHYSICAL",
                value: player.fieldStats.physical
            }
        ];

    const renderColumn = (attributes) => (

        <div className="attribute-column">

            {

                attributes.map(attribute => (

                    <div
                        key={attribute.label}
                        className="attribute-item"
                    >

                        <div className="attribute-header">

                            <span className="attribute-name">

                                {attribute.label}

                            </span>

                            <span
                                className="attribute-value"
                                style={{
                                    color: getBarColor(attribute.value)
                                }}
                            >

                                {attribute.value}

                            </span>

                        </div>

                        <div className="attribute-bar">

                            <div
                                className="attribute-fill"
                                style={{
                                    width: `${attribute.value}%`,
                                    backgroundColor: getBarColor(attribute.value)
                                }}
                            />

                        </div>

                    </div>

                ))

            }

        </div>

    );

    return (

        <section className="player-attributes">

            <h2>

                Attributes

            </h2>

            <div className="attributes-grid">

                {renderColumn(leftAttributes)}

                {renderColumn(rightAttributes)}

            </div>

        </section>

    );

}

export default PlayerAttributes;