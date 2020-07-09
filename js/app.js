//select elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const input1 = document.getElementById("input1");

//calss names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST, id ;

//get item from local storage
let data = localStorage.getItem("TODO");


//chk data is not empty
if(data){
	LIST = JSON.parse(data);
	id = LIST.length;
	loadList(LIST);

}else{
	LIST = [];
	id = 0;

}
//load items for ui
function loadList(array){
	array.forEach(function(item){
		addToDo(item.name, item.description1, item.id, item.done, item.trash);
	});

}
//clear button
clear.addEventListener("click", function(){
	localStorage.clear();
	location.reload();
});




//date of day
const options = {weekday :"long", month :"short", day :"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-us", options);

//add to do

function addToDo(toDo, description, id, done, trash){

	if(trash){ return;}

	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}" style=""><h1>${toDo}</h1></p>
                    <p id="p1">${description}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    <p></p>
                  </li>
                `;

	
	const position ="beforeend";
	list.insertAdjacentHTML(position, item);

}


///key press

document.addEventListener("keyup",function(even){
	if(event.keyCode == 13){
		const toDo = input.value;
		const description =input1.value;
		// if input available
		if(toDo && description ){
			addToDo(toDo,description, id, false, false);

			LIST.push({
				name : toDo,
				description1 : description,
				id : id,
				done : false,
				trash : false
			});

			localStorage.setItem("TODO", JSON.stringify(LIST));

			id++;


		input.value = "";
		input1.value = "";
		}
		if(toDo=="" && description==""){
			window.alert("please Enter the Title and Description to add a to do List");			
		}
		else if(toDo==""){
			window.alert("please Enter the Title");
		}
		else if(description==""){
			window.alert("please Enter the Description");
		}
		

	}
});

//complete
function completeToDO(element){
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
	
	LIST[element.id].done = LIST[element.id].done ? false : true;

}
//remove
function removeToDo(element){
	element.parentNode.parentNode.removeChild(element.parentNode);

	LIST[element.id].trash = true;
}
// target lsit
list.addEventListener("click", function(event){
	const element = event.target; 

	const elementJob = element.attributes.job.value;

	if(elementJob == "complete"){
		completeToDO(element);
	}
	else if(elementJob == "delete"){
		removeToDo(element);
	}
	localStorage.setItem("TODO", JSON.stringify(LIST));

});
