import { useEffect, useState } from "react";

import { getTeamById } from "../../services/teamService";

export function useTeam(id) {

    const [team, setTeam] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadTeam() {

            try {

                setLoading(true);

                const data = await getTeamById(id);

                setTeam(data);

                setError("");

            }
            catch (err) {

                setError(
                    err.message ??
                    "Failed to load team."
                );

            }
            finally {

                setLoading(false);

            }

        }

        if (id) {

            loadTeam();

        }

    }, [id]);

    return {

        team,

        loading,

        error

    };

}