//search todos, there are a 100 way to do this but we did some lessons on arrays and especially the search method so this is why we are doing it that way
//we want a keyup eventlistener to show the actual match and hide the other todos
//---see down below the delete todocode--

//1st we nee a referrence of the form field itself

const addForm = document.querySelector('.add');
//4th now we want to add it to the list, for that we need a referrence to it
const list = document.querySelector('.todos');

const search = document.querySelector('.search input'); //referrence to inputfield inside search form


//3rd more reusable way to write it here global, if maybe we want to add more functionalitiy
const generateTemplate =  todo => { //generates a templatestring and injects it into the dom, when you add a complex html snippet its easier to add it as a string rather than with addHTML method 
    const html = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span> 
        <i class="far fa-trash-alt delete"></i>
      </li>
    `;
//4th
    list.innerHTML += html; //add the html rather than overwriting it
    
};

//2nd get the new todo string
addForm.addEventListener('submit', e => { //listening for the enter(submit) event

    e.preventDefault();
    //we need to get what the user types here
    const todo = addForm.add.value.trim(); //trim cuts all the white spaces before and after a string, to delete accidentaly spaces
    // console.log(todo);

    if(todo.length){  //check that no empty fields get saved, no userinput (value 0) will return false and wont call the function, any input returns a positve value (starting by 1..) and will be  true
        generateTemplate(todo); //calling generateTemplate and passeing the todo value to the global const generateTemplate 
        addForm.reset(); //resets the inputfield to a fresh new one, rahter than keeping the last input in it
    }
    
});

// delete todos 
list.addEventListener('click', e => {
  if(e.target.classList.contains('delete')){ //checks it the element we click contains the class of delete
    e.target.parentElement.remove();
  }
});

//search todos

//making it global

const filterTodos = (term) => {

  Array.from(list.children) //getting a HTMLCollection, need to be converted to Array to use methods on it
    .filter((todo) => !todo.textContent.toLowerCase().includes(term)) //keeps the term in the array if true, but here we want only those with not true to give them a css class of display: none !important by inversing with '!'
    .forEach((todo) => todo.classList.add('filtered'));

//if we now delete or correct our search term we need to remove the, so we need the array that do match
  Array.from(list.children) 
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));
};

//keyup event
//we need to get a referrence directly to the inputfield, rather than the searchform because we want to listen to a keyupevent instead of a submitevent of the searchform

search.addEventListener('keyup', () => {
  const term = search.value.trim().toLowerCase(); //one problem is the lower and capital case, they dont match to the strickt equality search method. so we need to convert both the inputs and the saved todos
  filterTodos(term);
});
