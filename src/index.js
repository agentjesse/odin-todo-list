/*-- Next tasks:
- implement use of localStorage to save data on the user’s computer as JSON and rebuild from them if some were there from previous session.

--- Optional tasks:
- rerenders via appendTodos() clear out everything first, maybe implement a flag to only delete and append the item being rerendered with an index? or does react's virtual dom handle this?
*/

// imports
import './styles.css'
import { logToConsole as lg, tableToConsole as tb} from "./logger"; //shorthand loggers

//project objects
//have: project ID, title, description, 
//do: store todos, create them, remove completed ones.
const makeProject = projectID=> {
  let title, titlePlaceholder = '...Project Title',
      description, descriptionPlaceholder = '...Project Description',
      todoCreationID = 0, todosArr = [];

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
      //iterate through all elements in a todo and give some a hiding class
      Array.from(e.target.parentElement.children).forEach( (elem,i)=>{
        if (i>2) { elem.classList.toggle('noDisplay') }
      } );
      // lg( 'clicked expansion button for todo: ' + e.target.dataset.todoId )
      todo.setOpenState( todo.getOpenState() ? false : true );
      // lg( 'new todo open state:' + todo.getOpenState() );
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
      appendTodos( project, todosWrap )
    }

  } );

  //handle the bubbling focusout events when inputs lose focus
  projectWrap.addEventListener( 'focusout' , e=> {
    e.stopPropagation();
    // lg('this lost focus: ' + e.target.outerHTML ); // nice output of element in console

    //handle project's title edits
    if ( e.target.className === 'projectTitleInput' ) {
      // lg( 'old project title: ' + project.getTitle() ); //get from 'free variable' of getTitle() closure
      project.setTitle(e.target.value); //set 'free variable' of setTitle() closure
      // lg( 'new project title: ' + project.getTitle() );
    }

    //handle project's description edits
    if ( e.target.className === 'projectDescriptionInput' ) {
      // lg('old project description: ' + project.getDescription());
      project.setDescription(e.target.value);
      // lg('new project description: ' + project.getDescription());
    }

    //handle individual todo title edits
    if ( e.target.className === 'todoTitleInput' ) {
      //find the correct todo object, set its new title string
      project.getTodosArr()
        .find( todo=> todo.getTodoID() === +e.target.dataset.todoId )
        .setTitle(e.target.value);
      //testing
      // lg( 'new todo title:' + project.getTodosArr().find( todo=> todo.getTodoID() === +e.target.dataset.todoId ).getTitle() );
    }

    //handle individual todo notes edits
    if ( e.target.className === 'todoNotesInput' ) {
      //find the correct todo object, set its new notes string
      project.getTodosArr()
      .find( todo=> todo.getTodoID() === +e.target.dataset.todoId ) //make sure the data attribute exists!!
      .setNotes(e.target.value);
      // lg( 'new todo notes:' + project.getTodosArr().find( todo=> todo.getTodoID() === +e.target.dataset.todoId ).getNotes() );
    }

  } );

  //handle the bubbling change events when inputs lose focus
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
  //fn to toggle completedState of a todo instance. somehow call from a checkbox event listener, maybe choose the todo object using the id from a data-* attribute?
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
    todoExpandBtn.textContent = '▼'; //opposite: ▲
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

// lg(globalThis) //webpack executes your code with its own module scope to avoid polluting the global scope!!!

//application flow has an arrow function IIFE that returns an object (with state) to access via appFlow variable
const appFlow = ( ()=> {
  //store projects in an array. new ones made with an ID that is incremented
  let projectsArr = [], projectCreationID = 0;

  //make base elements
  //button to add a project to projects wrapper
  const addProjectBtn = document.createElement('button');
  addProjectBtn.className = 'addProjectBtn';
  addProjectBtn.textContent = 'New Project';
  addProjectBtn.addEventListener( 'click', e=> {
    projectsArr.push( makeProject(projectCreationID) );
    projectCreationID++;
    projectsWrap.innerHTML = ''; //wipe container first
    projectsArr.forEach( project=> appendProject( project, projectsWrap ) );
  } );
  document.querySelector('body').append( addProjectBtn );
  //projects wrapper
  const projectsWrap = document.createElement('div');
  projectsWrap.className = 'projectsWrap'; //maybe use for styling?
  document.querySelector('body').append( projectsWrap );

  //if local storage is devoid of projects...
  //localStorage checking logic goes here...
  //...make a new one with ID from a counter, push it in, and increment ID counter:
  projectsArr.push( makeProject(projectCreationID) );
  projectCreationID++;

  //first run: project[0] in projectArr should have one todo
  projectsArr[0].addTodo()

  //render each project
  projectsArr.forEach( project=> appendProject( project, projectsWrap ) );

  //save projects to localStorage....instead of deep cloning, need to save only necessary objects and use them to build new ones after. below is a useless shallow clone attempt, do not use
  // localStorage.setItem( '[TBD]projects in this device\'s localStorage: ', JSON.stringify(projectsArr) );

  //remove project from projectsArr via ID
  const removeProject = id=> {
    //filter returns a shallow copy, use instead of a loop with in place splice
    projectsArr = projectsArr.filter( project=> project.getProjectID() !== +id ); //unary plus for number from string
    //remove all nodes. it's ok to use innerHTML here since it's not user generated code. Setting innerHTML to an empty string removes all child elements and event listeners attached to them.
    projectsWrap.innerHTML = '';
    projectsArr.forEach( project=> appendProject( project, projectsWrap ) );
  }

  return {
    getProjectsArr: ()=> projectsArr,
    removeProject
  }
} )();