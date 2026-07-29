import { useEffect, useState } from "react";

import { getLeagues } from "../../services/admin/adminLeagueService";
import { getAvailableManagers } from "../../services/admin/adminManagerService";

export function useTeamOptions() {

    const [leagues, setLeagues] = useState([]);

    const [managers, setManagers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadData() {

            try {

                const [leagueData, managerData] = await Promise.all([

                    getLeagues(),
                    getAvailableManagers()

                ]);

                setLeagues(leagueData);

                setManagers(managerData);

            }

            catch (error) {

                setError(

                    error?.message ??
                    "Failed to load form data."

                );

            }

            finally {

                setLoading(false);

            }

        }

        loadData();

    }, []);

    return {

        leagues,
        managers,

        loading,
        error

    };

}