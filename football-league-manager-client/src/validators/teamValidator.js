export function validateTeam(formData) {

    const errors = {};

    if (!formData.name.trim()) {

        errors.name = "Team name is required.";

    }

    if (!formData.city.trim()) {

        errors.city = "City is required.";

    }

    if (!formData.country.trim()) {

        errors.country = "Country is required.";

    }

    if (!formData.leagueId) {

        errors.leagueId = "Please select a league.";

    }

    return errors;

}