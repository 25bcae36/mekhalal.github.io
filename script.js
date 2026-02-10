// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCO_pq0O1ITuOdnuzPCPhfxuAB6Hg-o1QM",
    authDomain: "portfolio-78f09.firebaseapp.com",
    projectId: "portfolio-78f09",
    storageBucket: "portfolio-78f09.firebasestorage.app",
    messagingSenderId: "422171464494",
    appId: "1:422171464494:web:14e33e3e69f55b07b220bf",
    measurementId: "G-SMQ2MMPXPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    // Form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

async function handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const submitBtn = e.target.querySelector('button[type="submit"]');

    if (!name || !email || !message) {
        showStatus('❌ Please fill all fields!', 'error');
        return;
    }

    // Disable button to prevent multiple submissions
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    }

    try {
        // Add a new document with a generated id.
        await addDoc(collection(db, "portfolio_messages"), {
            name: name,
            email: email,
            message: message,
            timestamp: serverTimestamp()
        });

        // Reset form
        e.target.reset();
        showStatus('✅ Message sent successfully! I will get back to you soon.', 'success');

    } catch (error) {
        console.error("Error adding document: ", error);
        showStatus('❌ Error sending message. Please try again later.', 'error');
    } finally {
        // Re-enable button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
    }
}

function showStatus(message, type) {
    const status = document.getElementById('formStatus');
    if (!status) return;

    status.textContent = message;
    status.className = `status ${type}`;

    setTimeout(() => {
        status.className = 'status';
        status.textContent = '';
    }, 4000);
}

