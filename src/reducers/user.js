const users = (state = [], action) => {
    switch(action.type) {
        case "AddUser": 
            return [
                ...state,
                {
                    Id: action.Id,
                    Name: action.Name,
                    Age: action.Age,
                    Active: action.Active
                }
            ]
        case "EditUser": 
            return state.map(item =>
                item.Id === action.Id ? { 
                    ...item,
                    Name: action.Name,
                    Age: action.Age,
                } : item
            )
        case "RemoveUser":
            return state.filter((data) => data.Id !== action.Id);
        default:
            return state
    }
}

export default users