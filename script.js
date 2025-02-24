const title = document.getElementById("title");
const description = document.getElementById("description");
const formSubmit = document.getElementById("form");
const notesContainer = document.getElementById("allNotes");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let notesData = JSON.parse(localStorage.getItem("notesData")) || [];

const createSingleNote = (note) => {
    const elem = document.createElement("div");
    elem.setAttribute("class", "noteContainer");
    elem.innerHTML = `
        <div class="titleAndTime">
            <p>${note.title}</p>
            <p class="time">
                <span>${note.currHours}/${note.currMonth}/${note.currYear}</span>
                <span>${note.currHours}:${note.currMin}</span>
            </p>
        </div>
        <p class="description">
            ${note.description}
        </p>
        <div class="editDelete">
            <i class="fa-solid fa-pen-to-square" onclick='handleEdit(${JSON.stringify(note.title)}, ${JSON.stringify(note.description)}, this.parentElement.parentElement, ${JSON.stringify(note.id)})'></i>
            <i class="fa-solid fa-trash" onclick='handleDelete(this.parentElement.parentElement, ${JSON.stringify(note.id)})'></i>
        </div>
    `
    notesContainer.appendChild(elem);
}

const displayNotes = (filteredNotes) => {
    filteredNotes.forEach((note) => {
        createSingleNote(note);
    });
}

displayNotes(notesData);

formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!title.value || !description.value){
        alert("Please write title and description to add a note");
        return;
    }

    const { currDate, currMonth, currYear, currHours, currMin } = dateTimeCalculation();

    const note = {
        id: notesData.length + 1,
        title: title.value,
        description: description.value,
        currDate,
        currMonth,
        currYear,
        currHours,
        currMin
    }
    notesData.push(note);
    localStorage.setItem("notesData", JSON.stringify(notesData));

    createSingleNote(note);

    title.value = "";
    description.value = "";
});

function dateTimeCalculation(){
    const date = new Date();
    const currDate = date.getDate();

    const monNo = date.getMonth();
    let currMonth = "";
    switch (monNo) {
        case 0:
          currMonth = "Jan";
          break;
        case 1:
          currMonth = "Feb";
          break;
        case 2:
          currMonth = "Mar";
          break;
        case 3:
          currMonth = "Apr";
          break;
        case 4:
          currMonth = "May";
          break;
        case 5:
          currMonth = "June";
          break;
        case 6:
          currMonth = "July";
          break;
        case 7:
          currMonth = "Aug";
          break;
        case 8:
          currMonth = "Sep";
          break;
        case 9:
          currMonth = "Oct";
          break;
        case 10:
          currMonth = "Nov";
          break;
        case 11:
          currMonth = "Dec";
          break;
    }

    const currYear = date.getFullYear();
    const currHours = date.getHours();
    const currMin = date.getMinutes();

    return { currDate, currMonth, currYear, currHours, currMin };
}

function handleEdit(editTitle, editDesc, elem, id){
    elem.remove();
    handleDelete(elem, id);
    title.value = editTitle;
    description.value = editDesc;
}

function handleDelete(elem, id){
    const filteredData = notesData.filter((note) => note.id !== id);
    localStorage.setItem("notesData", JSON.stringify(filteredData));
    notesData= filteredData;
    elem.remove();
}

const handleSearch = () => {
    let searchVal = searchInput.value.trim().toLowerCase();

    const filteredData = notesData.filter(
        (d) => d.title.toLowerCase().includes(searchVal) || d.description.toLowerCase().includes(searchVal)
    );

    notesContainer.innerHTML = "";

    displayNotes(filteredData);
}

searchInput.addEventListener("input", handleSearch);