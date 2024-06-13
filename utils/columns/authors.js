import Link from "next/link";
import Image from "next/image";
import AuthorEdit from "@/components/AuthorEdit";
import DeleteAuthor from "@/components/delete-inputs/DeleteAuthor";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Author",
    cell: (row) => (
      <div className="flex items-center">
        <Image src={row.avatar} width={40} height={40} className="w-12 h-12 rounded-full"  alt="avatar"/>
        <span>{row.name}</span>
      </div>
    ),
  },
  {
    title: "Number of books",
    dataIndex: "books",
    cell: (row) => (
      <Link href={`/books`} className="cursor-pointer hover:text-primary">
        {row.books}
      </Link>
    ),
  },
  {
    title: "Date added",
    dataIndex: "dateAdded",
  },
  {
    title: "Action",
    dataIndex: "action",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <AuthorEdit author={row} />
        <DeleteAuthor author={row} />
      </div>
    ),
  },
];

export default columns;
