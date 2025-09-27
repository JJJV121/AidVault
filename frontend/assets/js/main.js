/* ===== HAMBURGER MENU TOGGLE ===== */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('header nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('change');
    navMenu.classList.toggle('active');
});

/* Optional: Close menu on link click (mobile) */
document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', () => {
        if(navMenu.classList.contains('active')){
            navMenu.classList.remove('active');
            hamburger.classList.remove('change');
        }
    });
});

/* ===== SMOOTH SCROLL FOR ANCHORS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ===== OPTIONAL: Form Validation Example ===== */
function validateDonationForm(form){
    const name = form.donorName.value.trim();
    const email = form.email.value.trim();
    const amount = form.amount.value.trim();

    if(name === '' || email === '' || amount === ''){
        alert('Please fill all required fields.');
        return false;
    }
    if(isNaN(amount) || Number(amount) <= 0){
        alert('Please enter a valid donation amount.');
        return false;
    }
    return true;
}

/* ===== Example Usage: Attach validation to form ===== */
const donateForm = document.querySelector('form');
if(donateForm){
    donateForm.addEventListener('submit', function(e){
        if(!validateDonationForm(this)){
            e.preventDefault();
        }
    });
}

/* ===== FUTURE: Add dynamic table sorting/filtering here ===== */
