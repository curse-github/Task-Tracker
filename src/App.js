import React, { useState, useRef, useEffect } from 'react';
import TodoList from "./TodoList"
function App() {
	const localstoragekey = "firstReact.todos";
	const [todos, setTodos] = useState([]);
	const todoNameRef = useRef();
	
	useEffect(() => {
		var newTodos = JSON.parse(localStorage.getItem(localstoragekey));
		if (newTodos != null && newTodos.length > 0) setTodos(newTodos);
	}, []);
	useEffect(() => {
		localStorage.setItem(localstoragekey,JSON.stringify(todos));
	}, [todos]);

	
	function addTodo(e) {
		var name = todoNameRef.current.value;
		if (name === null || name === "") return;
		todoNameRef.current.value = "";
		setTodos(prevTodos => {
			return [...prevTodos,{
				id:todos.length+1,
				name:name,
				complete:false
			}];
		});
	}
	function toggleTodo(id) {
		var newTodos = [...todos];
		var modTodo = newTodos.find(todo => todo.id === id);
		modTodo.complete = !modTodo.complete;
		setTodos(newTodos);
	}
	function clearTodos() {
		var newTodos = todos.filter(todo => (todo != null && !todo.complete));
		for(var i = 0; newTodos.length; i++) {
			if (newTodos[i] != null) { newTodos[i].id = i; }
		}
		setTodos(newTodos);
	}
	return (
		<>
			<TodoList todos={todos} toggleTodo={toggleTodo}/>
			<input ref={todoNameRef} type="text" />
			<button onClick={addTodo}>Add Todo</button>
			<br/>
			<button onClick={clearTodos}>Clear Completed Todos</button>
			<div>{todos.filter(todo => !todo.complete).length} left to do</div>
		</>
	);
}

export default App;
