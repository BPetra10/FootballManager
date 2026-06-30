import "./Options.css";

function Option({ icon, title, description }) {

    return (

        <article className="option">

            <h3>

                <span className="option-icon">
                    {icon}
                </span>

                {title}

            </h3>

            <p>{description}</p>

        </article>

    );

}

export default Option;