import api from "@/lib/axios";
import { Company } from "@/lib/types";
import { useMutation } from "react-query";

type ReturnType = Omit<Company, "name" | "city">;

export async function editCompany(company: Company): Promise<ReturnType> {
  try {
    const res = await api.put(`/companies/${company.id}`, company);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export function useEditCompany() {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: editCompany,
  });

  return {
    editCompany: mutateAsync,
    loading: isLoading,
  };
}
