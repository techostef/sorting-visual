let nextTodoId = 0
export const addTodo = text => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
})
export const setVisibilityFilter = filter => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})
export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
})
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const AddUser = (name, age, active = false) => ({
    type: "AddUser",
    Id: (new Date().getTime() + (Math.floor(Math.random() * 100) + 1)),
    Name: name,
    Age: age,
    Active: active
})

export const EditUser = (id, name, age) => ({
    type: "EditUser",
    Id: id,
    Name: name,
    Age: age,
})

export const RemoveUser = (id) => ({
    type: "RemoveUser",
    Id: id
})