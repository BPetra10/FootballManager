import { useState } from "react";

export function useForm(initialValues) {

    const [formData, setFormData] =
        useState(initialValues);

    const [errors, setErrors] =
        useState({});

    const [generalError, setGeneralError] =
        useState("");

    const [successMessage, setSuccessMessage] =
        useState("");

    const handleChange = (event) => {

        const { name, value } = event.target;

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

    const resetForm = () => {

        setFormData(initialValues);

        setErrors({});

        setGeneralError("");

    };

    return {

        formData,
        setFormData,

        errors,
        setErrors,

        generalError,
        setGeneralError,

        successMessage,
        setSuccessMessage,

        handleChange,
        resetForm

    };

}