import AddAuthor from "@/components/add-inputs/AddAuthor";
import Table from "@/components/ui/Table";
import columns from "@/utils/columns/authors";
// const data = [
//     {
//         id : 1,
//         name : 'John Doe',
//         avatar : '/book.png',
//         books: 5,
//         dateAdded: '2021-01-01'
//     },
//     {
//         id : 2,
//         name : 'John Doe',
//         avatar : '/book.png',
//         books: 5,
//         dateAdded: '2021-01-01'
//     },
//     {
//         id : 4,
//         name : 'John Doe',
//         avatar : '/book.png',
//         books: 5,
//         dateAdded: '2021-01-01'
//     },
//     {
//         id : 7,
//         name : 'John Doe',
//         avatar : '/book.png',
//         books: 5,
//         dateAdded: '2021-01-01'
//     },
// ]

const getAuthors = async () => {
    const response = await fetch(process.env.URL + '/api/author', {
        next: {
            tags: ['authors']
        }
    })
    const json = await response.json()

    return json.map(
        author => ({...author, avatar : "data:image/png;base64,"+author.avatar})
    )
}

const Authors = async () => {
    const data = await getAuthors()
    return ( 
        <div>
            <div className="flex justify-end w-full mb-4">
                <AddAuthor />

            </div>
            <Table columns={columns} data={data}/>
        </div>
     );
}
 
export default Authors;