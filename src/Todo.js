import React, { useState } from 'react';
function Todo({ todo, toggleTodo }) {
    function toggle(e) {
        toggleTodo(todo.id);
    }
	return (
		<div>
            <label> {todo.name + ": "} </label>
            <input type="checkbox" checked={todo.complete} onChange={toggle}/>
		</div>
	);
}

export default Todo;
