const API_URL = import.meta.env.VITE_API_URL + "/player";

export async function getPlayerById(id) {

    const response = await fetch(
        `${API_URL}/${id}`
    );

    const result = await response.json().catch(() => null);

    if (!response.ok) {

        throw {

            message:
                result?.message ??
                "Failed to load player."

        };

    }

    return result;

}