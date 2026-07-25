const API_URL = import.meta.env.VITE_API_URL + "/team";

export async function getTeamById(id) {

    const response = await fetch(
        `${API_URL}/${id}`
    );

    const result = await response.json().catch(() => null);

    if (!response.ok) {

        throw {

            message:
                result?.message ??
                "Failed to load team."

        };

    }

    return result;

}

export async function getTeamPlayers(id) {

    const response = await fetch(
        `${API_URL}/${id}/players`
    );

    const result = await response.json().catch(() => null);

    if (!response.ok) {

        throw {

            message:
                result?.message ??
                "Failed to load players."

        };

    }

    return result;

}