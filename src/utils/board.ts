import { create } from 'zustand';
import { Board as BoardType, List as ListType, TaskType } from '@/types';

type BoardStore = {
    boards: BoardType[];
    addBoard: (board: BoardType) => void;
    setBoard: (board: BoardType) => void;
    removeBoard: (board: string) => void;
    addList: (boardId: string, list: ListType) => void;
    updateList: (list: ListType) => void;
    removeList: (listId: string) => void;
    addTask: (listId: string, task: TaskType) => void;
    updateTask: (task: TaskType) => void;
    removeTask: (taskId: string) => void;
    trackTime: (listId: string, time: number) =>void;
}

const saveToLocalStorage = (boards: BoardType[]) => {
    localStorage.setItem('boards', JSON.stringify(boards));
}

export const useBoardStore = create<BoardStore>((set) => ({
    boards: JSON.parse(localStorage.getItem('boards') || '[]') as BoardType[], // Corregido para que sea un array de BoardType[]
    
    addBoard: (board) => set(({ boards }) => {
        const newBoards = boards.concat(board)
        saveToLocalStorage(newBoards)
        return { boards: newBoards }; // Corregido para que sea boards: [...boards, board]
    }),

    setBoard: (board) => set(({ boards }) => {
        const currentBoard = boards.findIndex(item => item.id === board.id)
        if (currentBoard === -1) return { boards }
        const newBoards = [...boards]
        newBoards[currentBoard] = board
        saveToLocalStorage(newBoards)
        return { boards: newBoards}
    }),

    removeBoard: (boardId) => set(({ boards }) => {
        const newBoards = boards.filter(board => board.id !== boardId)
    
        saveToLocalStorage(newBoards)
    
        return { boards: newBoards }
      }),

    addList: (boardId, list) => set(({ boards }) => {
        const newBoards = boards.map(board => {
          if (board.id !== boardId) return board
    
          return {
            ...board,
            lists: board.lists.concat(list)
          }
        })
        saveToLocalStorage(newBoards)
        return {boards: newBoards}
    }),

    updateList: (list) => set(({ boards }) => {
        const newBoard = boards.map(board => {
            const listIndex = board.lists.findIndex(item => item.id === list.id)

            board.lists[listIndex] = list

            return board
        })
        saveToLocalStorage(newBoard)
        return { boards: newBoard }
    }) 
        ,

    removeList: (listId) => set(({ boards }) => {
        const newBoard = boards.map(board => {
            const lists = board.lists.filter(list => list.id !== listId)
            return {
                ...board,
                lists
            }
        })
        saveToLocalStorage(newBoard)
        return { boards: newBoard}
    }),

    addTask: (listId, task) => set(({ boards }) => {
        const newBoards = boards.map(board => {
          const newLists = board.lists.map(list => {
            if (list.id !== listId) return list
    
            return {
              ...list,
              tasks: list.tasks.concat(task)
            }
          })
    
          return {
            ...board,
            lists: newLists
          }
        })
    
        saveToLocalStorage(newBoards)
    
        return { boards: newBoards}
    }),

    updateTask: (task) => set(({ boards }) => {
      const newBoard = boards.map(board => {
        board.lists.map(list => {
          const taskIndex = list.tasks.findIndex(item => item.id == task.id)
          if (taskIndex !== -1) {
            list.tasks[taskIndex] = task
          }
          return list
        })
        return board
      })  
      saveToLocalStorage(newBoard)
      return { boards: newBoard}
    }),

    removeTask: (taskId) => set(({ boards }) => {
      const newBoard = boards.map(board => {
        const newList = board.lists.map(list => {
          const newTask = list.tasks.filter(task => task.id !== taskId)
          return {
            ...list,
            tasks: newTask
          }
        })
        return {
          ...board,
          lists: newList
        }
      })
      saveToLocalStorage(newBoard)
      return { boards: newBoard }
    }),

    trackTime: (listId, time) => set(({ boards }) => {
      let boardId: string
      const newBoard = boards.map(board => {
        const newList = board.lists.map(list => {

          if (list.id !== listId) return list

          boardId = board.id
          const newTime = time + list.time

          const newTasks = list.tasks.map(task => {
            return {
              ...task,
              time: task.time + time
            }
          })

          return {
            ...list,
            tasks:newTasks,
            time: newTime
          }

        })
        const newTime = board.time + time

        if (board.id === boardId) {
          return {
            ...board,
            lists: newList,
            time: newTime
          }
        }
        return {
          ...board,
          lists: newList
        }
      })
      saveToLocalStorage(newBoard)
      return {boards: newBoard}
    })
}));
