// Get form, input field, and student list elements
const form = document.getElementById('student-form');
const studentNameInput = document.getElementById('student-name');
const studentList = document.getElementById('student-list');

// Initialize an empty array to store student data
let students = [];

// Load students from localStorage if available
window.onload = function () {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
        students = JSON.parse(savedStudents);
        updateStudentList();
    }
};

// Function to add a new student
function addStudent(name) {
    // Check if the student name is valid
    if (name.trim() === '') {
        alert('Please enter a valid name.');
        return;
    }

    // Create a new student object
    const newStudent = {
        name: name,
        status: 'red' // Default status is 'red'
    };

    // Add the new student to the array
    students.push(newStudent);

    // Save updated student list to localStorage
    saveToLocalStorage();

    // Update the student list in the UI
    updateStudentList();

    // Clear the input field
    studentNameInput.value = '';
}

// Function to update the displayed student list
function updateStudentList() {
    // Clear the existing list
    studentList.innerHTML = '';

    // Loop through the student array and create list items
    students.forEach((student, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${student.name}
            <div class="status-circle ${student.status}" onclick="changeStatus(${index})"></div>
        `;

        // Append each student to the list
        studentList.appendChild(li);
    });
}

// Function to change student status when the circle is clicked
function changeStatus(index) {
    // Cycle through statuses: red -> yellow -> green
    if (students[index].status === 'red') {
        students[index].status = 'yellow';
    } else if (students[index].status === 'yellow') {
        students[index].status = 'green';
    } else {
        students[index].status = 'red';
    }

    // Save updated student list to localStorage
    saveToLocalStorage();

    // Update the displayed list
    updateStudentList();
}

// Function to save students to localStorage
function saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Add event listener to handle form submission
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way
    const studentName = studentNameInput.value;
    addStudent(studentName);
});
