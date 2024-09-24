import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, toggleTodo, updateTodo } from '../redux-toolkit/todoSlice'

const TodoApp = () => {

    const [edit, setEdit] = useState(null)

    const [todo, setTodo] = useState(edit ? edit.todo : "")

    const { todos } = useSelector((state) => state.todo)

    const dispatch = useDispatch()

    const handleAddOrUpdateTodo = () => {
        if(edit){
            dispatch(updateTodo({id: edit.id, todo}))
            setEdit(null)
        }else{
            dispatch(addTodo(todo))
        }

        setTodo("")
    }

    const handleEdit = (todo) => {
        setEdit(todo)
    }

    return (
        <>
            <div className="container mx-auto w-full">
                <div className="flex flex-col items-center justify-center h-[80vh]">
                    <div className="border max-w-3xl w-full text-center shadow-md p-4 rounded-md">
                        <div className="header my-8">
                            <h2 className="text-3xl text-green-600 font-semibold">Todo List App</h2>
                        </div>
                        <div className="mb-8 flex items-center justify-center">
                            <input
                                type="text"
                                placeholder="Type here"
                                className={`input md:input-lg input-md text-xl w-full max-w-[80%] me-2 ${edit ? 'input-bordered input-success' : 'input-bordered'}`}
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)} />

                            <button
                                className='btn btn-neutral md:btn-lg px-10'
                                onClick={handleAddOrUpdateTodo}>
                                    {edit ? "Update" : "Add"}
                                </button>
                        </div>
                        <div className="">
                            <ul className="menu bg-base-200 rounded-box">
                                {
                                    todos.length > 0 ? (
                                        todos.map((item) => (
                                            <li className='my-3' key={item.id}>
                                                <div className='w-full flex items-center justify-between p-2'>
                                                    <p
                                                        className={`${item.completed ? 'line-through text-xl ps-2' : 'text-xl ps-2'}`}>
                                                        {item.todo}
                                                    </p>
                                                    <div className="flex gap-3">
                                                        <button
                                                            className='btn btn-neutral md:btn btn-xs text-white'
                                                            onClick={() => dispatch(toggleTodo(item.id))}>
                                                            {item.completed ? "Undo" : "Completed"}
                                                        </button>
                                                        <button 
                                                            className='btn bg-green-600 md:btn btn-xs hover:bg-green-700 text-white'
                                                            onClick={() => handleEdit(item)}>Edit</button>
                                                        <button
                                                            className='btn bg-red-600 md:btn btn-xs hover:bg-red-700 text-white'
                                                            onClick={() => dispatch(deleteTodo(item.id))}>Delete</button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li>
                                            <div className='w-full flex items-center justify-between p-2'>
                                                <p className='text-xl ps-2'>No Task Available...</p>
                                            </div>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoApp
