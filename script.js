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