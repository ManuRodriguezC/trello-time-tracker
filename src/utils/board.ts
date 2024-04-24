import { create } from 'zustand';
import { Board as BoardType } from '@/types';

type BoardStore = {
    boards: BoardType[];
    addBoard: (board: BoardType) => void;
    setBoard: (board: BoardType) => void;
    removeBoard: (board: string) => void;
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
    
}));
