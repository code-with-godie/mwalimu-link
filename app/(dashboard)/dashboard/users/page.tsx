import { DataTable } from "@/components/datatable/dataTable";
import { DataTableSkeleton } from "@/components/skeletons/dataSkeleton";
import { columns } from "@/components/user/userColumns";
import { listAllUsers, makAdmin } from "@/lib/actions/auth";
import { Suspense } from "react";

const Users = async () => {
  const users = listAllUsers();
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Payments</h1>
      </div>
      <Suspense fallback={<DataTableSkeleton />}>
        <DataTable columns={columns} data={users} />
      </Suspense>
    </div>
  );
};

export default Users;
