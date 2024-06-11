import columns from "@/utils/columns/members";
import Table from "@/components/ui/Table";
import AddMember from "@/components/add-inputs/AddMember";

const data = [
    {
        id: 1,
        name: "John Doe",
        email: "example.com",
        numero: "08012345678",
        loans: 2,
        joiningDate: "12/12/2021",
        avatar : '/book.png',
    },
    {
        id : 2,
        name : "Jane Doe",
        email : "example.com",
        numero : "08012345678",
        loans : 2,
        joiningDate : "12/12/2021",
        avatar : '/book.png',
    }
]

const Members = () => {
    return ( 
        <div>
            <div className="w-full flex justify-end mb-4">
                <AddMember />
            </div>
            <Table columns={columns} data={data} />
        </div>
     );
}
 
export default Members;