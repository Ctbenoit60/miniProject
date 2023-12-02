// Function to toggle between login and signup forms
function toggleForm() {
    const loginForm = document.getElementById('loginForm');
    const switchFormText = document.querySelector('.switch-form');

    if (loginForm.getAttribute('action') === '#signup') {
        loginForm.setAttribute('action', '#login');
        switchFormText.innerHTML = "Don't have an account? <a href='#' onclick='toggleForm()'>Sign Up</a>";
    } else {
        loginForm.setAttribute('action', '#signup');
        switchFormText.innerHTML = "Already have an account? <a href='#' onclick='toggleForm()'>Sign In</a>";
    }
}

// Function to handle login/signup
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        // Handle the response data (you may redirect the user or show a message)
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}
