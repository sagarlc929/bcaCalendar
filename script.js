const assignments = [
	{ title: "Computer Graphics", detail: "MCQ question", date: "2024-07-31", description: `<p>create 10 mcq question form chapter 2` },
];
const today = dayjs();
const startDate = today.subtract(5, "day");
const endDate = today.add(30, "day");

function createGraph(assignments) {
	const graphElement = document.getElementById("graph");
	graphElement.innerHTML = ""; // Clear existing graph

	const daysCount = endDate.diff(startDate, "day") + 1;

	// Create columns for each date in the range
	for (let i = 0; i < daysCount; i++) {
		const date = startDate.add(i, "day").format("YYYY-MM-DD");
		const column = document.createElement("div");
		column.className = "column";
		const divDate = document.createElement("div");
		const dateHeader = document.createElement("h3");
		dateHeader.className = "heading-date";
		if (date === today.format("YYYY-MM-DD")) {
			dateHeader.classList.add("today");
		}
		dateHeader.textContent = startDate
			.add(i, "day")
			.format("YYYY-MM-DD_ddd");
		divDate.appendChild(dateHeader);
		column.appendChild(divDate);

		const divAssignments = document.createElement("div");
		divAssignments.className = "div-assignment";
		column.appendChild(divAssignments);

		assignments
			.filter((assignment) => assignment.date === date)
			.forEach((assignment) => {
				const card = document.createElement("div");
				card.className = "card";
				card.dataset.date = assignment.date;

				const cardTitle = document.createElement("h4");
				cardTitle.textContent = assignment.title;
				card.appendChild(cardTitle);

				const cardDetail = document.createElement("p");
				cardDetail.textContent = assignment.detail;
				card.appendChild(cardDetail);
        //this sould hidden
				const cardDescription = document.createElement("div");
				cardDescription.innerHTML = assignment.description? assignment.description : '<i>No description</i>';
        cardDescription.className = "hidden";
  
				card.appendChild(cardDescription);
        //show popup menu with the date assignment title details and description with cross button on top
        card.onclick= popUp;


				divAssignments.appendChild(card);
			});

		graphElement.appendChild(column);
	}
}
/*
    function addAssignment() {
      const title = document.getElementById('title').value;
      const detail = document.getElementById('detail').value;
      const date = document.getElementById('date').value;

      if (title && detail && date) {
        assignments.push({ title, detail, date });
        createGraph(assignments);
      } else {
        alert('Please fill out all fields.');
      }
    }
    */

function popUp(event) {
  const card = event.currentTarget;
  const description = card.querySelector('.hidden').innerHTML;
  
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `
    <div class="popup-content">
      <button class="close-btn" onclick="closePopup()">×</button>
      <h4>${card.querySelector('h4').textContent}</h4>
      <p>${card.querySelector('p').textContent}</p>
      <p style='text-align:center;display:block;background-color:#eee; color:tomato;'>Description</p>
      <div>${description}</div>
    </div>
  `;

  document.body.appendChild(popup);
}

function closePopup() {
  const popup = document.querySelector('.popup');
  if (popup) {
    popup.remove();
  }
}

createGraph(assignments);
