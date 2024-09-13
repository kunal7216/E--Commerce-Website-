// Get modal elements
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const closeBtns = document.querySelectorAll(".close");

// Open login modal when login button is clicked
loginBtn.onclick = function() {
    loginModal.style.display = "block";
};

// Open registration modal when register button is clicked
registerBtn.onclick = function() {
    registerModal.style.display = "block";
};

// Close modals when 'x' is clicked
closeBtns.forEach(btn => {
    btn.onclick = function() {
        btn.parentElement.parentElement.style.display = "none";
    };
});

// Close modals when user clicks outside of the modal
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    } else if (event.target == registerModal) {
        registerModal.style.display = "none";
    }
};

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent page reload
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Mock validation (replace with server-side logic)
    if (username === "user" && password === "password") {
        alert("Login successful!");
        loginModal.style.display = "none";
    } else {
        alert("Invalid credentials. Please try again.");
    }
});

// Handle registration form submission
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent page reload
    const regUsername = document.getElementById("regUsername").value;
    const regEmail = document.getElementById("regEmail").value;
    const regPassword = document.getElementById("regPassword").value;
    const regConfirmPassword = document.getElementById("regConfirmPassword").value;

    // Basic client-side validation (add server-side validation)
    if (regPassword !== regConfirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Mock registration logic (replace with server-side logic)
    alert(`Registration successful for ${regUsername}!`);
    registerModal.style.display = "none";
});

// Add to cart functionality (unchanged)
document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Product added to cart!');
    });
});
