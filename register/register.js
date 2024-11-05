function addParticipantSection() {
    participantCount++;
    const newParticipantHTML = participantTemplate(participantCount);
    document.getElementById("addButton").insertAdjacentHTML('beforebegin', newParticipantHTML);
}
function participantTemplate(count) {
    return `
        <section class="participant${count}">
            <label for="name_${count}">Name:</label>
            <input type="text" id="name_${count}" required>
            <label for="age_${count}">Age:</label>
            <input type="number" id="age_${count}" required>
            <!-- Add more fields as needed -->
        </section>
    `;
}
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission and page reload

    // Get the adult's name
    const adultName = document.getElementById('adultName').value;

    // Sum all the fee inputs
    const feeInputs = document.querySelectorAll('input[id^="fee_"]');
    let totalFees = 0;
    feeInputs.forEach(input => {
        totalFees += parseFloat(input.value) || 0; // Add fee value, ignore invalid entries
    });

    // Get the number of participants
    const numParticipants = document.querySelectorAll('section[class^="participant"]').length;

    // Hide the form and show the summary
    document.querySelector('form').style.display = 'none';
    const summaryElement = document.getElementById('summary');
    summaryElement.style.display = 'block';
    summaryElement.innerHTML = `Thank you ${adultName} for registering. You have registered ${numParticipants} participants and owe $${totalFees.toFixed(2)} in fees.`;
});
function totalFees() {
    let feeElements = document.querySelectorAll("[id^='fee']");
    feeElements = [...feeElements]; // Convert NodeList to Array
    return feeElements.reduce((total, input) => total + (parseFloat(input.value) || 0), 0); // Sum the fees
}
function successTemplate(info) {
    return `Thank you ${info.adultName} for registering. You have registered ${info.numParticipants} participants and owe $${info.totalFees.toFixed(2)} in fees.`;
}
document.querySelector('form').addEventListener('submit', submitForm);

function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    const adultName = document.getElementById('adultName').value; // Get the adult's name
    const fees = totalFees(); // Calculate total fees
    const numParticipants = document.querySelectorAll('section[class^="participant"]').length; // Count participants

    // Hide the form and show the summary
    document.querySelector('form').classList.add('hide');
    const summaryElement = document.getElementById('summary');
    summaryElement.style.display = 'block';
    
    // Insert the success message
    const info = {
        adultName,
        numParticipants,
        totalFees: fees
    };
    summaryElement.innerHTML = successTemplate(info);
}
