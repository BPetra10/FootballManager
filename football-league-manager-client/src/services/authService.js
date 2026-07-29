import { apiFetch } from "../api/apiClient";

const API_URL = import.meta.env.VITE_API_URL + "/auth";

export async function register(data) {

    const response = await apiFetch(`${API_URL}/register`, {

        method: "POST",

        body: JSON.stringify(data)

    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {

        throw {

            errors: result?.errors ?? {},

            message: result?.message ?? "Registration failed."

        };

    }

    return result;

}

export async function login(data) {

    const response = await apiFetch(`${API_URL}/login`, {

        method: "POST",

        body: JSON.stringify(data)

    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {

        throw {

            message: result?.message ?? "Login failed."

        };

    }

    return result;

}

export async function getCurrentUser() {

    const response = await apiFetch(`${API_URL}/me`);

    if (!response.ok) {

        throw new Error("Unauthorized.");

    }

    return await response.json();

}

export async function forgotPassword(data) {

}