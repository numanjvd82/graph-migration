import { DataTable } from "@/components/DataTable";
import Header from "@/components/Header";
import { CreateCompany } from "@/components/pages/Companies/CreateCompany";
import { DeleteCompany } from "@/components/pages/Companies/DeleteCompany";
import { EditCompany } from "@/components/pages/Companies/EditCompany";
import { Input } from "@/components/ui/input";
import { useListCompanies } from "@/hooks/companies/useListCompanies";
import { Company } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Toaster } from "sonner";

export default function Companies() {
  const { data, error, loading, refetch } = useListCompanies();

  const columns: ColumnDef<Company>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }) => (
        <div className="space-x-2">
          <DeleteCompany id={row.original.id} refetch={refetch} />

          <EditCompany company={row.original} refetch={refetch} />
        </div>
      ),
    },
  ];

  const Table = () => {
    if (loading) {
      return <p className="leading-7 [&:not(:first-child)]:mt-6">Loading...</p>;
    }

    if (error) {
      return (
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Error: {error.message}
        </p>
      );
    }

    if (!data || data.total_companies === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="leading-7 [&:not(:first-child)]:mt-6 mt-4">
            No companies found. Please create a company.
          </p>
        </div>
      );
    }

    return <DataTable columns={columns} data={data.companies} />;
  };

  return (
    <>
      <Header />
      <div className="w-full  border rounded-md p-4">
        <Toaster />
        <h1 className="text-2xl font-bold mb-4">Companies</h1>
        <div className="mb-4">
          <p className="leading-7">Here you can manage your companies.</p>

          <p className="leading-7">
            You can create, edit, and delete companies.
          </p>
        </div>

        <header className="flex justify-between items-center mb-4 space-x-4">
          <div className="flex space-x-4 w-full max-w-4xl">
            <Input
              type="text"
              placeholder="Search for a Company"
              className="w-full max-w-xs"
            />
          </div>
          <CreateCompany refetch={refetch} />
        </header>

        <p className="leading-7 mb-4 text-left">
          {data?.total_companies}
          {data?.total_companies === 1 ? " company" : " companies"} found.
        </p>

        <Table />
      </div>
    </>
  );
}
