/* Next task:
-  after changing the title of a todo, if a rerender occurs, logic is needed to render the title for the todo if it is not the default value. other parts in a todo need this logic check too, maybe make it a function
- refactor the use of the data attributes after a loop was set to add them in renderProject()
-todo expansion button,project title/desc inputs should all be identified BY THEIR CLASS in the listener. Also, the loops adding the data attributes should also be able to add the class names since they are the same, even if not needed.
*/

// imports
import './styles.css'
import { logToConsole as lg, tableToConsole as tb} from "./logger"; //shorthand loggers

//project objects
//have: project ID, title, description, 
//do: store todos, create them, remove completed ones.
const makeProject = projectID=> {
  let title = '', titlePlaceholder = '...Project Title',
      description = '', descriptionPlaceholder = '...Project Description',
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
//project rendering module, called from appFlow module with project obj
const renderProject = project=> {
  //make each project div's title/desc/buttons/etc. children
  const projectWrap = document.createElement('div');
  const titleInput = document.createElement('input'); //title
  titleInput.placeholder = `${ project.getTitlePlaceholder() }`;
  const descriptionInput = document.createElement('input'); //description
  descriptionInput.placeholder = `${ project.getDescriptionPlaceholder() }`;
  const removeProjectBtn = document.createElement('button'); //remove project button (needs confirm)
  removeProjectBtn.textContent = 'remove project ❌';
  const clearDoneTodosBtn = document.createElement('button'); //remove completed todos button (needs confirm)
  clearDoneTodosBtn.textContent = 'clear done todos 🗑';
  const addTodoBtn = document.createElement('button'); //add todo button
  addTodoBtn.textContent = 'add todo➕';
  const projectBtnsWrap = document.createElement('div'); //btns wrapper
  projectBtnsWrap.append( removeProjectBtn, clearDoneTodosBtn, addTodoBtn );
  //todos wrapper, append todos to it
  const todosWrap = document.createElement('div');
  //fill the todos wrapper
  renderTodos( project, todosWrap );
  //set data & class attributes from reference names via the keys of an object. Object.entries(object) returns an array of [key,value] pair arrays
  Object.entries(
    { projectWrap,titleInput,descriptionInput,removeProjectBtn,clearDoneTodosBtn,addTodoBtn,projectBtnsWrap,todosWrap }
  ).forEach( c=> {
      // lg( c[1].className = c[0] ) //remember, working within a console.log will log the value of the assignment
      c[1].className = c[0];
      c[1].setAttribute( 'data-project-id', project.getProjectID() );
  } );
  //fill project with its children and its parent with itself
  projectWrap.append(titleInput, descriptionInput, projectBtnsWrap, todosWrap);
  document.querySelector('#projectsWrap').append( projectWrap );
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

    //handle todo expansion button clicks
    if ( e.target.tagName === 'BUTTON' && e.target.dataset.todoId ) {
      e.target.textContent = e.target.textContent === '▼' ? '▲' : '▼';
      //iterate through all elements in a todo and give some a hiding class
      Array.from(e.target.parentElement.children).forEach( (elem,i)=>{
        if (i>2) { elem.classList.toggle('noDisplay') }
      } );
    }

    //handle clicks on completion checkbox inputs to toggle completed states of todos
    if ( e.target.className === 'completionBox' ) {
      project.getTodosArr().forEach( todo=> { //find the todo to toggle its completed state
        if ( todo.getTodoID() === +e.target.dataset.todoId ) {
          todo.toggleCompletedState();
        }
      } );
    }

    //handle clicks on clear done todos buttons
    if ( e.target.className === 'clearDoneTodosBtn' ) {
      project.removeCompletedTodos(); //filter out project's completed todos
      renderTodos( project, todosWrap ); //then rerender todos
    }

    // handle add todo button clicks, rerender todos
    if ( e.target.className === 'addTodoBtn' ) {
      project.addTodo();
      renderTodos( project, todosWrap )
    }

  });

  //handle the bubbling focusout events when inputs lose focus
  projectWrap.addEventListener( 'focusout' , e=> {
    e.stopPropagation();
    // lg('this lost focus: ' + e.target.outerHTML ); // nice output of element in console

    //handle project's title edits
    if ( e.target.tagName === 'INPUT' && e.target.placeholder === '...Project Title' ) {
      lg( 'old project title: ' + project.getTitle() ); //get from 'free variable' of getTitle() closure
      project.setTitle(e.target.value); //set 'free variable' of setTitle() closure
      lg( 'new project title: ' + project.getTitle() );
    }

    //handle project's description edits
    if (e.target.tagName === 'INPUT' && e.target.placeholder === '...Project Description') {
      lg('old project description: ' + project.getDescription());
      project.setDescription(e.target.value);
      lg('new project description: ' + project.getDescription());
    }

    //handle individual todo title edits
    if ( e.target.className === 'todoTitle' ) {
      //find the correct todo object, set its new title string
      project.getTodosArr()
        .find( todo=> todo.getTodoID() === +e.target.dataset.todoId )
        .setTitle(e.target.value);
      //testing
      lg( 'new todo title:' + project.getTodosArr().find( todo=> todo.getTodoID() === +e.target.dataset.todoId ).getTitle() );
    }

    //handle individual todo notes edits
    if ( e.target.className === 'todoNotes' ) {
      //find the correct todo object, set its new notes string
      project.getTodosArr()
      .find( todo=> todo.getTodoID() === +e.target.dataset.todoId ) //make sure the data attribute exists!!
      .setNotes(e.target.value);
      //testing
      lg( 'new todo notes:' + project.getTodosArr().find( todo=> todo.getTodoID() === +e.target.dataset.todoId ).getNotes() );
    }

  });
}

//todo objects
//made by passing in a number type argument for ID
//have: title, notes, due date/time, priorityLevel, completion state
const makeTodo = id=> {
  let title = '', titlePlaceholder = '...Untitled Todo', dueDate = '', dueTime = '',
      notes = '', notesPlaceholder = '...add notes',
      priorityLevel = 'normal', completedState = false;
  //fn to toggle completedState of a todo instance. somehow call from a checkbox event listener, maybe choose the todo object using the id from a data-* attribute?
  const toggleCompletedState = ()=> completedState = completedState ? false : true;
  //fn to set priority level of a todo instance to 'high','normal',or 'low'
  const setPriorityLevel = newLevel=> priorityLevel = newLevel;

  return { //public exposure
    getTodoID: ()=> id,
    getTitle: ()=> title,
    setTitle: newTitle=> title = newTitle,
    getTitlePlaceholder: ()=> titlePlaceholder,
    getNotes: ()=> notes,
    setNotes: newNotes=> notes = newNotes,
    getNotesPlaceholder: ()=> notesPlaceholder,
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
  lg(`renderTodos invoked for project with ID ${project.getProjectID()}. removing existing todos first...`)
  todosWrap.innerHTML = ''; // clear any existing todos...
  // lg( `project ${project.getProjectID()}'s Todos to render: ` )
  // lg( project.getTodosArr() )
  project.getTodosArr().forEach( todo=> {
    //make the todo's html elements.
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todoDiv';
    const todoExpandBtn = document.createElement('button');
    todoExpandBtn.textContent = '▼'; //opposite: ▲
    const todoTitle = document.createElement('input')
    todoTitle.className = 'todoTitle';
    todoTitle.placeholder = todo.getTitlePlaceholder();
    const completionBox = document.createElement('input'); //completed state checkbox
    completionBox.className = 'completionBox';
    completionBox.setAttribute('type','checkbox');
    completionBox.checked = todo.getCompletedState();
    const todoNotes = document.createElement('input');
    todoNotes.className = 'todoNotes noDisplay';
    todoNotes.placeholder = todo.getNotesPlaceholder();
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

    //set data attribute for children of the todoDiv
    [todoExpandBtn, todoTitle, completionBox, todoNotes, dueDateTime, prioritySelect]
      .forEach( elem=> elem.setAttribute( 'data-todo-id', `${todo.getTodoID()}` ) );
    //append todo's children
    todoDiv.append(todoExpandBtn, todoTitle, completionBox, todoNotes, dueDateTime, prioritySelect);
    //append todo to wrapper in project
    todosWrap.append( todoDiv )
  } );
}


//application flow has an arrow function IIFE that returns an object (with state) to access via appFlow variable
// lg(globalThis) //webpack executes your code with its own module scope to avoid polluting the global scope!!!
const appFlow = ( ()=> {
  //store projects in an array. later, default to one project if the localStorage doesn't have any
  let projectsArr = [], projectCreationID = 0;

  //need to wrap projects in a container that can be wiped for rerender
  const projectsWrap = document.createElement('div');
  projectsWrap.id = 'projectsWrap';
  document.querySelector('body').append( projectsWrap );

  //if local storage is devoid of projects...
  //localStorage checking logic goes here...
  //...make a new one with ID from a counter, push it in, and increment ID counter:
  projectsArr.push( makeProject(projectCreationID) );
  projectCreationID++;
  projectsArr.push( makeProject(projectCreationID) ); //extra project for testing
  projectCreationID++;

  //todo rendering testing
  for (let runs = 1; runs<=3; runs++) { projectsArr[0].addTodo() };
  for (let runs = 1; runs<=4; runs++) { projectsArr[1].addTodo() };

  //render each project
  projectsArr.forEach( project=> renderProject(project) );

  //save projects to localStorage....instead of deep cloning, need to save only necessary objects and use them to build new ones after. below is a useless shallow clone attempt, do not use
  // localStorage.setItem( '[TBD]projects in this device\'s localStorage: ', JSON.stringify(projectsArr) );

  //remove project from projectsArr via ID
  const removeProject = id=> {
    //filter returns a shallow copy, use instead of a loop with in place splice
    projectsArr = projectsArr.filter( project=> project.getProjectID() !== +id ); //unary plus for number from string
    //removes all nodes, ok to use since non user generated code. Setting innerHTML to an empty string removes all child elements and event listeners attached to them.
    document.querySelector('#projectsWrap').innerHTML = '';
    projectsArr.forEach( project=> renderProject(project) );
  }

  //todo objects functionality testing
  //make some todos, remove some, then log existing ones
  // lg ( 'making 5 todos in first project...' )
  // for (let runs = 1; runs<=5; runs++) { projectsArr[0].addTodo() };
  // lg('setting a todo\'s priority level and logging all for comparison..')
  // projectsArr[0].getTodosArr()[2].setPriorityLevel('high')
  // projectsArr[0].getTodosArr().forEach( (todo, i)=> lg( `priorityLevel of todo at index ${i}: ${todo.getPriorityLevel()}`))
  return {
    getProjectsArr: ()=> projectsArr,
    removeProject
  }
})();


// lg( appFlow.getProjectsArr() ) //testing