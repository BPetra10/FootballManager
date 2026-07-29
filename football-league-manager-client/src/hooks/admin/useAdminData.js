import { useCallback, useEffect, useState } from "react";

import { getDashboard } from "../../services/admin/adminService";
import { getLeagues } from "../../services/admin/adminLeagueService";
import { getTeams } from "../../services/admin/adminTeamService";
import { getAvailableManagers } from "../../services/admin/adminManagerService";

export function useAdminData() {

    const [dashboard, setDashboard] = useState(null);

    const [leagues, setLeagues] = useState([]);

    const [teams, setTeams] = useState([]);

    const [availableManagers, setAvailableManagers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const refresh = useCallback(async () => {

        setLoading(true);

        setError("");

        try {

            const [

                dashboardData,
                leagueData,
                teamData,
                managerData

            ] = await Promise.all([

                getDashboard(),
                getLeagues(),
                getTeams(),
                getAvailableManagers()

            ]);

            setDashboard(dashboardData);

            setLeagues(leagueData);

            setTeams(teamData);

            setAvailableManagers(managerData);

        }

        catch (error) {

            setError(

                error?.message ??
                "Failed to load admin data."

            );

        }

        finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        refresh();

    }, [refresh]);

    return {

        dashboard,

        leagues,

        teams,

        availableManagers,

        loading,

        error,

        refresh

    };

}