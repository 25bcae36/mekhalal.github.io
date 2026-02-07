// Student Database using LocalStorage
let students = JSON.parse(localStorage.getItem('mekhaStudents')) || [];

// Form submission
document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const student = {
        id: Date.now(),
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        course: document.getElementById('course').value,
        marks: parseInt(document.getElementById('marks').value),
        date: new Date().toLocaleDateString()
    };
    
    students.push(student);
    localStorage.setItem('mekhaStudents', JSON.stringify(students));
    this.reset();
    displayStudents();
    updateCount();
    alert('✅ Student added to database!');
});

// Display students
function displayStudents() {
    const container = document.getElementById('studentsList');
    
    if (students.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#666;">No students in database. Add your first student!</p>';
        return;
    }
    
    container.innerHTML = students.map(student => `
        <div class="student-card">
            <div>
                <h4>${student.name}</h4>
                <p><strong>Course:</strong> ${student.course} | <strong>Marks:</strong> ${student.marks}/100</p>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Phone:</strong> ${student.phone}</p>
                <p><small>Added: ${student.date}</small></p>
            </div>
            <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
        </div>
    `).join('');
}

// Update count
function updateCount() {
    document.getElementById('count').textContent = students.length;
}

// Delete student
function deleteStudent(id) {
    if (confirm('Delete this student record?')) {
        students = students.filter(student => student.id !== id);
        localStorage.setItem('mekhaStudents', JSON.stringify(students));
        displayStudents();
        updateCount();
    }
}

// Clear all data
document.getElementById('clearAll').addEventListener('click', function() {
    if (confirm('Delete ALL student records? This cannot be undone!')) {
        students = [];
        localStorage.removeItem('mekhaStudents');
        displayStudents();
        updateCount();
    }
});

// Initialize
displayStudents();
updateCount();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
