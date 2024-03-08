// importing CSS directly into the related js file
import './styles.css'

// module imports, from named and default
// import { functionOne } from './myModule';
import { logToConsole as lg, tableToConsole as tb} from "./logger"; //shorthand loggers

//functionality for objects

//project objects
//have: title, notes, due date, project ID
//do: create todo objects, offer completed todos removal
const makeProject = projectID=> {
  let title = 'Untitled Project', description = '';
  const todosArr = [];

  const addTodo = ()=> { //keep here and use closure. no need to make another fn to call it with the todosArr array.
    todosArr.push( makeTodo(todosArr.length) ); //control via index
  }
  const removeCompletedTodos = (...removalIndexes)=> { //pass in indexes of todos to delete
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
  return { //public exposure. projectID is not modified
    getProjectID: ()=> projectID,
    getTitle: ()=> title,
    getDescription: ()=> description,
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
  return { //FIX MEE!!! these props are not closures...
    index,
    title,
    notes,
    dueDate,
    dueTime,
    priority,
    completed
  }
}

//application start IIFE, no referencing for now so skipping assignment
( ()=>{
  //store projects in an array that should default to one project if the localStorage doesn't have any
  const projectsArr = [];
  let projectID = 0;
  //if local storage is devoid of projects
  //localStorage checking logic goes here...
  //...make a new one with ID from a counter and push it inside:
  projectsArr.push( makeProject(projectID) );
  projectID++;
  projectsArr.push( makeProject(projectID) );
  projectID++;

  //save projects to localStorage....instead of deep cloning, need to save only necessary objects and use them to build new ones after. below is useless shallow clone
  localStorage.setItem( '[TBD]projects in this device\'s localStorage: ', JSON.stringify(projectsArr) );

  //todo testing: add some todos to first project, remove some by index, log project todos
  for (let runs = 1; runs<=5; runs++) { projectsArr[0].addTodo() };
  projectsArr[0].removeCompletedTodos(0,1);
  // tb( projectsArr[0].getTodosArr() );

  // multiple projects testing: log all of them, get id of second one
  lg( 'ALL PROJECTS: ' )
  lg( projectsArr )
  //lg( projectsArr[1].getProjectID() )

  
} )();