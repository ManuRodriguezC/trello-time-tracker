import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import SetBoardTheme from "./dialogsBoard/ThemeBoardDialog";
import SetBoardTitle from "./dialogsBoard/TitleBoardDialog";
import SetBoardDelete from "./dialogsBoard/DeleteBoardDialog";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Theme } from "@/types";
import { Separator } from "./ui/separator";

type DropdownMenuBoardOptionsProps = {
    type: 'board',
    setTitle: Dispatch<SetStateAction<string>>,
    setTheme: Dispatch<SetStateAction<Theme>>,
    setRemove: Dispatch<SetStateAction<boolean>>,
    children: ReactNode
}

type DropdownMenuListAndTaskOptionsProps = {
    type: 'list' | 'task',
    setTitle: Dispatch<SetStateAction<string>>,
    setRemove: Dispatch<SetStateAction<boolean>>,
    children: ReactNode
}

type Props = DropdownMenuBoardOptionsProps | DropdownMenuListAndTaskOptionsProps

const DropdownMenuOptionsMap = {
    board: 'Tablero',
    list: 'Lista',
    task: 'Tarea'
}

export default function DropDownMenuOptions (props: Props) {

    const [themeMenuOpen, setThemeMenuOpen] = useState(false)
    const [titleMenuOpen, setTitleMenuOpen] = useState(false)
    const [removeMenuOpen, setRemoveMenuOpen] = useState(false)

    return (
        <>
          {
            props.type === 'board' && (
              <SetBoardTheme open={themeMenuOpen} setOpen={setThemeMenuOpen} setTheme={props.setTheme} />
            )
          }
          <SetBoardTitle open={titleMenuOpen} setOpen={setTitleMenuOpen} setTitle={props.setTitle} />
          <SetBoardDelete open={removeMenuOpen} setOpen={setRemoveMenuOpen} setDelete={props.setRemove} type={DropdownMenuOptionsMap[props.type]}/>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {props.children}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {DropdownMenuOptionsMap[props.type]}
              </DropdownMenuLabel>
              <Separator />
              <DropdownMenuItem onClick={() => setTitleMenuOpen(true)} className="cursor-pointer">
                Cambiar Nombre
              </DropdownMenuItem>
              {
                props.type === 'board' && (
                  <DropdownMenuItem onClick={() => setThemeMenuOpen(true)} className="cursor-pointer">
                    Cambiar Tema
                  </DropdownMenuItem>
                )
              }
              <DropdownMenuItem onClick={() => setRemoveMenuOpen(true)} className="cursor-pointer">
                <span className="text-destructive">Borrar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
}