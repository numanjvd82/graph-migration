import api from "@/lib/axios";
import { Contact } from "@/lib/types";
import { useMutation } from "react-query";

type ContactInput = Omit<Contact, "id">;

export async function createContact(contact: ContactInput): Promise<Contact> {
  try {
    const res = await api.post(`/contacts`, contact);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export function useCreateContact() {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: createContact,
  });

  return {
    createContact: mutateAsync,
    loading: isLoading,
  };
}
