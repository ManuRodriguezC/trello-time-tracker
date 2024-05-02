import BoardWrapper from "./BoardWrapper";
import BoardOptions from "./BoardOptions";
import { Separator } from "./ui/separator";
import { Ellipsis, Plus } from "lucide-react";
import type { List as TypeList, TaskType } from "@/types"
import Task from "./Task"
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { DNDPlugin, addEvents, animations, parents } from "@formkit/drag-and-drop";
import DropDownMenuOptions from "./DropDownMenuOptions";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useBoardStore } from "@/utils/board";
import AddTask from "./tasks/AddTask";

type Props = {
    list: TypeList,
    boardName: string,
    dragStatus: boolean,
    setDragStatus: Dispatch<SetStateAction<boolean>>;
}
   


export default function List({ list, boardName, dragStatus, setDragStatus }: Props) {
    const { removeList, updateList } = useBoardStore()
    const [title, setTitle] = useState<string>(list.title)
    const [remove, setRemove] = useState<boolean>(false)
    
    const dragStatusPlugin: DNDPlugin = (parent) => {
        const parentData = parents.get(parent);
        if (!parentData) return;
        
        function dragstart() {
           setDragStatus(true);
        }
        
        function dragend() {
            setDragStatus(false);
        }
        
        return {
           setup() {},
           
           teardown() {},
           
           setupNode(data) {
               data.nodeData.abortControllers.customPlugin = addEvents(data.node, {
                   dragstart: dragstart,
                   dragend: dragend,
                });
            },
            
            tearDownNode(data) {
                if (data.nodeData?.abortControllers?.customPlugin) {
                    data.nodeData.abortControllers.customPlugin.abort();
                }
            },
            
            setupNodeRemap() {},
            
            tearDownNodeRemap() {},
        };
    };
    const [todoList, todos, setTodos] = useDragAndDrop<HTMLDivElement, TaskType>(
        list.tasks,
        {
            group: boardName,
            plugins: [animations(), dragStatusPlugin]
        }
    )

    useEffect(() => {
        if (list.tasks.length === todos.length) return
        setTodos(list.tasks)
    }, [list])

    useEffect(() => {
        if (dragStatus) return
        updateList({
            ...list,
            tasks: todos
        })
    }, [dragStatus])

    useEffect(() => {
        if (!title) return
        if(dragStatus) return
        updateList({
            ...list,
            title
        })
    }, [title])

    useEffect(() => {
        if (!remove) return
        removeList(list.id)
    }, [remove])

    return (
        <div
            key={list.id}
            className="h-fit p-4 bg-primary rounded-lg text-primary-foreground min-w-52 cursor-pointer shadow-2xl shadow-scale-200">
            <div className="flex flex-col gap-3">
                <BoardWrapper id={`list-name-${list.id}`}>
                    <h3 className="font-semibold">{title}</h3>
                    <BoardOptions className="p-0 h-6 hover:bg-slate-700/80">
                        <DropDownMenuOptions
                        type="list"
                        setTitle={setTitle}
                        setRemove={setRemove}
                        >
                        <Ellipsis className="w-full h-full hover:text-muted p-1 relative bottom-6" size={20} />
                        </DropDownMenuOptions>
                    </BoardOptions>
                </BoardWrapper>
                <Separator />
                <div ref={todoList} id={`list-${list.id}-tasks`} className="flex flex-col py-2 gap-3 w-full">
                    {
                        todos.map(task => (
                            <Task key={`task-${task.id}`} task={task} />
                        ))
                    }
                </div>

                <div className="w-full mt-2">
                    <BoardWrapper id={`options-list-${list.id}`}>
                        <div className="flex gap-4 justify-between items-center w-full">
                            <h4>Añadir tarea</h4>
                            <BoardOptions className="p-0">
                                <AddTask listId={list.id}>
                                    <Plus className="w-full h-full hover:text-primary p-1" />
                                </AddTask>
                            </BoardOptions>
                        </div>
                    </BoardWrapper>
                </div>
            </div>
        </div>
    )
}