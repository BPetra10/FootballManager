import { useState } from "react";

import { register } from "../../services/authService";
import { validateRegister } from "../../validators/authValidator";

export function useRegisterForm() {

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [generalError, setGeneralError] =
        useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));

        setGeneralError("");

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setGeneralError("");

        const validationErrors =
            validateRegister(formData);

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            return;

        }

        try {

            await register(formData);

            alert("Registration successful!");

            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            setErrors({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

        }
        catch (error) {

            if (error?.errors) {

                setErrors(prev => ({
                    ...prev,
                    ...error.errors
                }));

                return;

            }

            setGeneralError(
                error?.message ??
                "Registration failed."
            );

        }

    };

    return {

        formData,
        errors,
        generalError,

        showPassword,
        showConfirmPassword,

        setShowPassword,
        setShowConfirmPassword,

        handleChange,
        handleSubmit
    };

}