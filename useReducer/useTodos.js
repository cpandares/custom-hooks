import { useEffect, useReducer } from 'react';
import todosReducer from './todosReducer';

    const initialState = []
   

    const init = ()=>{
            return JSON.parse(localStorage.getItem('todos') ) || [];
     }

const useTodos = () => {

    const [ todos, dispatch ] = useReducer(todosReducer, initialState, init);

    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos))
    },[todos])
    
    const onNewTodo = (todo)=>{
        
        const action = {
            type : '[TODO] add todo',
            payload: todo
        }

        dispatch(action)
    }

    const handleDelete = (id)=>{
        dispatch({
            type : '[TODO] delete todo',
            payload: id
        })
    }

    const handleToggleTodo = (id)=>{
        
        dispatch({
            type : '[TODO] toggle todo',
            payload: id
        })
    }

    const todosCount = todos.length;
    const todosPendingCount = todos.filter( todo => !todo.done )

    return { 
        todos,
        onNewTodo,
        handleDelete,
        handleToggleTodo,
        todosCount : todos.length,
         todosPendingCount : todos.filter( todo => !todo.done ).length
    }
   
};

export default useTodos;