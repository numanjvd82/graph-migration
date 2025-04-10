import api from "@/lib/axios";
import { useMutation } from "react-query";

async function deleteContact(id: number) {
  try {
    const res = await api.delete(`/contacts/${id}`);
    return res.data;
  } catch (error: any) {
    throw new Error("Error deleting contact");
  }
}

export function useDeleteContact() {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (id: number) => deleteContact(id),
  });

  return { deleteContact: mutateAsync, loading: isLoading };
}
