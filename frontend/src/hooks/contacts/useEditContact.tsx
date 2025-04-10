import api from "@/lib/axios";
import { Contact } from "@/lib/types";
import { useMutation } from "react-query";

type ReturnType = Omit<Contact, "name" | "phone" | "city" | "companyId">;

export async function editContact(contact: Contact): Promise<ReturnType> {
  try {
    const res = await api.put(`/contacts/${contact.id}`, contact);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export function useEditContact() {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: editContact,
  });

  return {
    editContact: mutateAsync,
    loading: isLoading,
  };
}
