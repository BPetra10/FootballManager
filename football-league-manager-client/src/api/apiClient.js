export async function apiFetch(url, options = {}) {

    const token = localStorage.getItem("token");

    const headers = {

        ...(options.body && {
            "Content-Type": "application/json"
        }),

        ...(token && {
            Authorization: `Bearer ${token}`
        }),

        ...options.headers

    };

    return await fetch(url, {

        ...options,
        headers

    });

}