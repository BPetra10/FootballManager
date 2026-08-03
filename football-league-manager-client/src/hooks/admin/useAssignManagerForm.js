import { useForm } from "../common/useForm";

import { assignManager } from "../../services/admin/adminManagerService";

export function useAssignManagerForm(onSuccess) {

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

        managerId: "",
        teamId: ""

    });

    const handleSubmit = async (event) => {

        event.preventDefault();

        setGeneralError("");

        const validationErrors = {};

        if (!formData.managerId) {

            validationErrors.managerId =
                "Please select a manager.";

        }

        if (!formData.teamId) {

            validationErrors.teamId =
                "Please select a team.";

        }

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            return;

        }

        try {

            await assignManager(formData);

            setSuccessMessage(
                "Manager assigned successfully!"
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
                "Failed to assign manager."

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