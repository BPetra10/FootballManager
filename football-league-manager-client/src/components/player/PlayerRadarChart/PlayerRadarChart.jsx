import "./PlayerRadarChart.css";
import InfoCards from "../../common/InfoCards/InfoCards";

function PlayerRadarChart({ player }) {

    const centerX = 150;
    const centerY = 125;
    const maxRadius = 95;

    const stats = [

        player.pace,
        player.shooting,
        player.passing,
        player.dribbling,
        player.defending,
        player.physical

    ];

    const angles = [

        -90,
        -30,
        30,
        90,
        150,
        210

    ];

    const points = stats.map((value, index) => {

        const angle = (angles[index] * Math.PI) / 180;

        const radius = (value / 100) * maxRadius;

        return {

            x: centerX + Math.cos(angle) * radius,

            y: centerY + Math.sin(angle) * radius

        };

    });

    const polygonPoints = points
        .map(point => `${point.x},${point.y}`)
        .join(" ");

    return (

        <div className="player-radar">
            <svg
                viewBox="0 -15 300 315"
                className="radar-svg"
            >

                <polygon
                    points="150,30 235,75 235,175 150,220 65,175 65,75"
                    className="hex hex-1"
                />

                <polygon
                    points="150,55 214,88 214,162 150,195 86,162 86,88"
                    className="hex hex-2"
                />

                <polygon
                    points="150,80 194,100 194,150 150,170 106,150 106,100"
                    className="hex hex-3"
                />

                <polygon
                    points="150,100 178,112 178,138 150,150 122,138 122,112"
                    className="hex hex-4"
                />

                <line x1="150" y1="125" x2="150" y2="30" className="axis" />
                <line x1="150" y1="125" x2="235" y2="75" className="axis" />
                <line x1="150" y1="125" x2="235" y2="175" className="axis" />
                <line x1="150" y1="125" x2="150" y2="220" className="axis" />
                <line x1="150" y1="125" x2="65" y2="175" className="axis" />
                <line x1="150" y1="125" x2="65" y2="75" className="axis" />

                <polygon

                    points={polygonPoints}

                    className="player-polygon"

                />

                {points.map((point, index) => (

                    <circle

                        key={index}

                        cx={point.x}

                        cy={point.y}

                        r="4"

                        className="player-point"

                    />

                ))}

                <text x="150" y="5" className="label pace">
                    PAC
                </text>

                <text x="150" y="22" className="stat-value">
                    {player.pace}
                </text>

                <text x="275" y="72" className="label shooting">
                    SHO
                </text>

                <text x="275" y="90" className="stat-value">
                    {player.shooting}
                </text>


                <text x="275" y="182" className="label passing">
                    PAS
                </text>

                <text x="275" y="200" className="stat-value">
                    {player.passing}
                </text>


                <text x="150" y="245" className="label dribbling">
                    DRI
                </text>

                <text x="150" y="263" className="stat-value">
                    {player.dribbling}
                </text>


                <text x="18" y="182" className="label defending">
                    DEF
                </text>

                <text x="18" y="200" className="stat-value">
                    {player.defending}
                </text>


                <text x="18" y="72" className="label physical">
                    PHY
                </text>

                <text x="18" y="90" className="stat-value">
                    {player.physical}
                </text>

            </svg>

            <InfoCards
                items={[
                    {
                        title: "Overall",
                        value: player.overall
                    }
                ]}
            />

        </div>

    );

}

export default PlayerRadarChart;