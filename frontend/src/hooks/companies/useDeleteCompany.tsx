import api from "@/lib/axios";
import { useMutation } from "react-query";

async function deleteCompany(id: number) {
  try {
    const res = await api.delete(`/companies/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error("Error deleting company");
  }
}

export function useDeleteCompany() {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (id: number) => deleteCompany(id),
  });

  return { deleteCompany: mutateAsync, loading: isLoading };
}
