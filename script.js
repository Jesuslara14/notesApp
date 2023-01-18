//Classes

class Note {
    constructor(id, title, content, editable){
        this.id = id;
        this.title = title;
        this.content = content;
        this.editable = editable;
    }
}

//LoadScreen

document.getElementById('newNote').addEventListener('click', createNote);
var notePad = document.getElementsByClassName('notePad')[0];
var notes = JSON.parse(localStorage.getItem('notes')) || [];
localStorage.setItem('notes', JSON.stringify(notes));
renderNotes();
newOnclick('remove');
newOnclick('edit');
newOnclick('save');

//Functions

function createNote(){
    var newNote = new Note(newId() ,"", "", true);
	console.log(newNote);
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNote(newNote, newNote.editable);
}

function editNote(){
    this.parentNode.children[0].readOnly = false;
    this.parentNode.children[2].readOnly = false;
}

function deleteNote(){
    var id = this.parentNode.id;
	console.log("deleted");
    var index = findNoteIndex(id);
    notes.splice(index, 1);
	notePad.removeChild(this.parentNode);
	localStorage.setItem('notes', JSON.stringify(notes));
}

function saveNote(){
    var id = this.parentNode.id;
    var index = findNoteIndex(id);
    this.parentNode.children[0].readOnly = true;
    this.parentNode.children[2].readOnly = true;
	notes[index].title = this.parentNode.children[0].value;
	notes[index].content = this.parentNode.children[2].value;
	localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes(){
	for(var i = 0; i < notes.length; i++){
		renderNote(notes[i], false);
	}
}

function renderNote(note, editable){
    var newNoteElement = document.createElement('div');
    var noteTitle = document.createElement('textarea');
    var noteContent = document.createElement('textarea');
    noteTitle.value = note.title;
    noteContent.value = note.content;
    noteContent.className = "noteContent";
    noteTitle.className = "noteTitle";
    newNoteElement.className = "note";
    newNoteElement.id = note.id;
    
    if(!editable){
        noteTitle.readOnly = true;
        noteContent.readOnly = true;
    }

    newNoteElement.appendChild(noteTitle);
    newNoteElement.appendChild(document.createElement('br'));
    newNoteElement.appendChild(noteContent);
    newNoteElement.appendChild(newButton('remove', "Del"));
    newNoteElement.appendChild(newButton('edit', "Edit"));
    newNoteElement.appendChild(newButton('save', "Save"));
	notePad.appendChild(newNoteElement);
    newOnclick('remove');
    newOnclick('edit');
    newOnclick('save');
}

function newButton(type, label)
{
    var newButton = document.createElement('button');
    newButton.classList.add('button', type);
    newButton.innerHTML = label;
    return newButton;
}

function newId(){
    var nullChecker = 1;
    var newNoteId;
    while(nullChecker != null){
        newNoteId = Math.random() * 1000;
        nullChecker = findNoteIndex(newNoteId.toString);
    }
    return newNoteId.toString();
}

function findNoteIndex(id){
    for(var i = 0; notes.length > i; i++){
        if(notes[i].id == id){
            return i;
        }
    }
    return null;
}

function newOnclick(identifier)
{
    var newButton = document.getElementsByClassName(identifier);
    for(var i = 0; i < newButton.length; i++)
    {
        switch (identifier)
        {
            case 'remove':
                newButton[i].onclick = deleteNote;
            break;
            case 'edit':
                newButton[i].onclick = editNote;
            break;
            case 'save':
                newButton[i].onclick = saveNote;
            break;
        }
        
    }
}