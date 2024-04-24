import { AlertDialogContent, AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { AlertDialog, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";

export default function SetBoardDelete({ open, setOpen, setDelete }: {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setDelete: Dispatch<SetStateAction<boolean>>
}) {

    const handleDelete = () => {
        setDelete(true)
        setOpen(false)
    }
    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Borrar Tablero
                    </AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        Estas seguro que quieres borrar este tablero?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button onClick={() => setOpen(false)} >Cancelar</Button>
                    <Button onClick={handleDelete} variant={'destructive'}>Borrar</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}