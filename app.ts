// Selecting HTML elements (same as before)
const nameInput = document.getElementById('name') as HTMLInputElement | null;
const fatherNameInput = document.getElementById('fatherName') as HTMLInputElement | null;
const emailInput = document.getElementById('email') as HTMLInputElement | null;
const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
const addressInput = document.getElementById('address') as HTMLInputElement | null;
const skillsInput = document.getElementById('skills') as HTMLInputElement | null| undefined |any;

const educationContainer = document.getElementById('education-container') as HTMLElement | null;
const addEducationBtn = document.getElementById('addEducationBtn') as HTMLButtonElement | null;

const experienceContainer = document.getElementById('experience-container') as HTMLElement | null;
const addExperienceBtn = document.getElementById('addExperienceBtn') as HTMLButtonElement | null;

const resumePreview = document.getElementById('resumePreview') as HTMLElement | null|undefined | any;
const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement | null;
const saveBtn = document.getElementById('saveBtn') as HTMLButtonElement | null;
const downloadBtn = document.getElementById('downloadBtn') as HTMLButtonElement | null;

let educationCounter = 0;
let experienceCounter = 0;

// Add new education fields (same as before)
if (addEducationBtn && educationContainer) {
    addEducationBtn.addEventListener('click', () => {
        educationCounter++;
        const educationField = `
            <div class="education-entry">
                <label for="institute-${educationCounter}">Institute Name:</label>
                <input type="text" id="institute-${educationCounter}" placeholder="Enter your institute name">
                <label for="instituteAddress-${educationCounter}">Institute Address:</label>
                <input type="text" id="instituteAddress-${educationCounter}" placeholder="Enter your institute address">
                <label for="startDate-${educationCounter}">Start Date:</label>
                <input type="date" id="startDate-${educationCounter}">
                <label for="endDate-${educationCounter}">End Date:</label>
                <input type="date" id="endDate-${educationCounter}">
            </div>
        `;
        educationContainer.innerHTML += educationField;
    });
}

// Add new experience fields (same as before)
if (addExperienceBtn && experienceContainer) {
    addExperienceBtn.addEventListener('click', () => {
        experienceCounter++;
        const experienceField = `
            <div class="experience-entry">
                <label for="experience-${experienceCounter}">Experience:</label>
                <textarea id="experience-${experienceCounter}" placeholder="Enter your experience"></textarea>
            </div>
        `;
        experienceContainer.innerHTML += experienceField;
    });
}

// Generate the resume preview with editable sections
if (generateBtn && resumePreview) {
    generateBtn.addEventListener('click', generateResume);

    function generateResume() {
        const name = nameInput?.value ?? '';
        const fatherName = fatherNameInput?.value ?? '';
        const email = emailInput?.value ?? '';
        const phone = phoneInput?.value ?? '';
        const address = addressInput?.value ?? '';
        const skills = skillsInput?.value.split(',').map(skill => skill.trim());

        let educationEntries= '';
        for (let i = 1; i <= educationCounter; i++) {
            const institute = (document.getElementById(`institute-${i}`) as HTMLInputElement)?.value ?? '';
            const instituteAddress = (document.getElementById(`instituteAddress-${i}`) as HTMLInputElement)?.value ?? '';
            const startDate = (document.getElementById(`startDate-${i}`) as HTMLInputElement)?.value ?? '';
            const endDate = (document.getElementById(`endDate-${i}`) as HTMLInputElement)?.value ?? '';

            educationEntries += `
                <h3 contenteditable="true" class="editable">${institute}</h3>
                <p contenteditable="true" class="editable">${instituteAddress} | ${startDate} - ${endDate}</p>
            `;
        }

        let experienceEntries = '';
        for (let i = 1; i <= experienceCounter; i++) {
            const experience = (document.getElementById(`experience-${i}`) as HTMLTextAreaElement)?.value ?? '';
            experienceEntries += `<p contenteditable="true" class="editable">${experience}</p>`;
        }

        const resumeHTML = `
            <h2 contenteditable="true" class="editable">${name}</h2>
            <p><strong>Father's Name:</strong> <span contenteditable="true" class="editable">${fatherName}</span></p>
            <p><strong>Email:</strong> <span contenteditable="true" class="editable">${email}</span></p>
            <p><strong>Phone:</strong> <span contenteditable="true" class="editable">${phone}</span></p>
            <p><strong>Address:</strong> <span contenteditable="true" class="editable">${address}</span></p>

            <h2>Education</h2>
            ${educationEntries}

            <h2>Skills</h2>
            <ul>${skills.map(skill => `<li contenteditable="true" class="editable">${skill}</li>`).join('')}</ul>

            <h2>Experience</h2>
            ${experienceEntries}
        `;

        resumePreview.innerHTML = resumeHTML;

        // Make editable fields sync with inputs
        const editableElements = document.querySelectorAll('.editable');
        editableElements.forEach((element, index) => {
            element.addEventListener('input', () => {
                syncEditableFields();
            });
        });
    }
}

// Sync editable fields with input values
function syncEditableFields() {
    const nameElement = resumePreview?.querySelector('h2') as HTMLElement;
    const fatherNameElement = resumePreview?.querySelector('p span') as HTMLElement;
    const emailElement = resumePreview?.querySelector('p:nth-of-type(2) span') as HTMLElement;
    const phoneElement = resumePreview?.querySelector('p:nth-of-type(3) span') as HTMLElement;
    const addressElement = resumePreview?.querySelector('p:nth-of-type(4) span') as HTMLElement;

    if (nameInput && nameElement) nameInput.value = nameElement.innerText;
    if (fatherNameInput && fatherNameElement) fatherNameInput.value = fatherNameElement.innerText;
    if (emailInput && emailElement) emailInput.value = emailElement.innerText;
    if (phoneInput && phoneElement) phoneInput.value = phoneElement.innerText;
    if (addressInput && addressElement) addressInput.value = addressElement.innerText;}


// Save edited resume back to local storage (same as before)
if (saveBtn) {
    saveBtn.addEventListener('click', () => {
        const resumeData = {
            name: nameInput?.value ?? '',
            fatherName: fatherNameInput?.value ?? '',
            email: emailInput?.value ?? '',
            phone: phoneInput?.value ?? '',
            address: addressInput?.value ?? '',
            skills: skillsInput?.value ?? '',

            education: getEducationData(),
            experience: getExperienceData(),
        };
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        alert('Resume saved locally!');
    });
}

// Other functions remain unchanged...


// Function to get experience data
function getExperienceData() {
    const experiences: string[] = [];
    for (let i = 1; i <= experienceCounter; i++) {
        const experienceElement = document.getElementById(`experience-${i}`) as HTMLTextAreaElement | null;
        if (experienceElement) {
            experiences.push(experienceElement.value);
        }
    }
    return experiences;
}

// Function to get education data (for completeness)
function getEducationData() {
    const educationEntries: { institute: string; address: string; startDate: string; endDate: string }[] = [];
    for (let i = 1; i <= educationCounter; i++) {
        const instituteElement = document.getElementById(`institute-${i}`) as HTMLInputElement | null;
        const instituteAddressElement = document.getElementById(`instituteAddress-${i}`) as HTMLInputElement | null;
        const startDateElement = document.getElementById(`startDate-${i}`) as HTMLInputElement | null;
        const endDateElement = document.getElementById(`endDate-${i}`) as HTMLInputElement | null;

        if (instituteElement && instituteAddressElement && startDateElement && endDateElement) {
            educationEntries.push({
                institute: instituteElement.value,
                address: instituteAddressElement.value,
                startDate: startDateElement.value,
                endDate: endDateElement.value
            });
        }
    }
    return educationEntries;
}

// Call getExperienceData when needed
// For example, inside saveBtn event listener
if (saveBtn) {
    saveBtn.addEventListener('click', () => {
        const resumeData = {
            name: nameInput?.value ?? '',
            fatherName: fatherNameInput?.value ?? '',
            email: emailInput?.value ?? '',
            phone: phoneInput?.value ?? '',
            address: addressInput?.value ?? '',
            skills: skillsInput?.value ?? '',

            education: getEducationData(),
            experience: getExperienceData(),
        };
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        alert('Resume saved locally!');
    });
}

