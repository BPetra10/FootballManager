import { apiFetch } from "../../api/apiClient";

const API_URL = import.meta.env.VITE_API_URL + "/league";

export async function createLeague(leagueData) {

    const response = await apiFetch(API_URL, {

        method: "POST",

        body: JSON.stringify(leagueData)

    });

    if (!response.ok) {

        const error = await response.text();

        throw new Error(error || "Failed to create league.");

    }

    return await response.text();

}

export async function getLeagues() {

    const response = await apiFetch(API_URL);

    if (!response.ok) {

        const error = await response.text();

        throw new Error(error || "Failed to load leagues.");

    }

    return await response.json();

}

export async function getLeagueById(id) {

    const response = await apiFetch(`${API_URL}/${id}`);

    if (!response.ok) {

        const error = await response.text();

        throw new Error(error || "Failed to load league.");

    }

    return await response.json();

}

export async function updateLeague(id, leagueData) {

    const response = await apiFetch(`${API_URL}/${id}`, {

        method: "PUT",

        body: JSON.stringify(leagueData)

    });

    if (!response.ok) {

        const error = await response.text();

        if (error.includes("League already exists.")) {

            throw new Error("League already exists.");

        }

        throw new Error(
            error || "Failed to update league."
        );

    }

    return await response.text();

}

export async function deleteLeague(id) {

    const response = await apiFetch(`${API_URL}/${id}`, {

        method: "DELETE"

    });

    if (!response.ok) {

        const error = await response.text();

        throw new Error(error || "Failed to delete league.");

    }

    return await response.text();

}