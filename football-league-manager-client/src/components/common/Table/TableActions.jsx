import {
    FaPen,
    FaTrash
} from "react-icons/fa6";

import "./TableActions.css";

function TableActions({
    onEdit,
    onDelete
}) {

    return (

        <div className="table-actions">

            {onEdit && (

                <button
                    type="button"
                    className="table-action-button table-action-edit"
                    onClick={onEdit}
                    aria-label="Edit"
                >

                    <FaPen />

                </button>

            )}

            {onDelete && (

                <button
                    type="button"
                    className="table-action-button table-action-delete"
                    onClick={onDelete}
                    aria-label="Delete"
                >

                    <FaTrash />

                </button>

            )}

        </div>

    );

}

export default TableActions;