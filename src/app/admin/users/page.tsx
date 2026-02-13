"use client"
import { columns } from "./columns"
import { DataTable } from "./dataTables"
import { useGetAllUsersQuery } from "@/redux/api/userApi"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export default function DemoPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetAllUsersQuery({ page, limit: 20 });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto py-10 bg-white rounded-2xl px-8 text-red-500">
        Error loading users. Please try again.
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 bg-white rounded-2xl px-8 ">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <DataTable columns={columns} data={data?.users || []} />
      {/* Add Pagination Controls if needed */}
    </div>
  )
}