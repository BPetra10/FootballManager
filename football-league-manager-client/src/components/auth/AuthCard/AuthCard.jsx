import { Link } from "react-router-dom";

import "./AuthCard.css";

function AuthCard({
    title,
    subtitle,
    children
}) {

    return (

        <div className="auth-card">

            <h1>{title}</h1>

            {subtitle && (
                <p>{subtitle}</p>
            )}

            <div className="auth-card-content">

                {children}

            </div>

        </div>

    );

}

export default AuthCard;