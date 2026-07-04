import "./Input.css";

function Input({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder = "",
    required = false,
    disabled = false,
    error = "",
    leftIcon = null,
    rightIcon = null,
    onRightIconClick,
    ...props
}) {

    return (

        <div className="input-group">

            {label && (

                <label
                    htmlFor={name}
                    className="input-label"
                >
                    {label}
                </label>

            )}

            <div className="input-wrapper">

                {leftIcon && (

                    <span className="input-icon left">

                        {leftIcon}

                    </span>

                )}

                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    className={`
                        input-field
                        ${leftIcon ? "with-left-icon" : ""}
                        ${rightIcon ? "with-right-icon" : ""}
                        ${error ? "error" : ""}
                    `}
                    {...props}
                />

                {rightIcon && (

                    <button
                        type="button"
                        className="input-icon right"
                        onClick={onRightIconClick}
                    >
                        {rightIcon}
                    </button>

                )}

            </div>

            <span className="input-error">

                {error}

            </span>

        </div>

    );

}

export default Input;