import { useListCompanies } from "@/hooks/companies/useListCompanies";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  form: UseFormReturn<any>;
};

export const CompanySelect: React.FC<Props> = ({ form }) => {
  const { data, error, loading } = useListCompanies();

  const selectedCompany = data?.companies?.find(
    (company) => String(company.id) === String(form.getValues("company_id"))
  );

  if (loading) {
    return <p>Loading companies...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <FormField
      control={form.control}
      name="company_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Company</FormLabel>
          <Select
            value={field.value ? String(field.value) : ""}
            onValueChange={(value) => field.onChange(Number(value))}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data?.companies?.map((company) => (
                <SelectItem key={company.id} value={String(company.id)}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            You can manage companies in your{" "}
            <Link to="/companies">company settings</Link>.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
