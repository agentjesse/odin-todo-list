// importing CSS directly into the related js file
import './styles.css'

// module imports, from named and default
// import { functionOne } from './myModule';
import { logToConsole as lg } from "./logger"; //shorthand logger

//functionality for objects


//project objects
//have: title, notes, due date
//do: create todo objects, offer completed todos removal
const makeProject = (title = 'Untitled Project', notes = '', dueDate = '')=> {
  const todos = [];
  const addTodo = ()=> {
    todos.push('test todo');
  }
  return { //public exposure
    title,
    notes,
    dueDate,
    todos,
    addTodo
  }
}

//todo objects
//have: title, notes, due date, priority, completion state
const makeTodo = (title = 'Untitled Todo', notes = '', dueDate = '', priority = 'normal', completed = false)=> {
  return {
    title,
    notes,
    dueDate,
    priority,
    completed
  }
}

// testing
const openRestaurantProj = makeProject()
openRestaurantProj.addTodo()
lg( openRestaurantProj );