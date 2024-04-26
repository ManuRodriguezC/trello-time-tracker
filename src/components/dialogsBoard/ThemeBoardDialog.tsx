import { Theme } from "@/types";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { SetStateAction, useState, Dispatch, useEffect } from "react";
import ThemeOptions from "../themesOptions/ThemeOptions";
import { themes } from "../themesOptions/ThemesOptions";

export default function SetBoardTheme ({ open, setOpen, setTheme }: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setTheme: Dispatch<SetStateAction<Theme>>;
}) {

    const [themeAux, setThemeAux] = useState<Theme>()

    useEffect(() => {
        if (!themeAux) return
        setTheme(themeAux)
        setOpen(false)
    }, [themeAux])

    return (
        <Dialog open={open}>
            <DialogTrigger className="text-sm pl-2"></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Cambiar Tema</DialogTitle>
                <DialogDescription asChild>
                    <div className="flex flex-wrap justify-center pt-3">
                        {
                            themes.map(theme => (
                                <ThemeOptions key={theme.id} setTheme={setThemeAux} themeOption={theme} />
                            ))
                        }
                    </div>
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="px-2 py-1 bg-destructive rounded-md text-primary-foreground hover:opacity-75">
                            Cerrar
                        </button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}