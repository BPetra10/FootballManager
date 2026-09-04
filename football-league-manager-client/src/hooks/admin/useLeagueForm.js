import { useEffect } from "react";

import { useForm } from "../common/useForm";

import {
    createLeague,
    updateLeague
} from "../../services/admin/adminLeagueService";

import { validateLeague } from "../../validators/leagueValidator";

export function useLeagueForm(
    onSuccess,
    selectedLeague = null
) {

    const {

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

    } = useForm({

        name: "",
        country: "",
        maxTeams: ""

    });

    useEffect(() => {

        if (selectedLeague) {

            setFormData({

                name: selectedLeague.name ?? "",
                country: selectedLeague.country ?? "",
                maxTeams: selectedLeague.maxTeams ?? ""

            });

            setErrors({});
            setGeneralError("");
            setSuccessMessage("");

        }
        else {

            resetForm();

        }

    }, [selectedLeague]);

    const handleSubmit = async (event) => {

        event.preventDefault();

        setGeneralError("");

        const validationErrors =
            validateLeague(formData);

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            return;

        }

        try {

            const leagueData = {

                name: formData.name,

                country: formData.country,

                maxTeams: Number(formData.maxTeams)

            };

            if (selectedLeague) {

                await updateLeague(
                    selectedLeague.id,
                    leagueData
                );

                setSuccessMessage(
                    "League updated successfully!"
                );

            }
            else {

                await createLeague(leagueData);

                setSuccessMessage(
                    "League created successfully!"
                );

            }

            setTimeout(async () => {

                resetForm();

                setSuccessMessage("");

                await onSuccess?.();

            }, 1800);

        }

        catch (error) {

            setGeneralError(

                error?.message ??
                (
                    selectedLeague
                        ? "Failed to update league."
                        : "Failed to create league."
                )

            );

        }

    };

    return {

        formData,

        errors,

        generalError,

        successMessage,

        isEditMode: !!selectedLeague,

        handleChange,

        handleSubmit

    };

}