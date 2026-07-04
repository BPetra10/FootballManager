const API_URL = import.meta.env.VITE_API_URL + "/auth";

export async function register(data) {

    const response = await fetch(`${API_URL}/register`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

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

}

export async function forgotPassword(data) {

}