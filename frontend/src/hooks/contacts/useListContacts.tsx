import api from "@/lib/axios";
import { ContactResponse } from "@/lib/types";
import { useQuery } from "react-query";
import { toast } from "sonner";

type GetContactFilter = {
  name?: string;
  company?: string;
};

export async function getContacts(
  filter: GetContactFilter = {}
): Promise<ContactResponse> {
  try {
    const res = await api.get("/contacts", { params: filter });
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export function useListContacts(filter: GetContactFilter) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["contacts", filter],
    queryFn: () => getContacts(filter),
    refetchOnWindowFocus: false,

    onError: (error: any) => {
      toast.error(`Error fetching contacts: ${error.message}`, {
        duration: 5000,
        description: "Please try again later.",
      });
    },
  });

  return {
    data,
    loading: isLoading,
    error,
    refetch,
  };
}
