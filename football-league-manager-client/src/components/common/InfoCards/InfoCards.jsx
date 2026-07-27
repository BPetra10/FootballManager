import "./InfoCards.css";

function InfoCards({ items, className = "" }) {

    return (

        <section className={`info-cards ${className}`}>

            {items.map((item) => (

                <article
                    key={item.title}
                    className="info-card"
                >

                    <h3>

                        {item.title}

                    </h3>

                    <p>

                        {item.value}

                    </p>

                </article>

            ))}

        </section>

    );

}

export default InfoCards;