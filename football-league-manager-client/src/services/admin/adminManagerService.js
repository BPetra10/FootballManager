import { apiFetch } from "../../api/apiClient";

const API_URL = import.meta.env.VITE_API_URL + "/admin";

export async function getAvailableManagers() {

    const response = await apiFetch(
        `${API_URL}/available-managers`
    );

    if (!response.ok) {

        throw new Error(
            "Failed to load available managers."
        );

    }

    return await response.json();

}

export async function getTeamsWithoutManager() {

    const response = await apiFetch(
        `${API_URL}/teams-without-manager`
    );

    if (!response.ok) {

        throw new Error(
            "Failed to load teams."
        );

    }

    return await response.json();

}

export async function assignManager(data) {

    const response = await apiFetch(
        `${API_URL}/assign-manager`,
        {

            method: "PUT",

            body: JSON.stringify(data)

        }
    );

    if (!response.ok) {

        const error = await response.text();

        throw new Error(
            error || "Failed to assign manager."
        );

    }

    return await response.text();

}