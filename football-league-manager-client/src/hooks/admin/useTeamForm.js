import { useForm } from "../common/useForm";

import { createTeam } from "../../services/admin/adminTeamService";

import { validateTeam } from "../../validators/teamValidator";

export function useTeamForm(onSuccess) {

    const {

        formData,

        errors,
        setErrors,

        generalError,
        setGeneralError,

        successMessage,
        setSuccessMessage,

        handleChange,

        resetForm

    } = useForm({

        name: "",
        city: "",
        country: "",
        leagueId: "",
        managerId: ""

    });

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