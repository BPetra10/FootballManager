import TableRow from "./TableRow";

import "./Table.css";

function Table({
    columns,
    data,
    onRowClick,
    actions,
    emptyMessage = "No data available."
}) {

    const hasActions = typeof actions === "function";

    return (

        <div className="table-wrapper">

            <table className="table">

                <thead>

                    <tr>

                        {columns.map(column => (

                            <th key={column.key}>
                                {column.header}
                            </th>

                        ))}

                        {hasActions && (

                            <th className="table-actions-header">
                                Actions
                            </th>

                        )}

                    </tr>

                </thead>

                <tbody>

                    {data.length === 0 ? (

                        <tr>

                            <td
                                className="table-empty"
                                colSpan={
                                    columns.length +
                                    (hasActions ? 1 : 0)
                                }
                            >
                                {emptyMessage}
                            </td>

                        </tr>

                    ) : (

                        data.map(row => (

                            <TableRow
                                key={row.id}
                                row={row}
                                columns={columns}
                                onRowClick={onRowClick}
                                actions={actions}
                            />

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default Table;