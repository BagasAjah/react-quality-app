export const addTodo = 
	(list, todo) => [...list,todo]

export const generateId = 
	() => Math.floor(Math.random()*100000)

export const findById =
	(id, todos) => todos.find((todo) => todo.id === id)

export const toggleTodosById =
	(id, todos) => todos.map( 
			(todo) => ({
				...todo,
				isComplete: todo.id === id ?
					!todo.isComplete : 
					todo.isComplete
			})
		)

export const toggleTodo =
	(todo) => ({
		...todo, 
		isComplete: !todo.isComplete
	})

export const updateTodo = 
	(todos, todo) => todos.map(
			(item) => ({
				...item,
				name: todo.id === item.id ?
					todo.name : item.name,
				isComplete: todo.id === item.id ?
					todo.isComplete : item.isComplete
			})
		)

export const removeTodo = 
	(todos, id) => todos.filter(
		(todo) => todo.id !== id)

export const filterTodos = (list, route) => {
	switch (route) {
		case '/active':
			return list.filter(item => !item.isComplete)
		case '/complete':
			return list.filter(item => item.isComplete)
		default:
			return list;
	}
}		