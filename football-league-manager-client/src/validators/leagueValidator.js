export function validateLeague(formData) {

    const errors = {};

    if (!formData.name.trim()) {

        errors.name = "League name is required.";

    }

    if (!formData.country.trim()) {

        errors.country = "Country is required.";

    }

    if (!formData.maxTeams) {

        errors.maxTeams = "Maximum teams is required.";

    }
    else if (Number(formData.maxTeams) < 2) {

        errors.maxTeams =
            "League must allow at least 2 teams.";

    }

    return errors;

}