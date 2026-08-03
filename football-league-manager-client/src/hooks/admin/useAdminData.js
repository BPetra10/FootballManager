import { useCallback, useEffect, useState } from "react";

import { getDashboard } from "../../services/admin/adminService";
import { getLeagues } from "../../services/admin/adminLeagueService";
import {
    getAvailableManagers,
    getTeamsWithoutManager
} from "../../services/admin/adminManagerService";

export function useAdminData() {

    const [dashboard, setDashboard] = useState(null);

    const [leagues, setLeagues] = useState([]);

    const [availableManagers, setAvailableManagers] = useState([]);

    const [teamsWithoutManager, setTeamsWithoutManager] = useState([]);

    const refresh = useCallback(async () => {

        try {

            const [

                dashboardData,
                leagueData,
                managerData,
                teamData

            ] = await Promise.all([

                getDashboard(),
                getLeagues(),
                getAvailableManagers(),
                getTeamsWithoutManager()

            ]);

            setDashboard(dashboardData);

            setLeagues(leagueData);

            setAvailableManagers(managerData);

            setTeamsWithoutManager(teamData);

        }

        catch (error) {

            console.error(error);

        }

    }, []);

    useEffect(() => {

        refresh();

    }, [refresh]);

    return {

        dashboard,

        leagues,

        availableManagers,

        teamsWithoutManager,

        refresh

    };

}