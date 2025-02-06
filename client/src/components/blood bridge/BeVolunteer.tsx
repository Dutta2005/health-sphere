import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { api } from "../../api/api";
import { useToast } from "../../hooks/use-toast";
import { X } from "lucide-react";

export default function BeVolunteer({ id }: { id: string }) {
  const { toast } = useToast();
  const handleSubmit = async (canShare: boolean) => {
    try {
      const res = await api.post(`/blood-requests/${id}/volunteer`, {
        canShareDetails: canShare,
      });
      if (res.status === 200) {
        toast({
          title: "Success",
          description: "You are now a volunteer for this request",
          variant: "success",
        });
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 400) {
        toast({
          title: "Error",
          description: "You are already a volunteer for this request",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="ghost"
          className="text-accent dark:text-accent font-semibold"
        >
          Be a Volunteer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogCancel className="absolute top-4 right-4"><X /></AlertDialogCancel>
          <AlertDialogTitle className="dark:text-dark-text">
            Share Details
          </AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to share your details with this person?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => handleSubmit(false)}>
            Continue without sharing
          </AlertDialogAction>
          <AlertDialogAction onClick={() => handleSubmit(true)}>
            Share
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
