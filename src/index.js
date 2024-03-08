// importing CSS directly into the related js file
import './styles.css'

// module imports
import { logToConsole as lg, tableToConsole as tb} from "./logger"; //shorthand loggers

//functionality for objects

//project objects
//have: project ID, title, description, 
//do: store and create todo objects, remove completed todos
const makeProject = projectID=> {
  let title = 'Untitled Project', description = '', todoCreationID = 0;
  const todosArr = [];

  const addTodo = ()=> { //keep here and use closure.
    todosArr.push( makeTodo(todoCreationID) ); //control via an ID
    todoCreationID++;
  }
  const removeCompletedTodos = (...removalIDs)=> { //pass in number type IDs of todos to delete
    removalIDs.forEach( removalID=> {
      for ( let currentTodoIndex = 0; currentTodoIndex<todosArr.length; currentTodoIndex++ ){
        //iterate through each todo until its ID matches removalID
        if ( todosArr[currentTodoIndex].getID() === removalID ){
          todosArr.splice(currentTodoIndex,1);
          currentTodoIndex--; //reposition currentTodoIndex after an in place removal
          break; //no need to keep going after a match and delete
        }
      }
    });
  }
  return { //public exposure. projectID is passed in and exposed, unmodified
    getProjectID: ()=> projectID,
    getTitle: ()=> title,
    getDescription: ()=> description,
    getTodosArr: ()=> todosArr,
    addTodo,
    removeCompletedTodos,
  }
}

//todo objects
//made by passing in a number type argument for ID
//have: title, notes, due date/time, priority, completion state
const makeTodo = id=> {
  let title = 'Untitled Todo', dueDate = '', dueTime = '', notes = '', priority = 'normal', completedState = false;

  //function to toggle completedState of a todo instance. call from a checkbox event listener
  const toggleCompletedState = ()=> {
    completedState = completedState ? false : true;
  }
  
  return { //public exposure
    getID: ()=> id,
    title: ()=> title,
    notes: ()=> notes,
    dueDate: ()=> dueDate,
    dueTime: ()=> dueTime,
    priority: ()=> priority,
    getCompletedState: ()=> completedState,
    toggleCompletedState,
  }
}

//application start IIFE, no referencing for now so skipping assignment
( ()=>{
  //store projects in an array that should default to one project if the localStorage doesn't have any
  const projectsArr = [];
  let projectID = 0;
  //if local storage is devoid of projects
  //localStorage checking logic goes here...
  //...make a new one with ID from a counter, push it in, and increment ID counter:
  projectsArr.push( makeProject(projectID) );
  projectID++;
  projectsArr.push( makeProject(projectID) );
  projectID++;

  //save projects to localStorage....instead of deep cloning, need to save only necessary objects and use them to build new ones after. below is useless shallow clone
  localStorage.setItem( '[TBD]projects in this device\'s localStorage: ', JSON.stringify(projectsArr) );


  //todo testing
  //make some todos, remove some, then log existing ones
  lg ( 'making 5 todos in first project...' )
  for (let runs = 1; runs<=5; runs++) { projectsArr[0].addTodo() };
  //lg( 'removing index 1 & 3 todos...' )
  //projectsArr[0].removeCompletedTodos(1,3);
  projectsArr[0].getTodosArr().forEach( (todo, i)=> lg( `ID of todo at index ${i}: ${todo.getID()}` ) );
  //test toggling completed state
  lg('toggling a todo\'s completed state and logging all for comparison..')
  projectsArr[0].getTodosArr()[2].toggleCompletedState()
  projectsArr[0].getTodosArr().forEach( (todo, i)=> lg( `completedState of todo at index ${i}: ${todo.getCompletedState()}`))

  
} )();