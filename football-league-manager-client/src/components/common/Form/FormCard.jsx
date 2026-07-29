import "./FormCard.css";

function FormCard({
    title,
    subtitle,
    hideHeader = false,
    children
}) {

    return (

        <div className="form-card">

            {!hideHeader && (

                <>

                    <h1>

                        {title}

                    </h1>

                    {subtitle && (

                        <p>

                            {subtitle}

                        </p>

                    )}

                </>

            )}

            <div className="form-card-content">

                {children}

            </div>

        </div>

    );

}

export default FormCard;