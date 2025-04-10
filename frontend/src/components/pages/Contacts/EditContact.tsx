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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEditContact } from "@/hooks/contacts/useEditContact";
import { Contact } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useListCompanies } from "@/hooks/companies/useListCompanies";
import { Link } from "react-router-dom";

interface ContactEditDialogProps {
  contact: Contact;
  refetch: () => void;
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  phone: z
    .string()
    .min(10, "Phone number is required")
    .max(15, "Phone number must be valid"),
  city: z
    .string()
    .min(3, "City is required")
    .max(50, "City must be less than 50 characters"),
  company_id: z
    .number({
      message: "Company id is required",
    })
    .int()
    .positive("Company is required"),
});

type FormValues = z.infer<typeof formSchema>;

export const EditContact: React.FC<ContactEditDialogProps> = ({
  contact,
  refetch,
}) => {
  const [open, setOpen] = useState(false);
  const { data } = useListCompanies();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: contact.name,
      phone: contact.phone,
      city: contact.city,
      company_id: contact.company_id,
    },
  });
  const { editContact, loading } = useEditContact();

  const id = contact.id;

  const handleSave = async (data: FormValues) => {
    if (!data) return;
    try {
      await editContact({ ...data, id });
      form.reset();
      refetch();
      toast.success("Contact updated successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error("Error updating contact");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Edit Contact <Edit className="h-4 w-4" />{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
          <DialogDescription>
            Update contact details and save changes.
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
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

            <FormField
              control={form.control}
              name="company_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={String(field.value)}
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
