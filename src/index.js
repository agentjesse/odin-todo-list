// imports
import './styles.css'
import { logToConsole as lg, tableToConsole as tb} from "./logger"; //shorthand loggers

//project objects
//have: project ID, title, description, 
//do: store todos, create them, remove completed ones.
const makeProject = projectID=> {
  let title = '', titlePlaceholder = '...Project Title',
      description = '', descriptionPlaceholder = '...Project Description',
      todoCreationID = 0;
  const todosArr = [];

  const addTodo = ()=> { //keep here and use closure.
    todosArr.push( makeTodo(todoCreationID) ); // ID for each todo from counter
    todoCreationID++;
  }
  const removeCompletedTodos = (...removalIDs)=> { //pass in number type IDs of todos to delete
    removalIDs.forEach( removalID=> {
      for ( let currentTodoIndex = 0; currentTodoIndex<todosArr.length; currentTodoIndex++ ){
        //iterate through each todo until its ID matches removalID
        if ( todosArr[currentTodoIndex].getTodoID() === removalID ){
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
    setTitle: (newTitle)=> title = newTitle,
    getTitlePlaceholder: ()=> titlePlaceholder,
    getDescription: ()=> description,
    setDescription: (newDescription) => description = newDescription,
    getDescriptionPlaceholder: ()=> descriptionPlaceholder,
    getTodosArr: ()=> todosArr,
    addTodo,
    removeCompletedTodos,
  }
}
//project rendering module, called from appFlow module with project obj
const renderProject = project=> {
  //make each project div's title/desc/buttons/etc. children
  const projectDiv = document.createElement('div');
  projectDiv.className = 'projectDiv'; //project element identifiers
  projectDiv.setAttribute( 'data-project-id', `${ project.getProjectID() }`);
  const titleInput = document.createElement('input'); //title
  titleInput.placeholder = `${ project.getTitlePlaceholder() }`;
  const descriptionInput = document.createElement('input'); //description
  descriptionInput.placeholder = `${ project.getDescriptionPlaceholder() }`;
  const removeProjectBtn = document.createElement('button'); //remove project button (needs confirm)
  removeProjectBtn.className = 'removeProjectBtn';
  removeProjectBtn.textContent = 'remove project ❌';
  const removeCompletedTodosBtn = document.createElement('button'); //remove completed todos button (needs confirm)
  removeCompletedTodosBtn.className = 'removeCompletedTodosBtn';
  removeCompletedTodosBtn.textContent = 'clear done todos 🗑';
  const addTodoBtn = document.createElement('button'); //add todo button
  addTodoBtn.className = 'addTodoBtn';
  addTodoBtn.textContent = 'add todo➕';
  const projectBtnsWrap = document.createElement('div'); //btns wrapper
  projectBtnsWrap.className = 'projectBtnsWrap';
  projectBtnsWrap.append( removeProjectBtn, removeCompletedTodosBtn, addTodoBtn );
  //todos wrapper, append todos to it
  const todosWrap = document.createElement('div');
  todosWrap.className = 'todosWrap';
  renderTodos( project, todosWrap ); //fill the todos wrapper in other module, this one too busy
  //fill project and its parent with it
  projectDiv.append(titleInput, descriptionInput, projectBtnsWrap, todosWrap);
  document.querySelector('body').append( projectDiv );

  //add event listeners in other module
  addProjectListeners( projectDiv,project );
}

//add event listeners to each projectDiv that use bubbling of events from children
const addProjectListeners = (projectDiv, project)=> {
  //if listener removal is needed in future, make an AbortController here and pass its signal in the addEventListener options
  projectDiv.addEventListener( 'click' , e=> {
    e.stopPropagation();
    // lg('clicked: ' + e.target.outerHTML ); // nice output of element in console

    //handle todo expansion button clicks
    if ( e.target.tagName === 'BUTTON' && e.target.dataset.todoId ) {
      const btn = e.target;
      btn.textContent = btn.textContent === '▼' ? '▲' : '▼';
      //iterate through all elements in a todo and give some a hiding class
      Array.from(btn.parentElement.children).forEach( (element,i)=>{
        if (i>2) { element.classList.toggle('noDisplay') }
      } );
    }

    //handle project removal with: appFlow.removeProject(project_id)
    if ( e.target.className === 'removeProjectBtn' ) {
      appFlow.removeProject( e.target.parentElement.parentElement.dataset.projectId );
    }


  });

  //handle the bubbling focusout events when inputs lose focus
  projectDiv.addEventListener( 'focusout' , e=> {
    e.stopPropagation();
    lg('this lost focus: ' + e.target.outerHTML ); // nice output of element in console

    //handle project's title edits
    if ( e.target.tagName === 'INPUT' && e.target.placeholder === '...Project Title' ) {
      const titleInput = e.target;
      lg( 'old title: ' + project.getTitle() )
      project.setTitle(titleInput.value)
      lg( 'new title: ' + project.getTitle() )
    }

    //handle project's description edits
    if (e.target.tagName === 'INPUT' && e.target.placeholder === '...Project Description') {
      const descriptionInput = e.target;
      lg('old description: ' + project.getDescription())
      project.setDescription(descriptionInput.value)
      lg('new description: ' + project.getDescription())
    }

  });
}

//todo objects
//made by passing in a number type argument for ID
//have: title, notes, due date/time, priorityLevel, completion state
const makeTodo = id=> {
  let title = '...Untitled Todo', dueDate = '', dueTime = '',
      notes = '...add notes', priorityLevel = 'normal', completedState = false;
  //fn to toggle completedState of a todo instance. somehow call from a checkbox event listener, maybe choose the todo object using the id from a data-* attribute?
  const toggleCompletedState = ()=> completedState = completedState ? false : true;
  //fn to set priority level of a todo instance to 'high','normal',or 'low'
  const setPriorityLevel = newLevel=> priorityLevel = newLevel;

  return { //public exposure
    getTodoID: ()=> id,
    getTitle: ()=> title,
    getNotes: ()=> notes,
    getDueDate: ()=> dueDate,
    getDueTime: ()=> dueTime,
    getPriorityLevel: ()=> priorityLevel,
    setPriorityLevel,
    getCompletedState: ()=> completedState,
    toggleCompletedState,
  }
}
//Todo render module
const renderTodos = ( project, todosWrap )=> {
  // lg( `project ${project.getProjectID()}'s Todos to render: ` )
  // lg( project.getTodosArr() )
  project.getTodosArr().forEach( todo=>{
    //make the todo's html elements.
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todoDiv';
    const todoExpandBtn = document.createElement('button');
    todoExpandBtn.textContent = '▼'; //opposite: ▲
    todoExpandBtn.setAttribute( 'data-todo-id',`${ todo.getTodoID() }` );//for listener on project
    const todoTitle = document.createElement('input')
    todoTitle.className = 'todoTitle';
    todoTitle.placeholder = todo.getTitle();
    const completionBox = document.createElement('input'); //completed state checkbox
    completionBox.className = 'completionBox';
    completionBox.setAttribute('type','checkbox');
    completionBox.checked = todo.getCompletedState();
    const todoNotes = document.createElement('input');
    todoNotes.className = 'todoNotes noDisplay';
    todoNotes.placeholder = todo.getNotes();
    //todo due date/time picker. need to call setDueDate()
    //uses: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local
    const dueDateTime = document.createElement('input');
    dueDateTime.className = 'dueDateTime noDisplay';
    dueDateTime.setAttribute('type', 'datetime-local');
    //date/time pick testing
    //lg( new Date().toISOString().slice(0,16) ); //YYYY-MM-DDThh:mm format string is the value of <input type="datetime-local">

    //todo priority selector element
    const prioritySelect = document.createElement('select');
    prioritySelect.className = 'prioritySelect noDisplay';
    const highOption = document.createElement('option');
    highOption.value = 'high';
    highOption.text = 'high';
    const normalOption = document.createElement('option');
    normalOption.value = 'normal';
    normalOption.text = 'normal';
    normalOption.selected = true; //default. or assign with a switch: todo.getPriorityLevel()
    const lowOption = document.createElement('option');
    lowOption.value = 'low';
    lowOption.text = 'low';
    const priorityOptGroup = document.createElement('optgroup'); //labeled wrapper
    priorityOptGroup.label = 'Priority:';
    priorityOptGroup.append( highOption, normalOption, lowOption );
    prioritySelect.append( priorityOptGroup );

    //append todo's children
    todoDiv.append(todoExpandBtn, todoTitle, completionBox, todoNotes, dueDateTime, prioritySelect);
    //append todo to wrapper in project
    todosWrap.append( todoDiv )
  } );
}


//application flow has an arrow function IIFE that returns an object (with state) to access via appFlow variable
const appFlow = ( ()=> {
  //store projects in an array. later, default to one project if the localStorage doesn't have any
  let projectsArr = [], projectCreationID = 0;
  //if local storage is devoid of projects...
  //localStorage checking logic goes here...
  //...make a new one with ID from a counter, push it in, and increment ID counter:
  projectsArr.push( makeProject(projectCreationID) );
  projectCreationID++;
  projectsArr.push( makeProject(projectCreationID) ); //extra project for testing
  projectCreationID++;

  //todo rendering testing
  for (let runs = 1; runs<=2; runs++) { projectsArr[0].addTodo() };
  // for (let runs = 1; runs<=1; runs++) { projectsArr[1].addTodo() };

  //render each project
  projectsArr.forEach( project=> renderProject(project) );

  //save projects to localStorage....instead of deep cloning, need to save only necessary objects and use them to build new ones after. below is a useless shallow clone attempt, do not use
  // localStorage.setItem( '[TBD]projects in this device\'s localStorage: ', JSON.stringify(projectsArr) );

  //remove project from projectsArr via ID
  const removeProject = id=> {
    //filter returns a shallow copy, use instead of a loop with in place splice
    projectsArr = projectsArr.filter( project=> project.getProjectID() !== +id ); //unary plus for number from string
    //removes all nodes, ok to use since non user generated code. Setting innerHTML to an empty string removes all child elements and event listeners attached to them.
    document.querySelector('body').innerHTML = '';
    projectsArr.forEach( project=> renderProject(project) );
  }

  //todo objects functionality testing
  //make some todos, remove some, then log existing ones
  // lg ( 'making 5 todos in first project...' )
  // for (let runs = 1; runs<=5; runs++) { projectsArr[0].addTodo() };
  // lg( 'removing index 1 & 3 todos...' )
  // projectsArr[0].removeCompletedTodos(1,3);
  // projectsArr[0].getTodosArr().forEach( (todo, i)=> lg( `ID of todo at index ${i}: ${todo.getTodoID()}` ) );
  //test toggling completed state
  // lg('toggling a todo\'s completed state and logging all for comparison..')
  // projectsArr[0].getTodosArr()[2].toggleCompletedState()
  // projectsArr[0].getTodosArr().forEach( (todo, i)=> lg( `completedState of todo at index ${i}: ${todo.getCompletedState()}`))
  // lg('setting a todo\'s priority level and logging all for comparison..')
  // projectsArr[0].getTodosArr()[2].setPriorityLevel('high')
  // projectsArr[0].getTodosArr().forEach( (todo, i)=> lg( `priorityLevel of todo at index ${i}: ${todo.getPriorityLevel()}`))
  return {
    getProjectsArr: ()=> projectsArr,
    removeProject
  }
} )();


// lg( appFlow.getProjectsArr() ) //testing