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