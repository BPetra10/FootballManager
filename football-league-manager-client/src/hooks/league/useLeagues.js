import { useEffect, useState } from "react";

import { getAllLeagues } from "../../services/leagueService";

export function useLeagues() {

    const [leagues, setLeagues] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadLeagues() {

            try {

                const data =
                    await getAllLeagues();

                setLeagues(data);

            }
            catch (error) {

                setError(

                    error?.message ??
                    "Failed to load leagues."

                );

            }
            finally {

                setLoading(false);

            }

        }

        loadLeagues();

    }, []);

    return {

        leagues,

        loading,

        error,

        reload: async () => {

            setLoading(true);

            setError("");

            try {

                const data =
                    await getAllLeagues();

                setLeagues(data);

            }
            catch (error) {

                setError(

                    error?.message ??
                    "Failed to load leagues."

                );

            }
            finally {

                setLoading(false);

            }

        }

    };

}