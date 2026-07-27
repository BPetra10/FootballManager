import { useNavigate } from "react-router-dom";

import {
    FaClipboardList,
    FaShieldHalved,
    FaUsers,
    FaCalendarDays,
    FaArrowUpRightFromSquare
} from "react-icons/fa6";

import "./ManagementPages.css";

function ManagementPages() {

    const navigate = useNavigate();

    const pages = [

        {
            title: "League Management",
            description: "View, create and edit leagues",
            icon: <FaClipboardList />,
            route: "/admin/leagues"
        },

        {
            title: "Team Management",
            description: "View, create and edit teams",
            icon: <FaShieldHalved />,
            route: "/admin/teams"
        },

        {
            title: "Manager Management",
            description: "View managers and assign teams",
            icon: <FaUsers />,
            route: "/admin/managers"
        },

        {
            title: "Match Management",
            description: "View and manage all matches",
            icon: <FaCalendarDays />,
            route: "/admin/matches"
        }

    ];

    return (

        <section className="management-pages">

            <h2>

                Management Pages

            </h2>

            <div className="management-grid">

                {

                    pages.map(page => (

                        <div
                            key={page.title}
                            className="management-card"
                            onClick={() => navigate(page.route)}
                        >

                            <div className="management-arrow">

                                <FaArrowUpRightFromSquare />

                            </div>

                            <div className="management-icon">

                                {page.icon}

                            </div>

                            <h3>

                                {page.title}

                            </h3>

                            <p>

                                {page.description}

                            </p>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default ManagementPages;