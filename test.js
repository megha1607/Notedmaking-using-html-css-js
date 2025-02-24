const title = document.getElementById("title");
const description = document.getElementById("description");
const formSubmit = document.getElementById("form");
const notesContainer = document.getElementById("allNotes");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const data = [];

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!title.value || !description.value) {
    alert("Please write title and value to add note");
    return;
  }

  const { currDate, currMonth, currYear, currHours, currMin } =
    dateTimeCalculation();

  data.push({
    title: title.value,
    description: description.value,
    currDate,
    currMonth,
    currYear,
    currHours,
    currMin,
  });

  const elem = document.createElement("div");
  elem.setAttribute("class", "noteContainer");
  elem.innerHTML = `
    <div class="titleAndTime">
        <p id="title">${title.value}</p>
        <p class="time">
            <span id="date">${currDate}/${currMonth}/${currYear}</span> -
            <span id="time">${currHours}:${currMin}</span>
        </p>
    </div>
    <p id="description">${description.value}</p>
    <div class="editDelete">
        <i class="fa-solid fa-pen-to-square" 
           onclick='handleEdit(${JSON.stringify(title.value)}, ${JSON.stringify(
    description.value
  )}, this.parentElement.parentElement)'>
        </i>
        <i class="fa-solid fa-trash" 
           onclick="handleDelete(this.parentElement.parentElement)" id="delete">
        </i>
    </div>
    `;
  notesContainer.appendChild(elem);

  localStorage.setItem("notesData", JSON.stringify(data));

  title.value = "";
  description.value = "";
});

function dateTimeCalculation() {
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

function handleEdit(editTitle, editDesc, nodeElem) {
  title.value = editTitle;
  description.value = editDesc;
  nodeElem.remove();
}

function handleDelete(nodeElem) {
  nodeElem.remove();
}
