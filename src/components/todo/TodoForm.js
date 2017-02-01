import React from 'react'

export const TodoForm = (props) => (
<form onSubmit={props.handleSubmit}>
<input type="text" 
  value={props.currentTodo}
  onChange={props.handlerInputChange}/>
</form>
)

TodoForm.propTypes = {
	currentTodo: React.PropTypes.string.isRequired,
	handleSubmit: React.PropTypes.func.isRequired,
	handlerInputChange: React.PropTypes.func.isRequired
}