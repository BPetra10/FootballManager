import {
    FaPlus,
    FaUserTie,
    FaChevronRight
} from "react-icons/fa6";

import "./QuickActions.css";

function QuickActions({ onOpenModal }) {

    const actions = [

        {
            title: "Create League",
            icon: <FaPlus />,
            modal: "league"
        },

        {
            title: "Create Team",
            icon: <FaPlus />,
            modal: "team"
        },

        {
            title: "Assign Manager",
            icon: <FaUserTie />,
            modal: "assignManager"
        }

    ];

    return (

        <section className="quick-actions">

            <h2>Quick Actions</h2>

            <div className="quick-actions-grid">

                {

                    actions.map(action => (

                        <button
                            key={action.title}
                            className="quick-action-card"
                            onClick={() => onOpenModal(action.modal)}
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