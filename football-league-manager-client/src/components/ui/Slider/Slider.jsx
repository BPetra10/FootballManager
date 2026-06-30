import { useEffect, useState } from "react";

import stadium from "../../../assets/images/home/stadium.jpg";
import football from "../../../assets/images/home/football.jpg";
import footballer from "../../../assets/images/home/footballer.jpg";
import manager from "../../../assets/images/home/manager.jpg";

import "./Slider.css";

const images = [
    stadium,
    football,
    footballer,
    manager
];

function Slider({ children }) {

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentImage(previous =>
                (previous + 1) % images.length
            );

        }, 5000);

        return () => clearInterval(interval);

    }, []);

    function nextSlide() {

        setCurrentImage(previous =>
            (previous + 1) % images.length
        );

    }

    function previousSlide() {

        setCurrentImage(previous =>
            previous === 0
                ? images.length - 1
                : previous - 1
        );

    }

    function goToSlide(index) {

        setCurrentImage(index);

    }

    return (

        <section className="slider">

            {images.map((image, index) => (

                <div
                    key={index}
                    className={
                        index === currentImage
                            ? "slider-image active"
                            : "slider-image"
                    }
                    style={{
                        backgroundImage: `url(${image})`
                    }}
                />

            ))}

            <div className="slider-overlay">

                <button
                    className="slider-arrow left"
                    onClick={previousSlide}
                    aria-label="Previous slide"
                >
                    &#10094;
                </button>

                <div className="slider-content">
                    {children}
                </div>

                <button
                    className="slider-arrow right"
                    onClick={nextSlide}
                    aria-label="Next slide"
                >
                    &#10095;
                </button>

            </div>

            <div className="slider-dots">

                {images.map((_, index) => (

                    <button
                        key={index}
                        className={
                            index === currentImage
                                ? "slider-dot active"
                                : "slider-dot"
                        }
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />

                ))}

            </div>

        </section>

    );

}

export default Slider;