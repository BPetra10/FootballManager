import { useState } from "react";

import { createTeam } from "../../services/admin/adminTeamService";

import { validateTeam } from "../../validators/teamValidator";

export function useTeamForm(onSuccess) {

    const [formData, setFormData] = useState({

        name: "",
        city: "",
        country: "",
        leagueId: "",
        managerId: ""

    });

    const [errors, setErrors] = useState({});

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
            city: "",
            country: "",
            leagueId: "",
            managerId: ""

        });

        setErrors({});

        setGeneralError("");

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setGeneralError("");

        const validationErrors =
            validateTeam(formData);

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            return;

        }

        try {

            await createTeam({

                ...formData,

                managerId:
                    formData.managerId || null

            });

            setSuccessMessage(
                "Team created successfully!"
            );

            setTimeout(async () => {

                resetForm();

                setSuccessMessage("");

                await onSuccess?.();

            }, 1800);

        }

        catch (error) {

            setGeneralError(

                error?.message ??
                "Failed to create team."

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