import TableRow from "./TableRow";

import "./Table.css";

function Table({
    columns,
    data,
    onRowClick,
    emptyMessage = "No data available."
}) {

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

                    </tr>

                </thead>

                <tbody>

                    {data.length === 0 ? (

                        <tr>

                            <td
                                className="table-empty"
                                colSpan={columns.length}
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
                            />

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default Table;