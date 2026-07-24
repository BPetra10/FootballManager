function TableRow({
    row,
    columns,
    onRowClick
}) {

    const clickable = typeof onRowClick === "function";

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

        </tr>

    );

}

export default TableRow;