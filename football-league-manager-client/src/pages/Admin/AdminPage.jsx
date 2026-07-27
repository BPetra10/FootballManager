import FootballLayout from "../../components/layout/FootballLayout/FootballLayout";

import DashboardStats from "../../components/admin/DashboardStats/DashboardStats";
import QuickActions from "../../components/admin/QuickActions/QuickActions";
import ManagementPages from "../../components/admin/ManagementPages/ManagementPages";

import stadium from "../../assets/images/home/stadium.jpg";

function AdminPage() {

    return (

        <FootballLayout
            background={stadium}
            title="Admin Dashboard"
            titleStyle={{ marginBottom: "16px" }}
        >
            <DashboardStats />

            <QuickActions />

            <ManagementPages />

        </FootballLayout>

    );

}

export default AdminPage;