import { apiFetch } from "../../api/apiClient";

const API_URL = import.meta.env.VITE_API_URL + "/team";

export async function createTeam(teamData) {

    const response = await apiFetch(API_URL, {

        method: "POST",

        body: JSON.stringify(teamData)

    });

    if (!response.ok) {

        const error = await response.text();

        throw new Error(error || "Failed to create team.");

    }

    return await response.text();

}

export async function getTeams() {

    const response = await apiFetch(API_URL);

    if (!response.ok) {

        const error = await response.text();

        throw new Error(error || "Failed to load teams.");

    }

    return await response.json();

}

export async function getTeamById(id) {

    const response = await apiFetch(`${API_URL}/${id}`);

    if (!response.ok) {

        const error = await response.text();

        throw new Error(error || "Failed to load team.");

    }

    return await response.json();

}

export async function updateTeam(id, teamData) {

    const response = await apiFetch(`${API_URL}/${id}`, {

        method: "PUT",

        body: JSON.stringify(teamData)

    });

    if (!response.ok) {

        const error = await response.text();

        throw new Error(error || "Failed to update team.");

    }

    return await response.text();

}

export async function deleteTeam(id) {

    const response = await apiFetch(`${API_URL}/${id}`, {

        method: "DELETE"

    });

    if (!response.ok) {

        const error = await response.text();

        throw new Error(error || "Failed to delete team.");

    }

    return await response.text();

}