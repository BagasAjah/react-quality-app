import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo'
import {addTodo, generateId, findById
       , toggleTodo, updateTodo, removeTodo
       , filterTodos} from './lib/todoHelpers'
import {pipe, partial} from './lib/util'
import {loadTodos, createTodo, saveTodo
       , destroyTodo} from './lib/todoService'

class App extends Component {
  state = {
      todos: [],
      currentTodo: '',
      errorMessage: ''
    }

  static contextTypes = {
    route: React.PropTypes.string
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}))
  }

  handleToggle = (id) => {
    const getToggleTodo = pipe(findById, toggleTodo)
    const updated = getToggleTodo(id, this.state.todos)
    const getUpdatedTodos = 
      partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({
      todos: updatedTodos
    })
    saveTodo(updated)
      .then(() => {this.showTempMessage('Todo updated')})
  }
  handleRemove = (id, evt) => {
    evt.preventDefault()
    const updateTodos = 
      removeTodo(this.state.todos, id)
    this.setState({
      todos: updateTodos
    })
    destroyTodo(id)
      .then(() => this.showTempMessage('Todo removed'))
  }
  handlerInputChange = (evt) => {
    this.setState({
      currentTodo: evt.target.value
    })
  }
  handleSubmit = (evt) => {
    evt.preventDefault()
    if (this.state.currentTodo === '') { 
      return null; 
    }
    const newTodo = {
      name: this.state.currentTodo.trim(), 
      isComplete: false,
      id: generateId()
    }
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    })
    createTodo(newTodo)
      .then(this.showTempMessage("Todo added"))
  }
  showTempMessage = (msg) => {
    this.setState({message: msg})
    setTimeout(() => {
      this.setState({message: ''})
    }, 2500)
  }
  handleEmptySubmit = (evt) => {
    evt.preventDefault()
    this.setState({
      errorMessage: 'Please supply a todo name.'
    })
  }
  render() {
    const submitHandler = this.state.currentTodo.trim() ?
      this.handleSubmit : this.handleEmptySubmit
    const displayTodos = 
      filterTodos(this.state.todos, this.context.route)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage &&
            <span className='error'>
              {this.state.errorMessage}
            </span>}
          {this.state.message &&
            <span className='succes'>
              {this.state.message}
            </span>}
          <TodoForm 
            handlerInputChange={this.handlerInputChange} 
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler}
            />
          <TodoList todos={displayTodos}
            handleToggle={this.handleToggle}
            handleRemove={this.handleRemove}/>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
