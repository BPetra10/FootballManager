import { useState } from "react";

import { createLeague } from "../../services/admin/adminLeagueService";
import { validateLeague } from "../../validators/leagueValidator";

export function useLeagueForm(onSuccess) {

    const [formData, setFormData] = useState({

        name: "",
        country: "",
        maxTeams: ""

    });

    const [errors, setErrors] = useState({

        name: "",
        country: "",
        maxTeams: ""

    });

    const [generalError, setGeneralError] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

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

        setFormData({

            name: "",
            country: "",
            maxTeams: ""

        });

        setErrors({

            name: "",
            country: "",
            maxTeams: ""

        });

        setGeneralError("");

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setGeneralError("");

        const validationErrors = validateLeague(formData);

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            return;

        }

        try {

            await createLeague({

                name: formData.name,

                country: formData.country,

                maxTeams: Number(formData.maxTeams)

            });

            setSuccessMessage(
                "League created successfully!"
            );

            setTimeout(async () => {

                resetForm();

                setSuccessMessage("");

                await onSuccess?.();

            }, 2000);

        }

        catch (error) {

            setGeneralError(

                error?.message ??
                "Failed to create league."

            );

        }

    };

    return {

        formData,

        errors,

        generalError,

        successMessage,

        handleChange,

        handleSubmit

    };

}