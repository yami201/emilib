"use server"

import AddLoan from "@/components/add-inputs/AddLoan";
import Table from "@/components/ui/Table";
import columns, { LOAN_STATUS } from "@/utils/columns/loans";

// const data = [
//     {
//         number: '1',
//         title: 'The Great Gatsby',
//         member: 'John Doe',
//         startingDate: '2021-01-01',
//         endingDate: '2021-01-15',
//         status: LOAN_STATUS.active
//     },
//     {
//         number: '2',
//         title: 'The Great Gatsby',
//         member: 'John Doe',
//         startingDate: '2021-01-01',
//         endingDate: '2021-01-15',
//         status: LOAN_STATUS.overdure,
//     },
//     {
//         number: '3',
//         title: 'The Great Gatsby',
//         member: 'John Doe',
//         startingDate: '2021-01-01',
//         endingDate: '2021-01-15',
//         status: LOAN_STATUS.done
//     }
// ]

const getLoans = async () => {
    const response = await fetch(process.env.URL + '/api/loan',
        {
            next: {
                tags: ['loans']
            }
        }
    )
    const json = await response.json()
    return json.map(
        loan => ({
            number : loan._id,
            member: loan.member,
            title: loan.book,
            startingDate: loan.startingDate,
            endingDate: loan.endingDate,
            status : LOAN_STATUS[loan.statusLoan]
        })
    )
}


const Loans = async () => {
    const data = await getLoans()
    return ( 
        <div>
            <div className="w-full flex justify-end mb-4">
                <AddLoan />
            </div>
            <Table columns={columns} data={data}/>
        </div>
     );
}
 
export default Loans;