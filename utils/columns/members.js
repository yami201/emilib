import Link from "next/link";
import Image from "next/image";
import MemberEdit from "@/components/MemberEdit";
import DeleteMember from "@/components/delete-inputs/DeleteMember";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Member",
    dataIndex: "member",
    cell: (row) => (
      <div className="flex items-center gap-4">
        <Image
          src={row.avatar}
          width={35}
          height={35}
          className="w-12 h-12 rounded-full"
          alt="avatar"
        />
        <span>{row.name}</span>
      </div>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
  },
  {
    title: "Total Loans",
    dataIndex: "loans",
    cell: (row) => (
      <Link href={`/loans`} className="cursor-pointer hover:text-primary">
        {row.loans}
      </Link>
    ),
  },
  {
    title: "Joining Date",
    dataIndex: "joiningDate",
  },
  {
    title: "Action",
    dataIndex: "action",
    cell: (row) => (
      <div className="flex gap-2">
        <MemberEdit member={row}/>
        <DeleteMember member={row}/>
      </div>
    ) ,
  },
];

export default columns;
