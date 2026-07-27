import "./FootballLayout.css";

function FootballLayout({
    background,
    title,
    subtitle,
    titleStyle,
    children
}) {

    return (

        <main
            className="football-layout"
            style={{
                "--page-bg": `url(${background})`
            }}
        >

            <div className="football-layout-content">

                <header className="football-layout-header">

                    <h1 style={titleStyle}>{title}</h1>

                    {subtitle && (

                        <p>{subtitle}</p>

                    )}

                </header>

                {children}

            </div>

        </main>

    );

}

export default FootballLayout;