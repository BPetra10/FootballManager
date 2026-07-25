import { useEffect, useState } from "react";

import { getTeamPlayers } from "../../services/teamService";

export function useTeamPlayers(id) {

    const [players, setPlayers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadPlayers() {

            try {

                setLoading(true);

                const data = await getTeamPlayers(id);

                setPlayers(data);

                setError("");

            }
            catch (err) {

                setError(
                    err.message ??
                    "Failed to load players."
                );

            }
            finally {

                setLoading(false);

            }

        }

        if (id) {

            loadPlayers();

        }

    }, [id]);

    return {

        players,

        loading,

        error

    };

}