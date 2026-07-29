import { apiFetch } from "../../api/apiClient";

const API_URL = import.meta.env.VITE_API_URL + "/admin";

export async function getDashboard() {

    const response = await apiFetch(`${API_URL}/dashboard`);

    if (!response.ok) {

        throw new Error("Failed to load dashboard.");

    }

    return await response.json();

}