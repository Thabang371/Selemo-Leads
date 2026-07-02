document.addEventListener('DOMContentLoaded', () => {
    const offerCards = document.querySelectorAll('.offer-card.selectable');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');
    const inquirySection = document.getElementById('inquiry-section');
    const inquiryForm = document.getElementById('offerInquiryForm');
    const submitBtn = document.getElementById('submit-btn-text');

    // 1. Handle Card Selection Events
    offerCards.forEach(card => {
        card.addEventListener('click', () => {
            const productName = card.getAttribute('data-offer');
            
            if (subjectInput) {
                subjectInput.value = productName;
            }
            if (messageInput) {
                messageInput.value = `Hello, I would like to schedule a demo and get more information regarding the ${productName} setup for our organization. Please get in touch with me.`;
            }

            offerCards.forEach(c => c.style.borderColor = '#e1e1e1');
            card.style.borderColor = '#e57c35'; 

            if (inquirySection) {
                inquirySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // 2. Handle Live Agent Form Dispatch via Formspree
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop page from hard reloading
            
            if (!subjectInput.value) {
                alert("Please select one of our premium offers above before submitting your inquiry.");
                return;
            }

            submitBtn.textContent = "SENDING REQUEST...";
            submitBtn.disabled = true;

            const formData = new FormData(inquiryForm);

            try {
                const response = await fetch(inquiryForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    submitBtn.textContent = "REQUEST SENT SUCCESSFULLY!";
                    submitBtn.style.backgroundColor = "#27ae60"; // Success Green
                    alert(`Thank you! Your request for the ${subjectInput.value} has been routed directly to a Selemo agent. We will contact you shortly.`);
                    inquiryForm.reset();
                    offerCards.forEach(c => c.style.borderColor = '#e1e1e1');
                } else {
                    throw new Error("Transmission breakdown");
                }
            } catch (error) {
                submitBtn.textContent = "SEND INQUIRY";
                submitBtn.disabled = false;
                alert("Oops! There was a slight connection problem sending your lead request. Please try again or email us directly.");
            }
        });
    }
});
