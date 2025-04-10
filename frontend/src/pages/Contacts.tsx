import { DataTable } from "@/components/DataTable";
import Header from "@/components/Header";
import { CreateContact } from "@/components/pages/Contacts/CreateContact";
import { DeleteContact } from "@/components/pages/Contacts/DeleteContact";
import { EditContact } from "@/components/pages/Contacts/EditContact";
import { Input } from "@/components/ui/input";
import { useListCompanies } from "@/hooks/companies/useListCompanies";
import { useListContacts } from "@/hooks/contacts/useListContacts";
import { Contact } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Toaster } from "sonner";

export default function Contacts() {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const { data: list } = useListCompanies();
  const { data, error, loading, refetch } = useListContacts({
    name,
    company: companyName,
  });

  const columns: ColumnDef<Contact>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "company_id",
      header: "Company ID",
      cell: ({ row }) => {
        const company = list?.companies.find(
          (company) => company.id === row.original.company_id
        );
        return <span>{company ? company.name : "No Company"}</span>;
      },
    },
    {
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }) => (
        <div className="space-x-2">
          <DeleteContact id={row.original.id} refetch={refetch} />
          <EditContact contact={row.original} refetch={refetch} />
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

    if (!data || data.total_contacts === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="leading-7 [&:not(:first-child)]:mt-6 mt-4">
            No contacts found. Please create a contact.
          </p>
        </div>
      );
    }

    return <DataTable columns={columns} data={data.contacts} />;
  };

  return (
    <div className="h-screen">
      <Header />
      <div className="w-full border rounded-md p-4">
        <Toaster />
        <h1 className="text-2xl font-bold mb-4">Contacts</h1>
        <div className="mb-4">
          <p className="leading-7">Here you can manage your contacts.</p>
          <p className="leading-7">
            You can create, edit, and delete contacts.
          </p>
        </div>

        <header className="flex justify-between items-center mb-4 space-x-4">
          <div className="flex space-x-4 w-full max-w-4xl">
            <Input
              type="text"
              placeholder="Search for a contact..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full max-w-xs"
            />
            <Input
              type="text"
              placeholder="Search for a company..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full max-w-xs"
            />
          </div>
          <CreateContact refetch={refetch} />
        </header>

        <p className="leading-7 mb-4 text-left">
          {data?.total_contacts}
          {data?.total_contacts === 1 ? " contact" : " contacts"} found.
        </p>

        <Table />
      </div>
    </div>
  );
}
