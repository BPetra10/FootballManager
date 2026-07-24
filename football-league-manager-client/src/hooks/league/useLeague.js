import { useEffect, useState } from "react";

import { getLeagueById } from "../../services/leagueService";

export function useLeague(id) {

    const [league, setLeague] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadLeague() {

            try {

                setLoading(true);

                const data = await getLeagueById(id);

                setLeague(data);

                setError("");

            }
            catch (err) {

                setError(
                    err.message ??
                    "Failed to load league."
                );

            }
            finally {

                setLoading(false);

            }

        }

        if (id) {

            loadLeague();

        }

    }, [id]);

    return {

        league,

        loading,

        error

    };

}