import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/authService";
import { validateLogin } from "../../validators/authValidator";
import { useAuth } from "../../context/AuthContext";

export function useLoginForm() {

    const navigate = useNavigate();

    const { login: loginUser } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        usernameOrEmail: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        usernameOrEmail: "",
        password: ""
    });

    const [generalError, setGeneralError] = useState("");

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
            validateLogin(formData);

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            return;

        }

        try {

            const result =
                await login(formData);

            const currentUser =
                await loginUser(result.token);

            switch (currentUser.role) {

                case "Admin":

                    navigate("/admin");
                    break;

                case "TeamManager":

                    navigate("/my-team");
                    break;

                default:

                    navigate("/");
                    break;

            }

        }
        catch (error) {

            setGeneralError(

                error?.message ??
                "Login failed."

            );

        }

    };

    return {

        formData,
        errors,
        generalError,

        showPassword,

        setShowPassword,

        handleChange,
        handleSubmit

    };

}