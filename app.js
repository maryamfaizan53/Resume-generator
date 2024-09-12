// Selecting HTML elements
var nameInput = document.getElementById('name');
var fatherNameInput = document.getElementById('fatherName');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var addressInput = document.getElementById('address');
var skillsInput = document.getElementById('skills');
var educationContainer = document.getElementById('education-container');
var addEducationBtn = document.getElementById('addEducationBtn');
var experienceContainer = document.getElementById('experience-container');
var addExperienceBtn = document.getElementById('addExperienceBtn');
var resumePreview = document.getElementById('resumePreview');
var generateBtn = document.getElementById('generateBtn');
var saveBtn = document.getElementById('saveBtn');
var downloadBtn = document.getElementById('downloadBtn');
var educationCounter = 0;
var experienceCounter = 0;
// Add new education fields
if (addEducationBtn && educationContainer) {
    addEducationBtn.addEventListener('click', function () {
        educationCounter++;
        var educationField = "\n            <div class=\"education-entry\">\n                <label for=\"institute-".concat(educationCounter, "\">Institute Name:</label>\n                <input type=\"text\" id=\"institute-").concat(educationCounter, "\" placeholder=\"Enter your institute name\">\n                <label for=\"instituteAddress-").concat(educationCounter, "\">Institute Address:</label>\n                <input type=\"text\" id=\"instituteAddress-").concat(educationCounter, "\" placeholder=\"Enter your institute address\">\n                <label for=\"startDate-").concat(educationCounter, "\">Start Date:</label>\n                <input type=\"date\" id=\"startDate-").concat(educationCounter, "\">\n                <label for=\"endDate-").concat(educationCounter, "\">End Date:</label>\n                <input type=\"date\" id=\"endDate-").concat(educationCounter, "\">\n            </div>\n        ");
        educationContainer.innerHTML += educationField;
    });
}
// Add new experience fields
if (addExperienceBtn && experienceContainer) {
    addExperienceBtn.addEventListener('click', function () {
        experienceCounter++;
        var experienceField = "\n            <div class=\"experience-entry\">\n                <label for=\"experience-".concat(experienceCounter, "\">Experience:</label>\n                <textarea id=\"experience-").concat(experienceCounter, "\" placeholder=\"Enter your experience\"></textarea>\n            </div>\n        ");
        experienceContainer.innerHTML += experienceField;
    });
}
// Generate the resume preview
if (generateBtn && resumePreview) {
    generateBtn.addEventListener('click', generateResume);
    function generateResume() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        var name = (_a = nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) !== null && _a !== void 0 ? _a : '';
        var fatherName = (_b = fatherNameInput === null || fatherNameInput === void 0 ? void 0 : fatherNameInput.value) !== null && _b !== void 0 ? _b : '';
        var email = (_c = emailInput === null || emailInput === void 0 ? void 0 : emailInput.value) !== null && _c !== void 0 ? _c : '';
        var phone = (_d = phoneInput === null || phoneInput === void 0 ? void 0 : phoneInput.value) !== null && _d !== void 0 ? _d : '';
        var address = (_e = addressInput === null || addressInput === void 0 ? void 0 : addressInput.value) !== null && _e !== void 0 ? _e : '';
        var skills = skillsInput === null || skillsInput === void 0 ? void 0 : skillsInput.value.split(',').map(function (skill) { return skill.trim(); });
        var educationEntries = '';
        for (var i = 1; i <= educationCounter; i++) {
            var institute = (_g = (_f = document.getElementById("institute-".concat(i))) === null || _f === void 0 ? void 0 : _f.value) !== null && _g !== void 0 ? _g : '';
            var instituteAddress = (_j = (_h = document.getElementById("instituteAddress-".concat(i))) === null || _h === void 0 ? void 0 : _h.value) !== null && _j !== void 0 ? _j : '';
            var startDate = (_l = (_k = document.getElementById("startDate-".concat(i))) === null || _k === void 0 ? void 0 : _k.value) !== null && _l !== void 0 ? _l : '';
            var endDate = (_o = (_m = document.getElementById("endDate-".concat(i))) === null || _m === void 0 ? void 0 : _m.value) !== null && _o !== void 0 ? _o : '';
            educationEntries += "\n                <h3>".concat(institute, "</h3>\n                <p>").concat(instituteAddress, " | ").concat(startDate, " - ").concat(endDate, "</p>\n            ");
        }
        var experienceEntries = '';
        for (var i = 1; i <= experienceCounter; i++) {
            var experience = (_q = (_p = document.getElementById("experience-".concat(i))) === null || _p === void 0 ? void 0 : _p.value) !== null && _q !== void 0 ? _q : '';
            experienceEntries += "<p>".concat(experience, "</p>");
        }
        var resumeHTML = "\n            <h2>".concat(name, "</h2>\n            <p><strong>Father's Name:</strong> ").concat(fatherName, "</p>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n            <p><strong>Address:</strong> ").concat(address, "</p>\n\n            <h2>Education</h2>\n            ").concat(educationEntries, "\n\n            <h2>Skills</h2>\n            <ul>").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</ul>\n\n            <h2>Experience</h2>\n            ").concat(experienceEntries, "\n        ");
        resumePreview.innerHTML = resumeHTML;
    }
}
// Save the resume data to local storage
if (saveBtn) {
    saveBtn.addEventListener('click', function () {
        var _a, _b, _c, _d, _e, _f;
        var resumeData = {
            name: (_a = nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) !== null && _a !== void 0 ? _a : '',
            fatherName: (_b = fatherNameInput === null || fatherNameInput === void 0 ? void 0 : fatherNameInput.value) !== null && _b !== void 0 ? _b : '',
            email: (_c = emailInput === null || emailInput === void 0 ? void 0 : emailInput.value) !== null && _c !== void 0 ? _c : '',
            phone: (_d = phoneInput === null || phoneInput === void 0 ? void 0 : phoneInput.value) !== null && _d !== void 0 ? _d : '',
            address: (_e = addressInput === null || addressInput === void 0 ? void 0 : addressInput.value) !== null && _e !== void 0 ? _e : '',
            skills: (_f = skillsInput === null || skillsInput === void 0 ? void 0 : skillsInput.value) !== null && _f !== void 0 ? _f : '',
            education: getEducationData(),
            experience: getExperienceData(),
        };
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        alert('Resume saved locally!');
    });
}
// Load resume from local storage if available
window.addEventListener('load', function () {
    var savedData = localStorage.getItem('resumeData');
    if (savedData) {
        var resumeData = JSON.parse(savedData);
        loadResumeData(resumeData);
    }
});
// Helper functions to extract data from dynamic fields
function getEducationData() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var educationData = [];
    for (var i = 1; i <= educationCounter; i++) {
        var institute = (_b = (_a = document.getElementById("institute-".concat(i))) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
        var instituteAddress = (_d = (_c = document.getElementById("instituteAddress-".concat(i))) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : '';
        var startDate = (_f = (_e = document.getElementById("startDate-".concat(i))) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : '';
        var endDate = (_h = (_g = document.getElementById("endDate-".concat(i))) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : '';
        educationData.push({ institute: institute, instituteAddress: instituteAddress, startDate: startDate, endDate: endDate });
    }
    return educationData;
}
function getExperienceData() {
    var _a, _b;
    var experienceData = [];
    for (var i = 1; i <= experienceCounter; i++) {
        var experience = (_b = (_a = document.getElementById("experience-".concat(i))) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
        experienceData.push(experience);
    }
    return experienceData;
}
function loadResumeData(data) {
    nameInput.value = data.name;
    fatherNameInput.value = data.fatherName;
    emailInput.value = data.email;
    phoneInput.value = data.phone;
    addressInput.value = data.address;
    skillsInput.value = data.skills;
    educationCounter = 0;
    experienceCounter = 0;
    data.education.forEach(function (edu) {
        addEducationBtn === null || addEducationBtn === void 0 ? void 0 : addEducationBtn.click();
        document.getElementById("institute-".concat(educationCounter)).value = edu.institute;
        document.getElementById("instituteAddress-".concat(educationCounter)).value = edu.instituteAddress;
        document.getElementById("startDate-".concat(educationCounter)).value = edu.startDate;
        document.getElementById("endDate-".concat(educationCounter)).value = edu.endDate;
    });
    data.experience.forEach(function (exp) {
        addExperienceBtn === null || addExperienceBtn === void 0 ? void 0 : addExperienceBtn.click();
        document.getElementById("experience-".concat(experienceCounter)).value = exp;
    });
}
// Download resume as an HTML file
if (downloadBtn && resumePreview) {
    downloadBtn.addEventListener('click', function () {
        var blob = new Blob([resumePreview.innerHTML], { type: 'text/html' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.html';
        link.click();
    });
}
