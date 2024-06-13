import Image from "next/image"

const columns = [
    {
        title: 'ISBN',
        dataIndex: 'isbn'
    },
    {
        title: 'Book',
        cell: (row) => (
            <div className="flex items-center gap-4">
                <Image 
                    src={row.cover}
                    width={60}
                    height={100}
                    className='rounded-lg'
                    alt='book cover'
                />
                <span>{row.title}</span>
            </div>
        )
    },
    {
        title: 'Authors',
        cell: (row) => (
            <div >
                {row.authors.map(author => (
                    <p key={author} className="mr-2">{author}</p>
                ))}
            </div>
        )
    },
    {
        title: 'Quantity',
        cell: (row) => (
            <div className="flex gap-2">
                <span>{row.quantity}</span> 
                /
                <span>{row.initialQuanity}</span>
            </div>
        )
    }
]

export default columns