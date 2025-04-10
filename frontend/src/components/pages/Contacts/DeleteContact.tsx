import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteContact } from "@/hooks/contacts/useDeleteContact";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type DeleteDialogProps = {
  id: number;
  refetch: () => void;
};

export const DeleteContact: React.FC<DeleteDialogProps> = ({ id, refetch }) => {
  const [open, setOpen] = useState(false);
  const { deleteContact, loading } = useDeleteContact();

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteContact(id);
      toast.success("Contact deleted successfully");
      refetch();
      setOpen(false);
    } catch (error: any) {
      toast.error("Error deleting contact");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            contact and remove all associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
