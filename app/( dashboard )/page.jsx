import AddBook from "@/components/add-inputs/AddBook";
import columns from "@/utils/columns/books";
import Table from "@/components/ui/Table";


// const data = [
//   {
//     title: "The Great Gatsby",
//     author : "F. Scott Fitzgerald",
//     cover: "/book.png",
//     id:1,
//     quantity:0,
//     initialQuantity: 10,
//   },
//   {
//     title: 'hello',
//     author : 'world',
//     cover: '/book.png',
//     id:2,
//     quantity: 2,
//     initialQuantity: 9,
//   },
//   {
//     title: 'hello',
//     author : 'world',
//     cover: '/book.png',
//     id:2,
//     quantity: 2,
//     initialQuantity: 9,
//   },
//   {
//     title: 'hello',
//     author : 'world',
//     cover: '/book.png',
//     id:2,
//     quantity: 2,
//     initialQuantity: 9,
//   },
//   {
//     title: 'hello',
//     author : 'world',
//     cover: '/book.png',
//     id:2,
//     quantity: 2,
//     initialQuantity: 9,
//   },
//   {
//     title: 'hello',
//     author : 'world',
//     cover: '/book.png',
//     id:2,
//     quantity: 2,
//     initialQuantity: 9,
//   },
//   {
//     title: 'hello',
//     author : 'world',
//     cover: '/book.png',
//     id:2,
//     quantity: 2,
//     initialQuantity: 9,
//   },
//   {
//     title: "The Great Gatsby",
//     author : "F. Scott Fitzgerald",
//     cover: "/book.png",
//     id:1,
//     quantity:0,
//     initialQuantity: 10,
//   },
//   {
//     title: 'hello',
//     author : 'world',
//     cover: '/book.png',
//     id:2,
//     quantity: 2,
//     initialQuantity: 9,
//   },
//   {
//     title: 'hello',
//     author : 'world',
//     cover: '/book.png',
//     id:2,
//     quantity: 2,
//     initialQuantity: 9,
//   },
//   {
//     title: 'hello',
//     author : 'world',
//     cover: '/book.png',
//     id:2,
//     quantity: 2,
//     initialQuantity: 9,
//   },
//   {
//     title: 'hello',
//     author : 'world',
//     cover: '/book.png',
//     id:2,
//     quantity: 2,
//     initialQuantity: 9,
//   },
//   {
//     title: 'hello',
//     author : 'world',
//     cover: '/book.png',
//     id:2,
//     quantity: 2,
//     initialQuantity: 9,
//   },
//   {
//     title: 'hello',
//     author : 'world',
//     cover: '/book.png',
//     id:2,
//     quantity: 2,
//     initialQuantity: 9,
//   },

// ]

const getBooks = async () => {
  const response = await fetch(process.env.URL + '/api/book',{
    next: {
      tags: ['books']
    }
  })

  const json = await response.json()
  return json.map(
    book => ({...book, cover: "data:image/png;base64,"+book.cover})
  )
}

export default async function Home() {
  const data = await getBooks()
  return (
    <div className="w-full">
      <div className="w-full flex justify-end">
        <AddBook />
      </div>
      <Table columns={columns} data={data}/>
    </div>
  );
}
