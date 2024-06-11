import AddBook from "@/components/add-inputs/AddBook";
import BookItem from "@/components/BookItem";


const data = [
  {
    title: "The Great Gatsby",
    author : "F. Scott Fitzgerald",
    cover: "/book.png",
    id:1,
    quantity:0,
    initialQuantity: 10,
  },
  {
    title: 'hello',
    author : 'world',
    cover: '/book.png',
    id:2,
    quantity: 2,
    initialQuantity: 9,
  },
  {
    title: 'hello',
    author : 'world',
    cover: '/book.png',
    id:2,
    quantity: 2,
    initialQuantity: 9,
  },
  {
    title: 'hello',
    author : 'world',
    cover: '/book.png',
    id:2,
    quantity: 2,
    initialQuantity: 9,
  },
  {
    title: 'hello',
    author : 'world',
    cover: '/book.png',
    id:2,
    quantity: 2,
    initialQuantity: 9,
  },
  {
    title: 'hello',
    author : 'world',
    cover: '/book.png',
    id:2,
    quantity: 2,
    initialQuantity: 9,
  },
  {
    title: 'hello',
    author : 'world',
    cover: '/book.png',
    id:2,
    quantity: 2,
    initialQuantity: 9,
  },
  {
    title: "The Great Gatsby",
    author : "F. Scott Fitzgerald",
    cover: "/book.png",
    id:1,
    quantity:0,
    initialQuantity: 10,
  },
  {
    title: 'hello',
    author : 'world',
    cover: '/book.png',
    id:2,
    quantity: 2,
    initialQuantity: 9,
  },
  {
    title: 'hello',
    author : 'world',
    cover: '/book.png',
    id:2,
    quantity: 2,
    initialQuantity: 9,
  },
  {
    title: 'hello',
    author : 'world',
    cover: '/book.png',
    id:2,
    quantity: 2,
    initialQuantity: 9,
  },
  {
    title: 'hello',
    author : 'world',
    cover: '/book.png',
    id:2,
    quantity: 2,
    initialQuantity: 9,
  },
  {
    title: 'hello',
    author : 'world',
    cover: '/book.png',
    id:2,
    quantity: 2,
    initialQuantity: 9,
  },
  {
    title: 'hello',
    author : 'world',
    cover: '/book.png',
    id:2,
    quantity: 2,
    initialQuantity: 9,
  },

]



export default function Home() {
  
  return (
    <div className="w-full">
      <div className="w-full flex justify-end">
        <AddBook />
      </div>
      <ul className="mt-2 flex gap-4 flex-wrap">
        {
          data.map((book) => (
            <BookItem key={book.id} book={book} />
          ))
        }
      </ul>
    </div>
  );
}
