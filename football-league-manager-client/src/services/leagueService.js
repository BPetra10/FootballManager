import { apiFetch } from "../api/apiClient";

const API_URL = import.meta.env.VITE_API_URL + "/league";

export async function getAllLeagues() {

    const response = await apiFetch(API_URL);

    const result = await response.json().catch(() => null);

    if (!response.ok) {

        throw {

            message:
                result?.message ??
                "Failed to load leagues."

        };

    }

    return result;

}

export async function getLeagueById(id) {

    const response = await apiFetch(
        `${API_URL}/${id}`
    );

    const result = await response.json().catch(() => null);

    if (!response.ok) {

        throw {

            message:
                result?.message ??
                "Failed to load league."

        };

    }

    return result;

}

export async function getLeagueTable(id) {

    const response = await apiFetch(
        `${API_URL}/${id}/table`
    );

    const result = await response.json().catch(() => null);

    if (!response.ok) {

        throw {

            message:
                result?.message ??
                "Failed to load league table."

        };

    }

    return result;

}