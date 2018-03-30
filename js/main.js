function main(){
	var name = JSON.parse(localStorage.getItem("name")) || "Test Name";
	Global.initilize.board = new Board(name);
	Global.initilize.board.renderDom();
	Global.initilize.board.storeData();
}

// Static Class
function Global(){
	//nothing here
}

Global.initilize = new Global();


function Board(name){
	this.name = name;
	this.lists = JSON.parse(localStorage.getItem("lists")) || [];
}

Board.prototype.resetDom = function(){
	var listWrapper = document.getElementById('list-wrapper');
	while(listWrapper.firstChild){
		listWrapper.removeChild(listWrapper.firstChild);
	}
}

Board.prototype.renderDom = function(){
	var board = Global.initilize.board;

	document.getElementById('board-name').innerHTML = board.name;

	var listWrapper = document.getElementById('list-wrapper');
	

	board.lists.forEach(function(listItem,listIndex){
		var list = document.createElement('div');
			list.setAttribute('class','list-item');
			list.setAttribute('data-id',listItem.id);
			list.setAttribute('data-index',listIndex);

		var listlabel = document.createElement('div');
			listlabel.setAttribute('class','list-label');
			listlabel.setAttribute('contenteditable','true');
			listlabel.innerHTML = listItem.label;
			listlabel.addEventListener('blur',function(event){
				var board = Global.initilize.board;
				var newVal = event.target.innerText;
				if(board.name != newVal){
					Global.initilize.board.lists[listIndex].label = newVal;
				}
				board.storeData();
			});

		list.appendChild(listlabel);

		listItem.cards.forEach(function(cardItem,index){
			var card = document.createElement('div');
				card.setAttribute('class','card-item');
				card.setAttribute('data-id',cardItem.id);
				card.setAttribute('data-index',index);

			var header = document.createElement('div');
				header.setAttribute('class','header');

			var status = document.createElement('div');
				status.setAttribute('class','status');
				status.innerHTML = cardItem.status;

			var edit = document.createElement('div');
				edit.setAttribute('class','edit');
				edit.addEventListener('click', function(event){
					openModel(listIndex,index,cardItem);
				}, false);

			var editIcon = document.createElement('i');
				editIcon.setAttribute('class','fas fa-pencil-alt');

			var cardTitle = document.createElement('div');
				cardTitle.setAttribute('class','title');
				cardTitle.innerHTML = cardItem.title;

			header.appendChild(status);
			edit.appendChild(editIcon);
			header.appendChild(edit);

			card.appendChild(header);
			card.appendChild(cardTitle)

			list.appendChild(card);
		});

		var addItemBtn = document.createElement('div');
			addItemBtn.setAttribute('class','add-card-btn');
			addItemBtn.innerHTML = "Add new card";
			addItemBtn.setAttribute('data-index',listIndex);
			addItemBtn.addEventListener('click', addNewCard, false);

		list.appendChild(addItemBtn);
		listWrapper.appendChild(list);
	});
	var addNewListBtn = document.createElement('div');
		addNewListBtn.setAttribute('class','add-list-btn');
		addNewListBtn.innerHTML = "Add new List";
		addNewListBtn.addEventListener('click', addNewList, false);
		
	listWrapper.appendChild(addNewListBtn);
}

Board.prototype.storeData = function(){
	var board = Global.initilize.board;
	localStorage.setItem('name',JSON.stringify(board.name))
	localStorage.setItem('lists',JSON.stringify(board.lists))
}


// UI Events
function addNewCard(event){
	var ele = event.target;
	var index = parseInt(ele.getAttribute('data-index'));
	ele.setAttribute('class','add-card-btn hide');

	var addNewCardOption = document.createElement('div');
		addNewCardOption.setAttribute('class','add-panel');
		addNewCardOption.setAttribute('id','add-panel');
	
	var input = document.createElement('input');
		input.setAttribute('type','text');
		input.setAttribute('name','card-name');
		input.setAttribute('id','card-name');

	var saveBtn = document.createElement('div');
		saveBtn.setAttribute('class','save-btn');
		saveBtn.innerHTML = "Save";
		saveBtn.addEventListener('click', function(event){
			var cardName = document.getElementById('card-name').value;
			if(cardName){
				ele.setAttribute('class','add-card-btn');
				var AddPanel = document.getElementById('add-panel');
				while(AddPanel.firstChild){
					AddPanel.removeChild(AddPanel.firstChild);
				}

				Global.initilize.board.lists[index].cards.push({
					id : getUniqueId(),
					title : cardName,
					status : "Active",
					description: ""
				})
				Global.initilize.board.resetDom();
				Global.initilize.board.renderDom();
				Global.initilize.board.storeData();
			}
		}, false);

	var cancelBtn = document.createElement('div');
		cancelBtn.setAttribute('class','cancel-btn');
		cancelBtn.innerHTML = "Cancel";
		cancelBtn.addEventListener('click', function(event){
			ele.setAttribute('class','add-card-btn');
			var AddPanel = document.getElementById('add-panel');
			while(AddPanel.firstChild){
				AddPanel.removeChild(AddPanel.firstChild);
			}
		}, false);

	addNewCardOption.appendChild(input);
	addNewCardOption.appendChild(saveBtn);
	addNewCardOption.appendChild(cancelBtn);

	event.target.parentElement.appendChild(addNewCardOption);
}

function addNewList(event){
	var ele = event.target;
	// var index = parseInt(ele.getAttribute('data-index'));
	ele.setAttribute('class','add-list-btn hide');

	var addNewListOption = document.createElement('div');
		addNewListOption.setAttribute('class','add-panel add-list');
		addNewListOption.setAttribute('id','add-panel');
	
	var input = document.createElement('input');
		input.setAttribute('type','text');
		input.setAttribute('name','card-name');
		input.setAttribute('id','item-name');

	var saveBtn = document.createElement('div');
		saveBtn.setAttribute('class','save-btn');
		saveBtn.innerHTML = "Save";
		saveBtn.addEventListener('click', function(event){
			var listName = document.getElementById('item-name').value;
			if(listName){
				ele.setAttribute('class','add-list-btn');
				var AddPanel = document.getElementById('add-panel');
				while(AddPanel.firstChild){
					AddPanel.removeChild(AddPanel.firstChild);
				}

			Global.initilize.board.lists.push({
				id : getUniqueId(),
				label : listName,
				cards : []
			})
			Global.initilize.board.resetDom();
			Global.initilize.board.renderDom();
			Global.initilize.board.storeData();
				
			}
		}, false);

	var cancelBtn = document.createElement('div');
		cancelBtn.setAttribute('class','cancel-btn');
		cancelBtn.innerHTML = "Cancel";
		cancelBtn.addEventListener('click', function(event){
			ele.setAttribute('class','add-list-btn');
			var AddPanel = document.getElementById('add-panel');
			while(AddPanel.firstChild){
				AddPanel.removeChild(AddPanel.firstChild);
			}
		}, false);

	addNewListOption.appendChild(input);
	addNewListOption.appendChild(saveBtn);
	addNewListOption.appendChild(cancelBtn);

	event.target.parentElement.appendChild(addNewListOption);
}

function changeBoardName(){
	var boardName = document.getElementById('board-name');
	boardName.setAttribute("contenteditable","true");
	boardName.focus();
	boardName.addEventListener('blur',saveBoardname);
}

function saveBoardname(event){
	var board = Global.initilize.board;
	var newVal = event.target.innerText;
	if(board.name != newVal){
		Global.initilize.board.name = newVal;
	}
	board.storeData();
}

function closeModel(){
	var model = document.getElementById('model');
	if(model.hasAttribute('data-listIndex')){
		model.removeAttribute('data-listIndex')
	}
	if(model.hasAttribute('data-cardIndex')){
		model.removeAttribute('data-cardIndex')
	}

	model.setAttribute('class','model-wrapper hide');
}

function openModel(listIndex,cardIndex,object){
	var model = document.getElementById('model');
	model.setAttribute('class','model-wrapper');
	model.setAttribute('data-cardIndex',cardIndex);
	model.setAttribute('data-listIndex',listIndex);

	var modelTitle = document.querySelector('#model .header .title'),
		title = document.querySelector('#model .edit-panel input[name="title"]'),
		status = document.querySelector('#model .edit-panel input[name="status"]'),
		description = document.getElementById('card-desc');


	modelTitle.innerHTML = object.title;
	title.value = object.title;
	status.value = object.status;
	description.value = object.description;
}

function saveCardDetail(){
	var title = document.querySelector('#model .edit-panel input[name="title"]').value,
		status = document.querySelector('#model .edit-panel input[name="status"]').value,
		description = document.getElementById('card-desc').value,
		model = document.getElementById('model'),
		cardIndex = model.getAttribute('data-cardIndex',cardIndex),
		listIndex = model.getAttribute('data-listIndex',listIndex);
	if(title){
		Global.initilize.board.lists[listIndex].cards[cardIndex].title = title;
		Global.initilize.board.lists[listIndex].cards[cardIndex].status = status;
		Global.initilize.board.lists[listIndex].cards[cardIndex].description = description;

		Global.initilize.board.resetDom();
		Global.initilize.board.renderDom();
		Global.initilize.board.storeData();
		closeModel();
	}
}

// Helper Function
function emptyElementById(id){
	var ele = document.getElementById(id);
	while(ele.firstChild){
		ele.removeChild(ele.firstChild);
	}
}

function getUniqueId(){
	return Date.now();
}

main();