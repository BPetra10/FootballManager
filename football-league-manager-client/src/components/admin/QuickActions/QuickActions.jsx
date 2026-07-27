import { useNavigate } from "react-router-dom";

import {
    FaPlus,
    FaUserTie,
    FaChevronRight
} from "react-icons/fa6";

import "./QuickActions.css";

function QuickActions() {

    const navigate = useNavigate();

    const actions = [

        {
            title: "Create League",
            icon: <FaPlus />,
            onClick: () => navigate("/admin/leagues/create")
        },

        {
            title: "Create Team",
            icon: <FaPlus />,
            onClick: () => navigate("/admin/teams/create")
        },

        {
            title: "Assign Manager",
            icon: <FaUserTie />,
            onClick: () => navigate("/admin/managers")
        }

    ];

    return (

        <section className="quick-actions">

            <h2>

                Quick Actions

            </h2>

            <div className="quick-actions-grid">

                {

                    actions.map(action => (

                        <button
                            key={action.title}
                            className="quick-action-card"
                            onClick={action.onClick}
                        >

                            <div className="quick-action-left">

                                <div className="quick-action-icon">

                                    {action.icon}

                                </div>

                                <span>

                                    {action.title}

                                </span>

                            </div>

                            <FaChevronRight className="quick-action-arrow" />

                        </button>

                    ))

                }

            </div>

        </section>

    );

}

export default QuickActions;