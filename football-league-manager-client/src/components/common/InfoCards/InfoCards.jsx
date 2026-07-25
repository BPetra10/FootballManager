import "./InfoCards.css";

function InfoCards({ items }) {

    return (

        <section className="info-cards">

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