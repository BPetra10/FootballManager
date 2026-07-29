import { FaChevronDown } from "react-icons/fa6";

import "./Select.css";

function Select({

    label,
    name,

    value,
    onChange,

    options,

    placeholder = "Select...",

    error,

    disabled = false

}) {

    return (

        <div className="select-group">

            {

                label && (

                    <label className="select-label">

                        {label}

                    </label>

                )

            }

            <div className="select-wrapper">

                <select
                    className={`select ${error ? "select-error" : ""}`}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                >

                    <option value="">

                        {placeholder}

                    </option>

                    {

                        options.map(option => (

                            <option
                                key={option.value}
                                value={option.value}
                            >

                                {option.label}

                            </option>

                        ))

                    }

                </select>

                <FaChevronDown className="select-icon" />

            </div>

            {

                error && (

                    <span className="select-error-text">

                        {error}

                    </span>

                )

            }

        </div>

    );

}

export default Select;