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
document.addEventListener('DOMContentLoaded', () => {
    const heroBtn = document.getElementById('hero-apply-btn');
    const jobsSection = document.getElementById('jobs-section');
    const jobCards = document.querySelectorAll('.job-card');
    const roleInput = document.getElementById('app-role');
    const appSection = document.getElementById('application-section');
    const appForm = document.getElementById('jobApplicationForm');

    // 1. Smooth scroll from Hero Section Button to Openings
    if (heroBtn && jobsSection) {
        heroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            jobsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 2. Click Opening -> Auto-Fill Role field & Scroll to Form
    jobCards.forEach(card => {
        const applyBtn = card.querySelector('.apply-btn');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                const targetJob = card.getAttribute('data-job');
                if (roleInput) {
                    roleInput.value = targetJob;
                }
                
                // Highlight choice visually
                jobCards.forEach(c => c.style.borderColor = '#e1e1e1');
                card.style.borderColor = '#e57c35';

                if (appSection) {
                    appSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }
    });

    // 3. Compile Data and Launch Native Email Client directly to careers@
    if (appForm) {
        appForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!roleInput.value) {
                alert("Please click 'Select & Apply' on one of our current career openings above before submitting.");
                return;
            }

            const name = document.getElementById('app-name').value;
            const email = document.getElementById('app-email').value;
            const role = roleInput.value;
            const resumeLink = document.getElementById('app-resume-link').value || "Not Linked (Will attach manually to email)";
            const coverNotes = document.getElementById('app-cover').value;

            const targetEmail = "careers@selemoleads.com";
            const emailSubject = encodeURIComponent(`Job Application: ${role} - ${name}`);
            
            const emailBody = encodeURIComponent(
                `Selemo Leads Direct - Careers Application Info:\n` +
                `=========================================\n\n` +
                `Applicant Name: ${name}\n` +
                `Applicant Contact Email: ${email}\n` +
                `Target Position: ${role}\n` +
                `CV / Cloud Portfolio Link: ${resumeLink}\n\n` +
                `Cover Letter / Executive Summary Notes:\n` +
                `${coverNotes}\n\n` +
                `-----------------------------------------\n` +
                `*Recruitment Reminder to Applicant: Remember to drop your physical PDF CV/Resume onto this email window if you did not supply a cloud sharing link above.*`
            );

            // Pop open user email workspace
            window.location.href = `mailto:${targetEmail}?subject=${emailSubject}&body=${emailBody}`;
        });
    }
});
