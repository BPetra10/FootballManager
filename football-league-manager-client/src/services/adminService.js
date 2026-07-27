const API_URL = import.meta.env.VITE_API_URL + "/admin";

export async function getDashboard() {

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/dashboard`, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    if (!response.ok) {

        throw new Error("Failed to load dashboard.");

    }

    return await response.json();

}