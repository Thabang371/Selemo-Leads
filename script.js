document.addEventListener('DOMContentLoaded', () => {
    const offerCards = document.querySelectorAll('.offer-card.selectable');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');
    const inquirySection = document.getElementById('inquiry-section');

    offerCards.forEach(card => {
        card.addEventListener('click', () => {
            // Extract the platform name cleanly from the data attribute
            const productName = card.getAttribute('data-offer');
            
            // Populate the form fields instantly
            if (subjectInput) {
                subjectInput.value = productName;
            }
            if (messageInput) {
                messageInput.value = `Hello, I would like to schedule a demo and get more information regarding the ${productName} setup for our organization. Please get in touch with me.`;
            }

            // Visual feedback: clear out previous selected colors, highlight current choice
            offerCards.forEach(c => c.style.borderColor = '#e1e1e1');
            card.style.borderColor = '#e57c35'; 

            // Smoothly glide down directly to the input fields
            if (inquirySection) {
                inquirySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});
