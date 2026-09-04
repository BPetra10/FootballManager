function TableRow({
    row,
    columns,
    onRowClick,
    actions
}) {

    const clickable =
        typeof onRowClick === "function";

    const hasActions =
        typeof actions === "function";

    return (

        <tr
            className={
                clickable
                    ? "table-clickable"
                    : ""
            }
            onClick={
                clickable
                    ? () => onRowClick(row)
                    : undefined
            }
        >

            {columns.map((column, index) => (

                <td
                    key={column.key}
                    data-label={column.header}
                    className={
                        index === 0
                            ? "table-primary-cell"
                            : ""
                    }
                >

                    {column.render
                        ? column.render(row)
                        : row[column.key]}

                </td>

            ))}

            {hasActions && (

                <td
                    className="table-actions-cell"
                    data-label="Actions"
                    onClick={event => event.stopPropagation()}
                >

                    {actions(row)}

                </td>

            )}

        </tr>

    );

}

export default TableRow;