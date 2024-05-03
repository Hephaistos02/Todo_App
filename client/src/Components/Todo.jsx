import React, { useState, useRef, useEffect } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { FaRegEdit } from 'react-icons/fa';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import './Todo.css';

const Todo = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if (todo !== '') {
      const newTodos = [...todos, { list: todo, id: Date.now(), status: false }];
      setTodos(newTodos);
      persistData(newTodos);
      setTodo('');
    }
    if (editId) {
      const updatedTodos = todos.map((to) =>
        to.id === editId ? { ...to, list: todo } : to
      );
      setTodos(updatedTodos);
      persistData(updatedTodos);
      setEditId(0);
      setTodo('');
    }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (editId) {
      inputRef.current.focus();
    }
  }, [editId]);

  const onDelete = (id) => {
    const filteredTodos = todos.filter((todoValues) => todoValues.id !== id);
    setTodos(filteredTodos);
    persistData(filteredTodos);
  };

  const onComplete = (id) => {
    const updatedTodos = todos.map((todoItem) =>
      todoItem.id === id ? { ...todoItem, status: !todoItem.status } : todoItem
    );
    setTodos(updatedTodos);
    persistData(updatedTodos);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id);
    setTodo(editTodo.list);
    setEditId(editTodo.id);
  };

  useEffect(() => {
    const localTodos = localStorage.getItem('todos');
    if (localTodos) {
      setTodos(JSON.parse(localTodos).todos);
    }
  }, []);

  return (
    <>
      <div className="todo-container">
        <form className="input-section" onSubmit={handleSubmit} action="">
          <h1>TODO APP</h1>
          <input
            type="text"
            value={todo}
            ref={inputRef}
            placeholder="Enter Events..."
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="add-btn" onClick={addTodo}>
            {editId ? 'EDIT EVENT' : 'ADD EVENT'}
          </button>
        </form>
        <div className="task-field">
          <ul>
            {todos.map((todoValues) => (
              <li className="list-items" key={todoValues.id}>
                <div
                  className="list-item-list"
                  id={todoValues.status ? 'list-item' : ''}
                >
                  {todoValues.list}
                </div>
                <span className="react-icons">
                  <IoCheckmarkDoneOutline
                    className="list-item-icons"
                    id="complete"
                    title="Complete"
                    onClick={() => onComplete(todoValues.id)}
                  />
                  <FaRegEdit
                    className="list-item-icons"
                    id="edit"
                    title="Edit"
                    onClick={() => onEdit(todoValues.id)}
                  />
                  <IoTrashOutline
                    className="list-item-icons"
                    id="delete"
                    title="Delete"
                    onClick={() => onDelete(todoValues.id)}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Todo;
