/*-- Next tasks:
-implement use of projectSeedsArr in localStorage progress:
need to implement todos into localStorage, using makeTodosSeed fn.

-enable text wrapping when text is too long for project/todo descriptions/notes. the input needs to expand to fit without overflowing to create a scrolling area.

--- Optional tasks:

-refactor removeProject fn out of appFlow IIFE. object stored in appFlow should have key: removeProject: id=> removeProject(projectsArr, projectsWrap, id)
- rerenders via appendTodos() clear out everything first, maybe implement a flag to only delete and append the item being rerendered with an index? or does react's virtual dom handle this?
*/

// imports
import './styles.css'
import { logToConsole as lg, tableToConsole as tb} from "./logger"; //shorthand loggers

//project objects
//have: project ID, title, description, 
//do: store todos, create them, remove completed ones.
//overwrite values from localStorage project seed objects if provided
const makeProject = (projectID, projectSeed)=> {
  let title, titlePlaceholder = '...Project Title',
      description, descriptionPlaceholder = '...Project Description',
      todoCreationID = 0, todosArr = [];

  //overwrite from seed if it is passed in as an argument
  if ( projectSeed ) {
    //overwrite variables using object destructuring from the projectSeed obj.
    //Parenthesis force the JS engine to evaluate as an expression including the object pattern to destructure, instead of a block statement.
    ( { title, description, todoCreationID } = projectSeed );
  }

  const addTodo = ()=> { //keep here and use closure.
    todosArr.push( makeTodo(todoCreationID) ); // ID for each todo from counter
    todoCreationID++;
  }
  const removeCompletedTodos = ()=> {
    todosArr = todosArr.filter( todo=> !todo.getCompletedState() );
  }

  return { //public exposure. projectID is passed in and exposed, unmodified
    getProjectID: ()=> projectID,
    getTitle: ()=> title,
    setTitle: newTitle=> title = newTitle,
    getTitlePlaceholder: ()=> titlePlaceholder,
    getDescription: ()=> description,
    setDescription: newDescription=> description = newDescription,
    getDescriptionPlaceholder: ()=> descriptionPlaceholder,
    getTodoCreationID: ()=> todoCreationID,
    getTodosArr: ()=> todosArr,
    addTodo,
    removeCompletedTodos,
  }
}
//project append module, called from appFlow module with project obj and projects wrapper elem
const appendProject = ( project, projectsWrap )=> {
  //make each project div's children. do any repetitive attribute setting later
  const projectWrap = document.createElement('div');
  const projectTitleInput = document.createElement('input');
  if ( project.getTitle() ){  projectTitleInput.value = project.getTitle() }
      else { projectTitleInput.placeholder = project.getTitlePlaceholder() }
  const projectDescriptionInput = document.createElement('input');
  if ( project.getDescription() ){  projectDescriptionInput.value = project.getDescription() }
      else { projectDescriptionInput.placeholder = project.getDescriptionPlaceholder() }
  // projectDescriptionInput.placeholder = `${ project.getDescriptionPlaceholder() }`;
  const removeProjectBtn = document.createElement('button'); //remove project button (needs confirm)
  removeProjectBtn.textContent = 'remove project ❌';
  const clearDoneTodosBtn = document.createElement('button'); //remove completed todos button (needs confirm)
  clearDoneTodosBtn.textContent = 'clear done todos 🗑';
  const addTodoBtn = document.createElement('button');
  addTodoBtn.textContent = 'add todo➕';
  const projectBtnsWrap = document.createElement('div');
  const todosWrap = document.createElement('div');
  //set class/data attributes to elems from their reference names via the keys of an object. Object.entries(object) returns an array of [key,value] pair arrays.
  Object.entries( //elems obj goes here
    { projectWrap,projectTitleInput,projectDescriptionInput,removeProjectBtn,
    clearDoneTodosBtn,addTodoBtn,projectBtnsWrap,todosWrap }
  ).forEach( ( [ key, elem ] )=> { //destructuring assignment to parameters from current key/value pair array
    elem.className = key; //set class name
    elem.setAttribute( 'data-project-id', project.getProjectID() ); //set identifier
  } );
  //append children to their wrappers
  projectBtnsWrap.append( removeProjectBtn, clearDoneTodosBtn, addTodoBtn );
  appendTodos( project, todosWrap );
  projectWrap.append(projectTitleInput, projectDescriptionInput, projectBtnsWrap, todosWrap);
  projectsWrap.append( projectWrap );
  //add event listeners
  addProjectListeners( projectWrap,project );
}

//add event listeners to each projectWrap that use bubbling of events from children
const addProjectListeners = (projectWrap, project)=> {
  //if listener removal is needed in future, make an AbortController here and pass its signal in the addEventListener options
  projectWrap.addEventListener( 'click' , e=> {
    e.stopPropagation();
    //multi use variable for cleaner invocations later
    const todosWrap = document.querySelector(`.todosWrap[data-project-id='${ e.target.dataset.projectId }']`)
    // lg('clicked: ' + e.target.outerHTML ); // nice output of element in console

    //handle project removal with: appFlow.removeProject(project_id)
    if ( e.target.className === 'removeProjectBtn' ) {
      appFlow.removeProject( e.target.dataset.projectId );
    }

    //handle todo expansion button clicks, store open state for rerenders...
    if ( e.target.className === 'todoExpandBtn' ) {
      const todo = project.getTodosArr().find( todo=> todo.getTodoID() === +e.target.dataset.todoId);
      e.target.textContent = e.target.textContent === '▼' ? '▲' : '▼';
      Array.from(e.target.parentElement.children).forEach( (elem,i)=> {
        i>2 && ( elem.classList.toggle('noDisplay') )// hide unecessary children
      } );
      todo.setOpenState( todo.getOpenState() ? false : true );
    }

    // Handle clicks on completion checkbox inputs to toggle completed states of todos
    if (e.target.classList.contains('completionBoxInput')) {
      project.getTodosArr().find(todo => todo.getTodoID() === +e.target.dataset.todoId).toggleCompletedState();
    }

    //handle clicks on clear done todos buttons
    if ( e.target.className === 'clearDoneTodosBtn' ) {
      project.removeCompletedTodos(); //filter out project's completed todos
      appendTodos( project, todosWrap ); //then rerender todos
    }

    // handle add todo button clicks, rerender todos
    if ( e.target.className === 'addTodoBtn' ) {
      project.addTodo();
      appendTodos( project, todosWrap );
      // lg( project.getTodosArr() )//testing

      //update localStorage...
      storeProjectSeeds();
    }

  } );

  //handle the bubbling focusout events when inputs lose focus
  projectWrap.addEventListener( 'focusout' , e=> {
    e.stopPropagation();
    // lg('this lost focus: ' + e.target.outerHTML ); // nice output of element in console

    //handle project's title edits
    if ( e.target.className === 'projectTitleInput' ) {
      project.setTitle(e.target.value); //set 'free variable' of setTitle() closure

      storeProjectSeeds(); //update localStorage
    }

    //handle project's description edits
    if ( e.target.className === 'projectDescriptionInput' ) {
      project.setDescription(e.target.value);

      storeProjectSeeds(); //update localStorage
    }

    //handle individual todo title edits
    if ( e.target.className === 'todoTitleInput' ) {
      //find the correct todo object, set its new title string
      project.getTodosArr()
        .find( todo=> todo.getTodoID() === +e.target.dataset.todoId )
        .setTitle(e.target.value);
      //testing
      // lg( 'new todo title:' + project.getTodosArr().find( todo=> todo.getTodoID() === +e.target.dataset.todoId ).getTitle() );
      lg('todo title input lost focus.here is current projectsArr:')
      lg( appFlow.getProjectsArr() )
    }

    //handle individual todo notes edits
    if ( e.target.className === 'todoNotesInput' ) {
      //find the correct todo object, set its new notes string
      project.getTodosArr()
      .find( todo=> todo.getTodoID() === +e.target.dataset.todoId )
      .setNotes(e.target.value);
      // lg( 'new todo notes:' + project.getTodosArr().find( todo=> todo.getTodoID() === +e.target.dataset.todoId ).getNotes() );
    }

  } );

  //handle the bubbling change events, usually when inputs lose focus
  projectWrap.addEventListener( 'change' , e=> {
    e.stopPropagation();
    // lg('this changed value: ' + e.target.outerHTML ); // nice output of element in console
    //multi use variable for cleaner invocations later
    const todosWrap = document.querySelector(`.todosWrap[data-project-id='${ e.target.parentElement.parentElement.dataset.projectId }']`)

    //handle individual todo due date/time setting by calling todo.setDueDateTime()
    //info: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local
    //lg( new Date().toISOString().slice(0,16) ); // YYYY-MM-DDThh:mm format string value for <input type="datetime-local">
    if ( e.target.className === 'dueDateTimeInput' ) {
      // lg('old todo dueDateTime:' + project.getTodosArr().find(todo=> todo.getTodoID() === +e.target.dataset.todoId).getDueDateTime() );

      project.getTodosArr()
      .find( todo=> todo.getTodoID() === +e.target.dataset.todoId )
      .setDueDateTime(e.target.value);

      // lg('new todo dueDateTime:' + project.getTodosArr().find(todo=> todo.getTodoID() === +e.target.dataset.todoId).getDueDateTime() );
    }

    //handle changes to selects with class 'prioritySelect'
    if ( e.target.className === 'prioritySelect' ) {
      // lg('old todo priority:' + project.getTodosArr().find(todo=> todo.getTodoID() === +e.target.dataset.todoId).getPriorityLevel() );

      project.getTodosArr()
      .find( todo=> todo.getTodoID() === +e.target.dataset.todoId )
      .setPriorityLevel(e.target.value); // target.value is 'high'/'normal'/'low'

      // lg('new todo priority:' + project.getTodosArr().find(todo=> todo.getTodoID() === +e.target.dataset.todoId).getPriorityLevel() );

      appendTodos( project, todosWrap ) //rerender
    }

  } );

}

//todo objects
//made by passing in a number type argument for ID
//have: title, notes, due date/time, priorityLevel, completion state
const makeTodo = id=> {
  let title, titlePlaceholder = '...Untitled Todo',
      notes, notesPlaceholder = '...add notes',
      dueDateTime, priorityLevel = 'normal', completedState = false,
      openState = false;

  //to toggle completedState of a todo instance
  const toggleCompletedState = ()=> completedState = completedState ? false : true;

  return { //public exposure
    getTodoID: ()=> id,
    getTitle: ()=> title,
    setTitle: newTitle=> title = newTitle,
    getTitlePlaceholder: ()=> titlePlaceholder,
    getNotes: ()=> notes,
    setNotes: newNotes=> notes = newNotes,
    getNotesPlaceholder: ()=> notesPlaceholder,
    getDueDateTime: ()=> dueDateTime,
    setDueDateTime: newDueDateTime=> dueDateTime = newDueDateTime,
    getPriorityLevel: ()=> priorityLevel,
    setPriorityLevel: newLevel=> priorityLevel = newLevel, // pass in 'high'/'normal'/'low'
    getCompletedState: ()=> completedState,
    toggleCompletedState,
    getOpenState: ()=> openState,
    setOpenState: newOpenState=> openState = newOpenState
  }
}
//Todo render module: appends todo elements to the wrapper using the todos array from project
const appendTodos = ( project, todosWrap )=> {
  // lg(`appendTodos invoked for project with ID ${project.getProjectID()}. removing existing todos first...`)
  todosWrap.innerHTML = ''; // clear any existing todos...
  //rebuild from project's todos array
  project.getTodosArr().forEach( todo=> {
    //make the todo's html elements.
    const todoWrap = document.createElement('div');
    const todoExpandBtn = document.createElement('button');
    if ( !todo.getOpenState() ) { todoExpandBtn.textContent = '▼' }
      else { todoExpandBtn.textContent = '▲' }
    const todoTitleInput = document.createElement('input')
    if ( todo.getTitle() ) {  todoTitleInput.value = todo.getTitle() }
      else { todoTitleInput.placeholder = todo.getTitlePlaceholder() }
    const completionBoxInput = document.createElement('input'); //completed state checkbox
    completionBoxInput.setAttribute('type','checkbox');
    completionBoxInput.checked = todo.getCompletedState();
    const todoNotesInput = document.createElement('input');
    if ( todo.getNotes() ) { todoNotesInput.value = todo.getNotes() }
      else { todoNotesInput.placeholder = todo.getNotesPlaceholder() }
    //todo due date/time picker
    const dueDateTimeInput = document.createElement('input');
    dueDateTimeInput.setAttribute('type', 'datetime-local');
    todo.getDueDateTime() && ( dueDateTimeInput.value = todo.getDueDateTime() ) //short circuiting logical AND

    //todo priority selector element
    const prioritySelect = document.createElement('select');
    const priorityOptGroup = document.createElement('optgroup'); //labeled wrapper
    priorityOptGroup.label = 'Priority:';
    const highOption = document.createElement('option');
    highOption.value = 'high';
    highOption.text = 'high';
    const normalOption = document.createElement('option');
    normalOption.value = 'normal';
    normalOption.text = 'normal';
    const lowOption = document.createElement('option');
    lowOption.value = 'low';
    lowOption.text = 'low';
    //need to show selected from priority level and set styling class.
    switch ( todo.getPriorityLevel() ) {
      case 'normal':
        normalOption.selected = true;
        todoWrap.classList.add( 'normalPriority' )
        break;
      case 'high':
        highOption.selected = true;
        todoWrap.classList.add( 'highPriority' )
        break;
      case 'low':
        lowOption.selected = true;
        todoWrap.classList.add( 'lowPriority' )
    }

    //set class/data attributes for elems
    Object.entries( //object of elems to set attributes on goes here
      { todoWrap, todoExpandBtn, todoTitleInput,completionBoxInput,
      todoNotesInput,dueDateTimeInput,prioritySelect }
    ).forEach( ( [ key, elem ] )=> { //destructuring assignment to parameters from current key/value pair array
      elem.classList.add( key ); //set class from element reference name
      if ( ['todoNotesInput', 'dueDateTimeInput', 'prioritySelect'].includes(key) ) { //add extra classes to specific elems
        if ( !todo.getOpenState() ){ 
          elem.classList.add('noDisplay');
        }
      }
      elem.setAttribute('data-todo-id', `${ todo.getTodoID() }`); //set identifier
    } );
    
    //append children to their wrappers
    priorityOptGroup.append( highOption, normalOption, lowOption );
    prioritySelect.append( priorityOptGroup );
    todoWrap.append(todoExpandBtn, todoTitleInput, completionBoxInput, todoNotesInput, dueDateTimeInput, prioritySelect);
    todosWrap.append( todoWrap )
  } );
}

//make seeds of data projects need to be rebuilt, store them in localStorage.
const storeProjectSeeds = ( projectsArr = appFlow.getProjectsArr() )=> {
  const projectSeedsArr = [];
  projectsArr.forEach( project=> {
    //make a seed data object (of JSON formatted data strings) from project to se/deserialize.
    const projectSeed = {}
    //Store only data of properties you need
    Object.keys(project)
    .filter( key=> ['getProjectID','getTitle','getDescription','getTodoCreationID'].includes(key) )
    .forEach( key=> {
      if ( key === 'getTitle' ) {
        projectSeed[ key[3].toLowerCase() + key.slice(4) ] = project.getTitle() ? project.getTitle() : ''; //set empty string for JSON if undefined is returned
      }
      if ( key === 'getDescription' ) {
        projectSeed[ key[3].toLowerCase() + key.slice(4) ] = project.getDescription() ? project.getDescription() : '';
      }
      else {
        //compute property names for the projectSeed object and method names to call from the source object in square brackets:
        projectSeed[ key[3].toLowerCase() + key.slice(4) ] = project[key]();
      }
    } );
    //make and add seed object for this project's todos
    projectSeed.todosSeed = makeTodosSeed( project );
    projectSeedsArr.push( projectSeed );
  } );
  localStorage.setItem( 'projectSeedsArr', JSON.stringify( projectSeedsArr ) );
  // lg( projectSeedsArr ); //testing
  // lg( JSON.parse( localStorage.getItem('projectSeedsArr') ) ); //testing
}

//make a seed object for the todos of a project. it should hold objects with data for each todo. project passed in is the current project used within storeProjectSeeds
const makeTodosSeed = project=> {
  const todoSeed = {};
  //*remember to clear local storage first in dev to have the first todo
  lg( project.getTodosArr() )
  

  








  return todoSeed;
}


// lg(globalThis) //webpack executes your code with its own module scope to avoid polluting the global scope!!!

//application flow has an arrow function IIFE that returns an object (with state) to access via appFlow variable
const appFlow = ( ()=> {
  let projectsArr = [], projectCreationID = 0;
  //base elements
  const addProjectBtn = document.createElement('button');
  addProjectBtn.className = 'addProjectBtn';
  addProjectBtn.textContent = 'New Project';
  addProjectBtn.addEventListener( 'click', e=> {
    projectsArr.push( makeProject(projectCreationID) );
    projectCreationID++;
    projectsWrap.innerHTML = ''; //wipe container first
    projectsArr.forEach( project=> appendProject( project, projectsWrap ) );
    // lg( 'project added, new projectsArr: ' );
    // lg( projectsArr );

    //update localStorage...
    storeProjectSeeds();
  } );
  const projectsWrap = document.createElement('div');
  projectsWrap.className = 'projectsWrap';
  //append base elements
  document.querySelector('body').append( addProjectBtn, projectsWrap );

  //check for anything useful in localStorage from previous page visit
  const projectSeedsArr = JSON.parse( localStorage.getItem('projectSeedsArr') );
  if ( Array.isArray( projectSeedsArr ) ) {
    lg( 'useful localStorage data found, listing project seeds:' );
    projectSeedsArr.forEach( projectSeed=> {
      lg( projectSeed ); //testing
      projectsArr.push( makeProject( projectSeed.projectID, projectSeed ) );
      projectCreationID = projectSeed.projectID + 1;//one higher than last added project id
    } );
    lg( 'new projectCreationID: ' + projectCreationID );
  }
  else {
    lg( 'no useful localStorage data found, starting fresh...' );
    //if local storage has no projectSeedsArr entry:
    //make new project(s) with ID from a counter, push it in, increment ID creation counter
    projectsArr.push( makeProject(projectCreationID) );
    projectCreationID++;
    // projectsArr.push( makeProject(projectCreationID) ); //another empty project, looks nice
    // projectCreationID++;
    //first run: first project should have one todo
    projectsArr[0].addTodo();
  }

  //render all projects
  projectsArr.forEach( project=> appendProject( project, projectsWrap ) );

  //remove project from projectsArr via ID ...refactor out for SOLID
  const removeProject = id=> {
    //filter returns a shallow copy, use instead of a loop with in place splice
    projectsArr = projectsArr.filter( project=> project.getProjectID() !== +id );
    //Setting innerHTML to empty string: removes child elems & their event listeners
    projectsWrap.innerHTML = '';
    projectsArr.forEach( project=> appendProject( project, projectsWrap ) );
    storeProjectSeeds(); //projectsArr modified, update localStorage
  }
  
  //store project seed objects in localStorage
  storeProjectSeeds(projectsArr); //projectsArr needs to be passed in first time.

  return {
    getProjectsArr: ()=> projectsArr,
    removeProject
  }
} )();