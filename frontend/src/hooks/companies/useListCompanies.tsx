import api from "@/lib/axios";
import { CompanyResponse } from "@/lib/types";
import { useQuery } from "react-query";
import { toast } from "sonner";

export async function getCompanies(): Promise<CompanyResponse> {
  try {
    const res = await api.get("/companies");
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export function useListCompanies() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
    refetchOnWindowFocus: false,

    onError: (error: any) => {
      toast.error(`Error fetching companies: ${error.message}`, {
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
