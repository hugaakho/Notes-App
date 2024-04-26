const notesData = [
  {
    id: "notes-jT-jjsyz61J8XKiI",
    title: "Welcome to Notes, Dimas!",
    body: "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
    createdAt: "2022-07-28T10:03:12.594Z",
    archived: false,
  },
  {
    id: "notes-aB-cdefg12345",
    title: "Meeting Agenda",
    body: "Discuss project updates and assign tasks for the upcoming week.",
    createdAt: "2022-08-05T15:30:00.000Z",
    archived: false,
  },
  {
    id: "notes-XyZ-789012345",
    title: "Shopping List",
    body: "Milk, eggs, bread, fruits, and vegetables.",
    createdAt: "2022-08-10T08:45:23.120Z",
    archived: false,
  },
  {
    id: "notes-1a-2b3c4d5e6f",
    title: "Personal Goals",
    body: "Read two books per month, exercise three times a week, learn a new language.",
    createdAt: "2022-08-15T18:12:55.789Z",
    archived: false,
  },
  {
    id: "notes-LMN-456789",
    title: "Recipe: Spaghetti Bolognese",
    body: "Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...",
    createdAt: "2022-08-20T12:30:40.200Z",
    archived: false,
  },
  {
    id: "notes-QwErTyUiOp",
    title: "Workout Routine",
    body: "Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.",
    createdAt: "2022-08-25T09:15:17.890Z",
    archived: false,
  },
  {
    id: "notes-abcdef-987654",
    title: "Book Recommendations",
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: "2022-09-01T14:20:05.321Z",
    archived: false,
  },
  {
    id: "notes-zyxwv-54321",
    title: "Daily Reflections",
    body: "Write down three positive things that happened today and one thing to improve tomorrow.",
    createdAt: "2022-09-07T20:40:30.150Z",
    archived: false,
  },
  {
    id: "notes-poiuyt-987654",
    title: "Travel Bucket List",
    body: "1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA",
    createdAt: "2022-09-15T11:55:44.678Z",
    archived: false,
  },
  {
    id: "notes-asdfgh-123456",
    title: "Coding Projects",
    body: "1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project",
    createdAt: "2022-09-20T17:10:12.987Z",
    archived: false,
  },
  {
    id: "notes-5678-abcd-efgh",
    title: "Project Deadline",
    body: "Complete project tasks by the deadline on October 1st.",
    createdAt: "2022-09-28T14:00:00.000Z",
    archived: false,
  },
  {
    id: "notes-9876-wxyz-1234",
    title: "Health Checkup",
    body: "Schedule a routine health checkup with the doctor.",
    createdAt: "2022-10-05T09:30:45.600Z",
    archived: false,
  },
  {
    id: "notes-qwerty-8765-4321",
    title: "Financial Goals",
    body: "1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.",
    createdAt: "2022-10-12T12:15:30.890Z",
    archived: false,
  },
  {
    id: "notes-98765-54321-12345",
    title: "Holiday Plans",
    body: "Research and plan for the upcoming holiday destination.",
    createdAt: "2022-10-20T16:45:00.000Z",
    archived: false,
  },
  {
    id: "notes-1234-abcd-5678",
    title: "Language Learning",
    body: "Practice Spanish vocabulary for 30 minutes every day.",
    createdAt: "2022-10-28T08:00:20.120Z",
    archived: false,
  },
];

class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="navbar">
        <h1>Notes App</h1>
      </header>
    `;
  }
}

customElements.define("app-bar", AppBar);

class NoteInput extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form id="add-note-form">
        <input type="text" id="note-title" placeholder="Enter title" required>
        <textarea id="note-body" placeholder="Enter note" required></textarea>
        <button type="submit">Add Note</button>
      </form>
    `;
    this.querySelector("#add-note-form").addEventListener("submit", this.handleAddNote.bind(this));
  }

  handleAddNote(event) {
    event.preventDefault();
    const title = this.querySelector("#note-title").value;
    const body = this.querySelector("#note-body").value;
    if (title && body) {
      notesData.push({
        id: `notes-${Math.random().toString(36).substr(2, 9)}`,
        title,
        body,
        createdAt: new Date().toISOString(),
        archived: false,
      });
      document.querySelector("note-list").render();
    }
  }
}

customElements.define("note-input", NoteInput);

class NoteList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = "<div id='app'></div>";
    const appContainer = this.querySelector("#app");
    notesData.forEach((note) => {
      const noteItemTemplate = document.getElementById("note-item-template").content.cloneNode(true);
      noteItemTemplate.querySelector(".note-title").textContent = note.title;
      noteItemTemplate.querySelector(".note-body").textContent = note.body;

      const deleteButton = noteItemTemplate.querySelector(".delete-button");
      deleteButton.addEventListener("click", () => this.handleDelete(note.id));

      appContainer.appendChild(noteItemTemplate);
    });
  }

  handleDelete(noteId) {
    const noteIndex = notesData.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
      notesData.splice(noteIndex, 1);
      this.render();
    }
  }
}

customElements.define("note-list", NoteList);
