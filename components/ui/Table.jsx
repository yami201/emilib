const Table = ({ columns, data }) => {
    return (
        <table className="w-full rounded-lg">
            <thead className="bg-slate-50 shadow">
                <tr>
                    {columns.map((column, index) => (
                        <th className="px-3 py-4 text-start text-test" key={index}>{column.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="border border-slate-100">
                {data.map((row, index) => (
                    <tr key={index} className="border border-b border-slate-100">
                        {columns.map((column, index) => (
                            <td key={index} className={`px-3 py-4 
                                ${column?._cell_style} 
                                ${row?._row_style} 
                                ${row?._cell_style && row?._cell_style[column.dataIndex]}`}
                            >{column.cell ? column.cell(row) : row[column.dataIndex]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;