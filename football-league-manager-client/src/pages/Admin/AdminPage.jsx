import { useState } from "react";

import FootballLayout from "../../components/layout/FootballLayout/FootballLayout";

import DashboardStats from "../../components/admin/DashboardStats/DashboardStats";
import QuickActions from "../../components/admin/QuickActions/QuickActions";
import ManagementPages from "../../components/admin/ManagementPages/ManagementPages";

import Modal from "../../components/common/Modal/Modal";
import FormCard from "../../components/common/Form/FormCard";

import Input from "../../components/common/Input/Input";
import Select from "../../components/common/Select/Select";
import Button from "../../components/common/Button/Button";
import ErrorAlert from "../../components/common/ErrorAlert/ErrorAlert";

import { useAdminData } from "../../hooks/admin/useAdminData";
import { useLeagueForm } from "../../hooks/admin/useLeagueForm";
import { useTeamForm } from "../../hooks/admin/useTeamForm";

import LeagueForm from "../../components/admin/forms/LeagueForm";
import TeamForm from "../../components/admin/forms/TeamForm";

import stadium from "../../assets/images/home/stadium.jpg";

function AdminPage() {

    const [activeModal, setActiveModal] = useState(null);

    const leagueForm = useLeagueForm(async () => {

        await adminData.refresh();

        setActiveModal(null);

    });

    const teamForm = useTeamForm(async () => {

        await adminData.refresh();

        setActiveModal(null);
    });

    const adminData = useAdminData();

    return (

        <>

            <FootballLayout
                background={stadium}
                title="Admin Dashboard"
            >

                <DashboardStats
                    stats={adminData.dashboard}
                />

                <QuickActions
                    onOpenModal={setActiveModal}
                />

                <ManagementPages />

            </FootballLayout>

            <Modal
                open={activeModal !== null}
                onClose={() => setActiveModal(null)}
            >

                {activeModal === "league" && (
                    <LeagueForm
                        form={leagueForm}
                    />
                )}

                {activeModal === "team" && (
                    <TeamForm
                        form={teamForm}
                        leagues={adminData.leagues}
                        managers={adminData.availableManagers}
                    />
                )}


                {activeModal === "assignManager" && (

                    <FormCard
                        title="Assign Manager"
                        subtitle="Assign a manager to a team."
                    >

                        {/* TODO */}

                    </FormCard>

                )}

            </Modal>

        </>

    );

}

export default AdminPage;