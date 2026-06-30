import "./Button.css";

function Button({
    children,
    onClick,
    type = "button",
    variant = "outline"
}) {

    return (

        <button
            type={type}
            className={`button ${variant}`}
            onClick={onClick}
        >
            {children}
        </button>

    );

}

export default Button;