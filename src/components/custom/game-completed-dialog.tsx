import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type GameCompletedDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const GameCompletedDialog = ({
  open,
  onClose,
}: GameCompletedDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Game Over!</AlertDialogTitle>
          <AlertDialogDescription>
            Congratulations on completing the Memory Game! You can start a new
            game by clicking 'Reset Game'.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Reset Game</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
