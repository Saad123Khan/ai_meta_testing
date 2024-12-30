import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DialogHeader } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import apis from "@/services";
import { swalConfirmPopUp, swalPopUp } from "@/lib/helper";

const SalesmanModal = ({
    open,
    onClose,
    refetch,
    connectionId,
}: {
    open: boolean;
    onClose: () => void;
    refetch?: any;
    connectionId?: any;
}) => {
    const { mutate: deleteSalesman, isPending: isDelete } = useMutation({
        mutationFn: (connectionId: number) => apis.deleteSalesman(connectionId),
        onSuccess: () => {
            swalPopUp("Delete", "Salesman deleted successfully", "success");
            onClose();
            refetch();
        },
        onError: () => {
            swalPopUp("Error", "Failed to delete salesman", "error");
            onClose();
        },
    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                style: { borderRadius: 22 },
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">
                        <p className="text-xl font-semibold">Delete Salesman</p>
                        <p className="text-sm text-muted-foreground">
                            Are you sure you want to delete this salesman?
                        </p>
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex justify-center gap-3">
                        <Button
                            disabled={isDelete}
                            className="bg-[#002EF6] rounded-[18px] px-10 py-2 hover:bg-blue-700 text-white"
                            onClick={() => onClose()}
                        >
                            No
                        </Button>
                        <Button
                            disabled={isDelete}
                            className="bg-[red] rounded-[18px] px-10 py-2 hover:bg-blue-700 text-white"
                            onClick={() => deleteSalesman(connectionId)}
                        >
                            {isDelete ? "Deleting..." : "Yes"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SalesmanModal;
