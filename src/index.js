/*-- Next tasks:

--- Optional tasks:
- add confirm popup for remove project /clear todos buttons.
- rerenders via appendTodos() clear out everything first, maybe implement a flag to only delete and append the item being rerendered with an index? or does react's virtual dom handle this?
-enable wrapping for DueDateTime inputs via a 3rd party library for date/time pickers
*/

// imports
import './styles.css'
import { logToConsole as lg, tableToConsole as tb} from "./logger"; //shorthand loggers

//project objects
//do: store todos, create them, remove completed ones.
//overwrite project values from localStorage project seed objects if provided
const makeProject = (projectID, projectSeed)=> {
  let title, titlePlaceholder = '...Project Title',
      description, descriptionPlaceholder = '...Description',
      todoCreationID = 0, todosArr = [];

  if ( projectSeed ) { //overwrite from seed if it is passed in
    //overwrite project variables using object destructuring from the projectSeed obj.
    //Parenthesis force the JS engine to evaluate as an expression including the object pattern to destructure, instead of a block statement.
    ( { title, description, todoCreationID } = projectSeed );
    //remake todos for their project's todosArray from todosSeedsArr
    projectSeed.todoSeedsArr.forEach( todoSeed=> {
      lg( 'found todo seed:' );
      lg( todoSeed );
      // use ID from seed, set counter in project for next if needed
      todosArr.push( makeTodo( todoSeed.todoID, todoSeed ) );
      todoCreationID = todoSeed.todoID + 1;
    } );
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
  
  const projectTitleTextArea = document.createElement('textarea');
  projectTitleTextArea.placeholder = project.getTitlePlaceholder(); //always set this
  project.getTitle() && ( projectTitleTextArea.value = project.getTitle() );

  const projectDescriptionTextArea = document.createElement('textarea');
  projectDescriptionTextArea.placeholder = project.getDescriptionPlaceholder(); //always set this
  project.getDescription() && ( projectDescriptionTextArea.value = project.getDescription() );

  const projectBtnsWrap = document.createElement('div');
  const removeProjectBtn = document.createElement('button');
  removeProjectBtn.textContent = 'remove project ❌';
  const clearDoneTodosBtn = document.createElement('button');
  clearDoneTodosBtn.textContent = 'clear done todos 🗑';
  const addTodoBtn = document.createElement('button');
  addTodoBtn.textContent = 'add todo➕';

  const todosWrap = document.createElement('div');
  //set class/data attributes to elems from their reference names via the keys of an object. Object.entries({elements object}) returns an array of [key,value] pair arrays
  Object.entries(
    { projectWrap,projectTitleTextArea,projectDescriptionTextArea,removeProjectBtn,
    clearDoneTodosBtn,addTodoBtn,projectBtnsWrap,todosWrap }
  ).forEach( ( [ key, elem ] )=> { //destructuring assignment to parameters from current key/value pair array
    elem.className = key;
    elem.setAttribute( 'data-project-id', project.getProjectID() );
    key.includes('TextArea') && ( elem.rows = 1 );//textarea elems must start with 1 row
  } );
  //append children to their wrappers
  projectBtnsWrap.append( removeProjectBtn, clearDoneTodosBtn, addTodoBtn );
  appendTodos( project, todosWrap );
  projectWrap.append(projectTitleTextArea, projectDescriptionTextArea, projectBtnsWrap, todosWrap);
  projectsWrap.append( projectWrap );
  // after textarea elements are appended, call the auto height resizer for the ones displayed. call resizer for textareas with display:none from expand btn listener
  document.querySelectorAll('textarea:not(.noDisplay)')
  .forEach( elem=> textAreaResize(elem) );
  //add event listeners
  addProjectListeners( projectWrap,project );
}

// auto height resizing for textarea elements pegged to their content
const textAreaResize = textarea=> {
  textarea.style.height = 'auto'; //resets height to handle content decreases
  textarea.style.height = (textarea.scrollHeight) + 'px';
}

//add event listeners to each projectWrap that use bubbling of events from children
const addProjectListeners = (projectWrap, project)=> {
  //if listener removal is needed in future, make an AbortController here and pass its signal in the addEventListener options
  projectWrap.addEventListener( 'click' , e=> {
    e.stopPropagation();
    //multi use variable for cleaner invocations later
    const todosWrap = document.querySelector(`.todosWrap[data-project-id='${ e.target.dataset.projectId }']`)

    //handle project removal with: removeProject(project_id)
    if ( e.target.className === 'removeProjectBtn' ) {
      removeProject( e.target.dataset.projectId );

      storeProjectSeeds(); //update localStorage
    }

    //handle todo expansion button clicks, store open state for rerenders...
    if ( e.target.className === 'todoExpandBtn' ) {
      const todo = project.getTodosArr().find( todo=> todo.getTodoID() === +e.target.dataset.todoId);
      e.target.textContent = e.target.textContent === '▼' ? '▲' : '▼';
      Array.from(e.target.parentElement.children).forEach( (elem,i)=> {
        i>2 && ( elem.classList.toggle('noDisplay') )// hide unecessary children
      } );
      todo.setOpenState( todo.getOpenState() ? false : true );

      storeProjectSeeds(); //update localStorage
    }

    // Handle clicks on completion checkbox inputs to toggle completed states of todos
    if (e.target.classList.contains('completionBoxInput')) {
      project.getTodosArr().find(todo => todo.getTodoID() === +e.target.dataset.todoId).toggleCompletedState();

      storeProjectSeeds(); //update localStorage
    }

    //handle clicks on clear done todos buttons
    if ( e.target.className === 'clearDoneTodosBtn' ) {
      project.removeCompletedTodos(); //filter out project's completed todos
      appendTodos( project, todosWrap ); //then rerender todos

      storeProjectSeeds(); //update localStorage
    }

    // handle add todo button clicks, rerender todos
    if ( e.target.className === 'addTodoBtn' ) {
      project.addTodo();
      appendTodos( project, todosWrap );

      storeProjectSeeds(); //update localStorage
    }

  } );

  //handle the bubbling focusout events when elements lose focus
  projectWrap.addEventListener( 'focusout' , e=> {
    e.stopPropagation();
    //handle project's title edits
    if ( e.target.className === 'projectTitleTextArea' ) {
      project.setTitle(e.target.value);

      textAreaResize(e.target); //auto resizing
      storeProjectSeeds(); //update localStorage
    }

    //handle project's description edits
    if ( e.target.className === 'projectDescriptionTextArea' ) {
      project.setDescription(e.target.value);

      textAreaResize(e.target);
      storeProjectSeeds(); //update localStorage
    }

    //handle individual todo title edits
    if ( e.target.className === 'todoTitleTextArea' ) {
      project.getTodosArr()
      .find( todo=> todo.getTodoID() === +e.target.dataset.todoId )
      .setTitle(e.target.value);
      
      textAreaResize(e.target);
      storeProjectSeeds(); //update localStorage
    }

    //handle individual todo notes edits
    if ( e.target.className === 'todoNotesTextArea' ) {
      project.getTodosArr()
      .find( todo=> todo.getTodoID() === +e.target.dataset.todoId )
      .setNotes(e.target.value);

      textAreaResize(e.target);
      storeProjectSeeds(); //update localStorage
    }

  } );

  //handle the bubbling change events, usually when elements lose focus
  projectWrap.addEventListener( 'change' , e=> {
    e.stopPropagation();
    const todosWrap = document.querySelector(`.todosWrap[data-project-id='${ e.target.parentElement.parentElement.dataset.projectId }']`)

    //handle individual todo due date/time setting by calling todo.setDueDateTime()
    //info: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local
    //lg( new Date().toISOString().slice(0,16) ); // YYYY-MM-DDThh:mm format string value for <input type="datetime-local">
    if ( e.target.className === 'dueDateTimeInput' ) {
      // lg('old todo dueDateTime:' + project.getTodosArr().find(todo=> todo.getTodoID() === +e.target.dataset.todoId).getDueDateTime() );

      project.getTodosArr()
      .find( todo=> todo.getTodoID() === +e.target.dataset.todoId )
      .setDueDateTime(e.target.value);

      storeProjectSeeds(); //update localStorage
      // lg('new todo dueDateTime:' + project.getTodosArr().find(todo=> todo.getTodoID() === +e.target.dataset.todoId).getDueDateTime() );
    }

    //handle changes to selects with class 'prioritySelect'
    if ( e.target.className === 'prioritySelect' ) {
      // lg('old todo priority:' + project.getTodosArr().find(todo=> todo.getTodoID() === +e.target.dataset.todoId).getPriorityLevel() );

      project.getTodosArr()
      .find( todo=> todo.getTodoID() === +e.target.dataset.todoId )
      .setPriorityLevel(e.target.value); // target.value is 'high'/'normal'/'low'
      
      appendTodos( project, todosWrap ) //rerender for css

      storeProjectSeeds(); //update localStorage
      // lg('new todo priority:' + project.getTodosArr().find(todo=> todo.getTodoID() === +e.target.dataset.todoId).getPriorityLevel() );
    }

  } );

}

//todo objects
//pass in a number type for ID, optional localStorage seed
//have: title, notes, due date/time, priorityLevel, completion state
//do: toggle their own completed state
const makeTodo = (id, todoSeed)=> {
  let title, titlePlaceholder = '...Untitled Todo',
      notes, notesPlaceholder = '...Notes',
      dueDateTime, priorityLevel = 'normal', completedState = false,
      openState = false;

  //overwrite from seed if it is passed in as an argument
  if ( todoSeed ) {
    //overwrite todo vars via object destructuring & parentheses
    ( { completedState,dueDateTime,notes,openState,priorityLevel,title } = todoSeed );
  }
      
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
  todosWrap.innerHTML = ''; // clear any existing todos...
  //rebuild from project's todos array
  project.getTodosArr().forEach( todo=> {
    //make the todo's html elements:
    const todoWrap = document.createElement('div');

    const todoExpandBtn = document.createElement('button');
    if ( !todo.getOpenState() ) { todoExpandBtn.textContent = '▼' }
      else { todoExpandBtn.textContent = '▲' }

    const todoTitleTextArea = document.createElement('textarea');
    todoTitleTextArea.placeholder = todo.getTitlePlaceholder(); //always set
    todo.getTitle() && ( todoTitleTextArea.value = todo.getTitle() );

    const completionBoxInput = document.createElement('input'); //completed state checkbox
    completionBoxInput.setAttribute('type','checkbox');
    completionBoxInput.checked = todo.getCompletedState();

    const todoNotesTextArea = document.createElement('textarea');
    todoNotesTextArea.placeholder = todo.getNotesPlaceholder(); //always set
    todo.getNotes() && ( todoNotesTextArea.value = todo.getNotes() )

    //todo due date/time picker
    const dueDateTimeInput = document.createElement('input');
    dueDateTimeInput.setAttribute('type', 'datetime-local');
    todo.getDueDateTime() && ( dueDateTimeInput.value = todo.getDueDateTime() )

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

    //set class/data attributes for elems from element reference names
    Object.entries( //object of elems to set attributes on goes here
      { todoWrap, todoExpandBtn, todoTitleTextArea,completionBoxInput,
      todoNotesTextArea,dueDateTimeInput,prioritySelect }
    ).forEach( ( [ key, elem ] )=> { //destructuring assignment to parameters from current key/value pair array
      elem.classList.add( key );
      //add extra classes to specific elems
      if ( ['todoNotesTextArea', 'dueDateTimeInput', 'prioritySelect'].includes(key) ) { 
        if ( !todo.getOpenState() ){ 
          elem.classList.add('noDisplay');
        }
      }
      //change textarea elems to start with 1 row
      key.includes('TextArea') && ( elem.rows = 1 );
      elem.setAttribute('data-todo-id', `${ todo.getTodoID() }`);
    } );
    
    //append children to their wrappers
    priorityOptGroup.append( highOption, normalOption, lowOption );
    prioritySelect.append( priorityOptGroup );
    todoWrap.append(todoExpandBtn, todoTitleTextArea, completionBoxInput, todoNotesTextArea, dueDateTimeInput, prioritySelect);
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
      else if ( key === 'getDescription' ) {
        projectSeed[ key[3].toLowerCase() + key.slice(4) ] = project.getDescription() ? project.getDescription() : '';
      }
      else {
        //compute property names for the projectSeed object and method names to call from the source object in square brackets:
        projectSeed[ key[3].toLowerCase() + key.slice(4) ] = project[key]();
      }
    } );
    //make and add seed object for this project's todos
    projectSeed.todoSeedsArr = makeTodoSeedsArr( project );
    projectSeedsArr.push( projectSeed );
  } );
  localStorage.setItem( 'projectSeedsArr', JSON.stringify( projectSeedsArr ) );
}

//return array of todo seed objects for the current project for rebuilding
const makeTodoSeedsArr = project=> {
  const todoSeedsArr = [];
  //**remember to clear local storage first in dev to have the first todo
  //make each todoSeed
  project.getTodosArr().forEach( todo=> {
    const todoSeed = {};
    //Store only data of properties you need
    Object.keys( todo )
    .filter( key=> ['getTodoID','getTitle','getNotes','getDueDateTime','getPriorityLevel','getCompletedState','getOpenState'].includes(key) )
    .forEach( key=> {
      switch (key) {
        case 'getTitle':
          todoSeed[ key[3].toLowerCase() + key.slice(4) ] = todo.getTitle() ? todo.getTitle() : ''; //set empty string for JSON if undefined is returned
          break;
        case 'getNotes':
          todoSeed[ key[3].toLowerCase() + key.slice(4) ] = todo.getNotes() ? todo.getNotes() : '';
          break;
        case 'getDueDateTime':
          todoSeed[ key[3].toLowerCase() + key.slice(4) ] = todo.getDueDateTime() ? todo.getDueDateTime() : '';
          break;
        default:
          //compute rest of property names for the todoSeed obj and methods to call from the current todo obj in square brackets:
          todoSeed[ key[3].toLowerCase() + key.slice(4) ] = todo[key]();
      }
    } );
    todoSeedsArr.push( todoSeed );
  } );

  return todoSeedsArr;
}

// lg(globalThis) //webpack executes your code with its own module scope to avoid polluting the global scope!!!

//remove project from projectsArr, pass in ID
const removeProject = id=> {
  const projectsWrap = appFlow.getProjectsWrap();
  let projectsArr = appFlow.getProjectsArr();
  //filter returns a shallow copy array, ie. same objects
  appFlow.setProjectsArr( projectsArr.filter( project=> project.getProjectID() !== +id ) );
  //Setting innerHTML to empty string: removes child elems & their event listeners
  projectsWrap.innerHTML = '';
  //get the recently set projectsArr and append the projects
  projectsArr = appFlow.getProjectsArr();
  projectsArr.forEach( project=> appendProject( project, projectsWrap ) );
}

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

    storeProjectSeeds(); //update localStorage...
  } );
  const projectsWrap = document.createElement('div');
  projectsWrap.className = 'projectsWrap';
  //append base elements
  document.querySelector('body').append( addProjectBtn, projectsWrap );

  //check for anything useful in localStorage from previous page visit
  const projectSeedsArr = JSON.parse( localStorage.getItem('projectSeedsArr') );
  if ( Array.isArray( projectSeedsArr ) ) {
    projectSeedsArr.forEach( projectSeed=> {
      lg( 'found project seed:' );
      lg( projectSeed ); //testing
      projectsArr.push( makeProject( projectSeed.projectID, projectSeed ) );
      projectCreationID = projectSeed.projectID + 1;//one higher than last added project id
    } );
  }
  else {
    lg( 'no useful localStorage data found, starting fresh...' );
    //if local storage has no projectSeedsArr entry:
    //make new project(s) with ID from a counter, push it in, increment ID creation counter
    projectsArr.push( makeProject(projectCreationID) );
    projectCreationID++;
    projectsArr[0].addTodo();//first run: first project should have one todo
  }

  //render all projects
  projectsArr.forEach( project=> appendProject( project, projectsWrap ) );
  
  //store project seed objects in localStorage
  storeProjectSeeds(projectsArr); //projectsArr needs to be passed in first time.

  return {
    getProjectsArr: ()=> projectsArr,
    setProjectsArr: newProjectsArr=> projectsArr = newProjectsArr,
    getProjectsWrap: ()=> projectsWrap,
  }
} )();