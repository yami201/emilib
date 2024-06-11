import LoanEdit from "@/components/LoanEdit"
import DeleteLoan from "@/components/delete-inputs/DeleteLoan"

export const LOAN_STATUS = {
    active: 'Active',
    overdure: 'Overdure',
    done: 'Done'
}
const STATUS_CLASSES = {
    [LOAN_STATUS.active]: "status-span-active",
    [LOAN_STATUS.overdure] : "status-span-overdure",
    [LOAN_STATUS.done]: "status-span-done"
}



const columns = [
    {
        title: 'Loan ID',
        dataIndex: 'number',
    },
    {
        title: 'Book Title',
        dataIndex: 'title',
    },
    {
        title: 'Member',
        dataIndex: 'member',
    },
    {
        title: 'Starting Date',
        dataIndex: 'startingDate',
    },
    {
        title: 'Ending Date',
        dataIndex: 'endingDate',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        cell: (row) => {
            return (
                <span className={`px-2 flex py-1 rounded-full border ${STATUS_CLASSES[row.status]}`}>
                    &#x2022; 
                    {row.status}
                </span>
            )
        },
        _cell_style : "flex items-center"
        
    },
    {
        title: 'Actions',
        cell: (row) => {
            return (
                <div className="flex items-center gap-2">
                    <LoanEdit loan={row}/>
                    <DeleteLoan loan={row}/>
                </div>
            )
        }
    }
]

export default columns;