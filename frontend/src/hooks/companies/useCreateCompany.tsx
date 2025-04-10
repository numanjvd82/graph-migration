import api from "@/lib/axios";
import { Company } from "@/lib/types";
import { useMutation } from "react-query";

type ReturnType = Omit<Company, "name" | "city">;
type CompanyInput = Omit<Company, "id">;
export async function createCompany(
  company: CompanyInput
): Promise<ReturnType> {
  try {
    const res = await api.post(`/companies`, company);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export function useCreateCompany() {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: createCompany,
  });

  return {
    createCompany: mutateAsync,
    loading: isLoading,
  };
}
