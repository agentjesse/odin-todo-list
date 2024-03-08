/* Next task:
- make a button to add new project to the appFlow projectsArr
- add datetimeinput setting functionality
- add priotity color visualization and ordering (maybe use array sort?) functionality. red/yellow/green = high/norm/low colors, set left and right borders to show this.
-  after editing a todo, if a rerender occurs, logic is needed to render the actual data for the todo. other parts in a todo need this logic check too, maybe make it a function?
- implement use of localStorage to save data on the user’s computer as JSON and rebuild from them if some were there from previous session.
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
//project append module, called from appFlow module with project obj and projects wrapper elem
const appendProject = ( project, projectsWrap )=> {
  //make each project div's children. do any repetitive attribute setting later
  const projectWrap = document.createElement('div');
  const projectTitleInput = document.createElement('input');
  projectTitleInput.placeholder = `${ project.getTitlePlaceholder() }`;
  const projectDescriptionInput = document.createElement('input');
  projectDescriptionInput.placeholder = `${ project.getDescriptionPlaceholder() }`;
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
  ).forEach( ( [ key, elem ] )=> { //destructuring assignment of entries array!
    elem.className = key; //set class name
    elem.setAttribute( 'data-project-id', project.getProjectID() ); //set identifier
  } );
  //append children to their wrappers
  projectBtnsWrap.append( removeProjectBtn, clearDoneTodosBtn, addTodoBtn );
  renderTodos( project, todosWrap ); //this appends! need to rename to appendTodos
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

    //handle todo expansion button clicks
    if ( e.target.className === 'todoExpandBtn' ) {
      e.target.textContent = e.target.textContent === '▼' ? '▲' : '▼';
      //iterate through all elements in a todo and give some a hiding class
      Array.from(e.target.parentElement.children).forEach( (elem,i)=>{
        if (i>2) { elem.classList.toggle('noDisplay') }
      } );
    }

    //handle clicks on completion checkbox inputs to toggle completed states of todos
    if ( e.target.className === 'completionBoxInput' ) {
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
    if ( e.target.className === 'projectTitleInput' ) {
      lg( 'old project title: ' + project.getTitle() ); //get from 'free variable' of getTitle() closure
      project.setTitle(e.target.value); //set 'free variable' of setTitle() closure
      lg( 'new project title: ' + project.getTitle() );
    }

    //handle project's description edits
    if ( e.target.className === 'projectDescriptionInput' ) {
      lg('old project description: ' + project.getDescription());
      project.setDescription(e.target.value);
      lg('new project description: ' + project.getDescription());
    }

    //handle individual todo title edits
    if ( e.target.className === 'todoTitleInput' ) {
      //find the correct todo object, set its new title string
      project.getTodosArr()
        .find( todo=> todo.getTodoID() === +e.target.dataset.todoId )
        .setTitle(e.target.value);
      //testing
      lg( 'new todo title:' + project.getTodosArr().find( todo=> todo.getTodoID() === +e.target.dataset.todoId ).getTitle() );
    }

    //handle individual todo notes edits
    if ( e.target.className === 'todoNotesInput' ) {
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
//Todo render module: appends todo elements to the wrapper using the todos array from project
const renderTodos = ( project, todosWrap )=> {
  lg(`renderTodos invoked for project with ID ${project.getProjectID()}. removing existing todos first...`)
  todosWrap.innerHTML = ''; // clear any existing todos...
  // lg( `project ${project.getProjectID()}'s Todos to render: ` )
  // lg( project.getTodosArr() )
  project.getTodosArr().forEach( todo=> {
    //make the todo's html elements.
    const todoWrap = document.createElement('div');
    const todoExpandBtn = document.createElement('button');
    todoExpandBtn.textContent = '▼'; //opposite: ▲
    const todoTitleInput = document.createElement('input')
    todoTitleInput.placeholder = todo.getTitlePlaceholder();
    const completionBoxInput = document.createElement('input'); //completed state checkbox
    completionBoxInput.setAttribute('type','checkbox');
    completionBoxInput.checked = todo.getCompletedState();
    const todoNotesInput = document.createElement('input');
    todoNotesInput.placeholder = todo.getNotesPlaceholder();
    //todo due date/time picker. need to call setDueDate()
    //uses: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local
    const dueDateTimeInput = document.createElement('input');
    dueDateTimeInput.setAttribute('type', 'datetime-local');
    //date/time pick testing
    //lg( new Date().toISOString().slice(0,16) ); //YYYY-MM-DDThh:mm format string is the value of <input type="datetime-local">

    //todo priority selector element
    const prioritySelect = document.createElement('select');
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

    //set class/data attributes for elems
    Object.entries( //object of elems to set attributes on goes here
      { todoWrap, todoExpandBtn, todoTitleInput,completionBoxInput,
      todoNotesInput,dueDateTimeInput,prioritySelect }
    ).forEach( ( [ key, elem ] )=> { //destructuring assignment of entries array!
      elem.className = key; //set class from element reference name
      if ( ['todoNotesInput', 'dueDateTimeInput', 'prioritySelect'].includes(key) ) { //add extra classes to specific elems
        elem.classList.add('noDisplay');
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


//application flow has an arrow function IIFE that returns an object (with state) to access via appFlow variable
// lg(globalThis) //webpack executes your code with its own module scope to avoid polluting the global scope!!!
const appFlow = ( ()=> {
  //store projects in an array. later, default to one project if the localStorage doesn't have any
  let projectsArr = [], projectCreationID = 0;

  //need to wrap projects in a container that can be wiped for rerender
  const projectsWrap = document.createElement('div');
  projectsWrap.className = 'projectsWrap'; //for clarity
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
  projectsArr.forEach( project=> appendProject( project, projectsWrap ) );

  //save projects to localStorage....instead of deep cloning, need to save only necessary objects and use them to build new ones after. below is a useless shallow clone attempt, do not use
  // localStorage.setItem( '[TBD]projects in this device\'s localStorage: ', JSON.stringify(projectsArr) );

  //remove project from projectsArr via ID
  const removeProject = id=> {
    //filter returns a shallow copy, use instead of a loop with in place splice
    projectsArr = projectsArr.filter( project=> project.getProjectID() !== +id ); //unary plus for number from string
    //removes all nodes, ok to use since non user generated code. Setting innerHTML to an empty string removes all child elements and event listeners attached to them.
    projectsWrap.innerHTML = '';
    projectsArr.forEach( project=> appendProject( project, projectsWrap ) );
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