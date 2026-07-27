import "./PlayerRadarChart.css";
import InfoCards from "../../common/InfoCards/InfoCards";

function PlayerRadarChart({ player }) {

    if (!player) return null;

    const centerX = 150;
    const centerY = 125;
    const maxRadius = 95;

    const isGoalkeeper = player.position === "Goalkeeper";

    const radarStats = isGoalkeeper
        ? [
            {
                short: "DIV",
                value: player.goalkeeperStats.diving,
                css: "pace"
            },
            {
                short: "HAN",
                value: player.goalkeeperStats.handling,
                css: "shooting"
            },
            {
                short: "KIC",
                value: player.goalkeeperStats.kicking,
                css: "passing"
            },
            {
                short: "REF",
                value: player.goalkeeperStats.reflexes,
                css: "dribbling"
            },
            {
                short: "SPD",
                value: player.goalkeeperStats.speed,
                css: "defending"
            },
            {
                short: "POS",
                value: player.goalkeeperStats.positioning,
                css: "physical"
            }
        ]
        : [
            {
                short: "PAC",
                value: player.fieldStats.pace,
                css: "pace"
            },
            {
                short: "SHO",
                value: player.fieldStats.shooting,
                css: "shooting"
            },
            {
                short: "PAS",
                value: player.fieldStats.passing,
                css: "passing"
            },
            {
                short: "DRI",
                value: player.fieldStats.dribbling,
                css: "dribbling"
            },
            {
                short: "DEF",
                value: player.fieldStats.defending,
                css: "defending"
            },
            {
                short: "PHY",
                value: player.fieldStats.physical,
                css: "physical"
            }
        ];

    const stats = radarStats.map(stat => stat.value);

    const angles = [
        -90,
        -30,
        30,
        90,
        150,
        210
    ];

    const labelPositions = [
        { x: 150, y: 5, valueY: 22 },
        { x: 275, y: 72, valueY: 90 },
        { x: 275, y: 182, valueY: 200 },
        { x: 150, y: 245, valueY: 263 },
        { x: 18, y: 182, valueY: 200 },
        { x: 18, y: 72, valueY: 90 }
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
                viewBox="-15 -15 330 315"
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

                {

                    points.map((point, index) => (

                        <circle
                            key={index}
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            className="player-point"
                        />

                    ))

                }

                {

                    radarStats.map((stat, index) => (

                        <g key={stat.short}>

                            <text
                                x={labelPositions[index].x}
                                y={labelPositions[index].y}
                                className={`label ${stat.css}`}
                            >
                                {stat.short}
                            </text>

                            <text
                                x={labelPositions[index].x}
                                y={labelPositions[index].valueY}
                                className="stat-value"
                            >
                                {stat.value}
                            </text>

                        </g>

                    ))

                }

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