import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserStore } from "@/utils/user"
import { ReactNode, useState } from "react"

type Props = {
  children?: ReactNode;
  defaultOpen?: boolean;
}
 
export default function SetUserName({ children, defaultOpen=false }: Props) {

  const { user, setUser } = useUserStore()
  const [newName, setNewName] = useState(user ?? '')
  const [open, setOpen] = useState(defaultOpen)

  const handleSaveChange = () => {
    if (!newName) return
    setUser(newName)
    setOpen(false)
  }

  const handleTrigger = () => {
    setOpen(true)
  }


  return (
    <Dialog  open={open}>
      <DialogTrigger onClick={handleTrigger} asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Realice cambios en su perfil aquí. Haga clic en guardar cuando haya terminado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              defaultValue={newName}
              className="col-span-3"
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSaveChange}
            type="submit">
                Guardar Cambios
          </Button>
          {user && user.length > 0 &&
          <Button variant={'destructive'} onClick={() => setOpen(false)}>
              Cerrar
          </Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}