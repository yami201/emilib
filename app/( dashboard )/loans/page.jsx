import AddLoan from "@/components/add-inputs/AddLoan";
import Table from "@/components/ui/Table";
import columns, { LOAN_STATUS } from "@/utils/columns/loans";
const data = [
    {
        number: '1',
        title: 'The Great Gatsby',
        member: 'John Doe',
        startingDate: '2021-01-01',
        endingDate: '2021-01-15',
        status: LOAN_STATUS.active
    },
    {
        number: '2',
        title: 'The Great Gatsby',
        member: 'John Doe',
        startingDate: '2021-01-01',
        endingDate: '2021-01-15',
        status: LOAN_STATUS.overdure,
    },
    {
        number: '3',
        title: 'The Great Gatsby',
        member: 'John Doe',
        startingDate: '2021-01-01',
        endingDate: '2021-01-15',
        status: LOAN_STATUS.done
    }
]


const Loans = ({searchParams}) => {

    
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