import "./PlayerAttributes.css";

function PlayerAttributes({ player }) {

    if (!player) return null;

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

    const leftAttributes = [

        {
            label: "PACE",
            value: player.pace
        },

        {
            label: "SHOOTING",
            value: player.shooting
        },

        {
            label: "PASSING",
            value: player.passing
        }

    ];

    const rightAttributes = [

        {
            label: "DRIBBLING",
            value: player.dribbling
        },

        {
            label: "DEFENDING",
            value: player.defending
        },

        {
            label: "PHYSICAL",
            value: player.physical
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