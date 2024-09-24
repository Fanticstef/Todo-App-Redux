import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: []
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({
                id: Date.now(),
                todo: action.payload,
                completed: false,
            })
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload)

            if(todo){
                todo.completed = !todo.completed
            }
        },
        updateTodo: (state, action) => {
            const newTodo = state.todos.find((todo) => todo.id === action.payload.id)

            if(newTodo){
                newTodo.todo = action.payload.todo
            }
        }
    }
})

export const { addTodo, deleteTodo, toggleTodo, updateTodo } = todoSlice.actions

export default todoSlice.reducer