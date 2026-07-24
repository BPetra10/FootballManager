import { useEffect, useState } from "react";

import { getLeagueTable } from "../../services/leagueService";

export function useLeagueTable(id) {

    const [table, setTable] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadTable() {

            try {

                setLoading(true);

                const data = await getLeagueTable(id);

                setTable(data);

                setError("");

            }
            catch (err) {

                setError(
                    err.message ??
                    "Failed to load league table."
                );

            }
            finally {

                setLoading(false);

            }

        }

        if (id) {

            loadTable();

        }

    }, [id]);

    return {

        table,

        loading,

        error

    };

}