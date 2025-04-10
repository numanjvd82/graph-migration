import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEditCompany } from "@/hooks/companies/useEditCompany";
import { Company } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface CompanyEditDialogProps {
  company: Company;
  refetch: () => void;
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  city: z
    .string()
    .min(3, "City is required")
    .max(50, "City must be less than 50 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export const EditCompany: React.FC<CompanyEditDialogProps> = ({
  company,
  refetch,
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company.name,
      city: company.city,
    },
  });
  const { editCompany, loading } = useEditCompany();

  const id = company.id;

  const handleSave = async (data: FormValues) => {
    if (!data) return;
    try {
      await editCompany({ ...data, id });
      form.reset();
      refetch();
      toast.success("Company updated successfully");
    } catch (error: any) {
      toast.error("Error updating company");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Edit Company <Edit className="h-4 w-4" />{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Company</DialogTitle>
          <DialogDescription>
            Update company details and save changes.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSave)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={loading} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
