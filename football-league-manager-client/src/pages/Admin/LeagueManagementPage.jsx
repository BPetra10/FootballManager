import { useEffect, useState } from "react";

import FootballLayout from "../../components/layout/FootballLayout/FootballLayout";

import Table from "../../components/common/Table/Table";
import TableActions from "../../components/common/Table/TableActions";

import Modal from "../../components/common/Modal/Modal";

import LeagueForm from "../../components/admin/forms/LeagueForm";

import { useLeagueForm } from "../../hooks/admin/useLeagueForm";

import {
    getLeagues,
    deleteLeague
} from "../../services/admin/adminLeagueService";

import stadium from "../../assets/images/home/stadium.jpg";

import "./LeagueManagementPage.css";

function LeagueManagementPage() {

    const [leagues, setLeagues] = useState([]);

    const [activeModal, setActiveModal] = useState(null);

    const [selectedLeague, setSelectedLeague] = useState(null);

    const loadLeagues = async () => {

        try {

            const data = await getLeagues();

            setLeagues(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        loadLeagues();

    }, []);

    const leagueForm = useLeagueForm(

        async () => {

            await loadLeagues();

            setActiveModal(null);
            setSelectedLeague(null);

        },

        selectedLeague

    );

    const handleCreate = () => {

        setSelectedLeague(null);
        setActiveModal("create");

    };

    const handleEdit = (league) => {

        setSelectedLeague(league);
        setActiveModal("edit");

    };

    const handleDelete = async (league) => {

        const confirmed = window.confirm(

            `Are you sure you want to delete "${league.name}"?`

        );

        if (!confirmed) {

            return;

        }

        try {

            await deleteLeague(league.id);

            await loadLeagues();

        }

        catch (error) {

            console.error(error);

            alert(
                error?.message ??
                "Failed to delete league."
            );

        }

    };

    const columns = [

        {
            key: "name",
            header: "League"
        },

        {
            key: "country",
            header: "Country"
        },

        {
            key: "maxTeams",
            header: "Maximum Teams"
        },

        {
            key: "actions",
            header: "Actions",
            render: league => (

                <TableActions
                    onEdit={() => handleEdit(league)}
                    onDelete={
                        league.currentTeams === 0
                            ? () => handleDelete(league)
                            : undefined
                    }
                />

            )
        }
    ];

    return (

        <>

            <FootballLayout
                background={stadium}
                title="League Management"
                subtitle="View, create and manage football leagues."
            >

                <section className="league-management">

                    <div className="league-management-header">

                        <button
                            type="button"
                            className="league-management-create"
                            onClick={handleCreate}
                        >

                            + Create League

                        </button>

                    </div>

                    <Table
                        columns={columns}
                        data={leagues}
                        emptyMessage="No leagues available."
                    />

                </section>

            </FootballLayout>

            <Modal
                open={activeModal !== null}
                onClose={() => {

                    setActiveModal(null);
                    setSelectedLeague(null);

                }}
            >

                {(activeModal === "create" ||
                    activeModal === "edit") && (

                        <LeagueForm
                            form={leagueForm}
                        />

                    )}

            </Modal>

        </>

    );

}

export default LeagueManagementPage;