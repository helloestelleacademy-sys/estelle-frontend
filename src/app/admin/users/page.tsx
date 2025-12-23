import { UsersDetails } from "@/constants"
import { columns, Users } from "./columns"
import { DataTable } from "./dataTables"

async function getData(): Promise<Users[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: 'Enoch',
      email: "m@example.com",
      phoneNo: "123-456-7890",
      address: "123 Main St, City, Country",
    },
    {
      id: "728ed52f",
      name: 'Enoch',
      email: "m@example.com",
      phoneNo: "123-456-7890",
      address: "123 Main St, City, Country",
    },
    {
      id: "728ed52f",
      name: 'Enoch',
      email: "m@example.com",
      phoneNo: "123-456-7890",
      address: "123 Main St, City, Country",
    },
    {
      id: "728ed52f",
      name: 'Enoch',
      email: "m@example.com",
      phoneNo: "123-456-7890",
      address: "123 Main St, City, Country",
    },

  ]
}

export default async function DemoPage() {
  // const data = await getData()

  return (
    <div className="container mx-auto py-10 bg-white rounded-2xl px-8 ">
      <DataTable columns={columns} data={UsersDetails} />
    </div>
  )
}