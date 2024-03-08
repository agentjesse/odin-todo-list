// importing CSS directly into the related js file
import './styles.css'

// module imports, from named and default
// import { functionOne } from './myModule';
import { logToConsole as lg } from "./logger"; //shorthand logger

//functionality for objects


//project objects
//have: title, notes, due date, array index
//do: create todo objects, offer completed todos removal
const makeProject = projectIndex=> {
  let title = 'Untitled Project', description = '', todosArr = [];
  const addTodo = ()=> { //keep here and use closure. no need to make another fn to call it with the todosArr array.
    todosArr.push( makeTodo(todosArr.length) ); //control via index
  }
  const removeCompletedTodos = (...removalIndexes)=> {
    removalIndexes.forEach( removalIndex=>{
      for ( let currentTodoIndex = 0; currentTodoIndex<todosArr.length; currentTodoIndex++ ){
        //iterate through each todo until its index matches removalindex and prepare it for deletion
        if ( todosArr[currentTodoIndex].index === removalIndex ){
          todosArr.splice(currentTodoIndex,1);
          currentTodoIndex--; //reposition currentTodoIndex after in place removal
          break;
        }
      }
    });
  }
  return { //public exposure
    title: ()=> title,
    description: ()=> description,
    getProjectIndex: ()=> projectIndex,
    getTodosArr: ()=> todosArr,
    addTodo,
    removeCompletedTodos
  }
}

//todo objects
//make with: index position in their array
//have: title, notes, due date/time, priority, completion state
const makeTodo = index=> {
  let title = 'Untitled Todo', dueDate = '', dueTime = '', notes = '', priority = 'normal', completed = false;
  return { //these props are not closures.. fix
    index,
    title,
    notes,
    dueDate,
    dueTime,
    priority,
    completed
  }
}

// testing
const openARestaurantProj = makeProject();
for (let runs = 1; runs<=5; runs++) { openARestaurantProj.addTodo() };
lg('project with 5 todos:' );
lg( openARestaurantProj.getTodosArr() );
openARestaurantProj.removeCompletedTodos(1,3);
lg('todos array after removal of index 1 & 3 todos:' );
lg( openARestaurantProj.getTodosArr() );