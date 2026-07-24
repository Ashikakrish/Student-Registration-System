// ==========================
// Google Apps Script URL
// ==========================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzuKAXySqs_LeFO0fzk81x69NZdNFHQ1AO2AAMDbbHV_M8073QYhxQGGKdTKZwcEAoMPg/exec";

// ==========================
// Elements
// ==========================

const form = document.getElementById("studentForm");

const submitBtn = document.getElementById("submitBtn");

const btnText = document.getElementById("btnText");

const loader = document.getElementById("loader");

const toast = document.getElementById("toast");

const toastIcon = document.getElementById("toastIcon");

const toastMessage = document.getElementById("toastMessage");

// ==========================
// Toast Function
// ==========================

function showToast(message, success = true) {

    toastMessage.textContent = message;

    if (success) {
        toast.style.background = "#7BC47F";
        toastIcon.className = "fa-solid fa-circle-check";
    } else {
        toast.style.background = "#FF6B6B";
        toastIcon.className = "fa-solid fa-circle-xmark";
    }

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);

}

// ==========================
// Submit Form
// ==========================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const student = {

        name: document.getElementById("name").value.trim(),

        email: document.getElementById("email").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        department: document.getElementById("department").value,

        year: document.getElementById("year").value

    };

    // ======================
    // Validation
    // ======================

    if (
        student.name === "" ||
        student.email === "" ||
        student.phone === "" ||
        student.department === "" ||
        student.year === ""
    ) {

        showToast("Please fill all fields.", false);

        return;

    }

    // Email Validation

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(student.email)) {

        showToast("Invalid email address.", false);

        return;

    }

    // Phone Validation

    if (!/^\d{10}$/.test(student.phone)) {

        showToast("Phone number must contain 10 digits.", false);

        return;

    }

    // ======================
    // Loading Button
    // ======================

    submitBtn.disabled = true;

    btnText.textContent = "Registering...";

    loader.style.display = "inline-block";

    // ======================
    // Send Data
    // ======================

    fetch(SCRIPT_URL, {

        method: "POST",

        body: JSON.stringify(student)

    })

    .then(res => res.json())

    .then(data => {

        showToast("Registration Successful!");

        form.reset();

    })

    .catch(error => {

        console.error(error);

        showToast("Something went wrong!", false);

    })

    .finally(() => {

        submitBtn.disabled = false;

        btnText.textContent = "Register Student";

        loader.style.display = "none";

    });

});