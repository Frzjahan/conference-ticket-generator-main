const fullName = document.querySelector('#full-name');
const emailAddress = document.querySelector('#email-address');
const githubUsername = document.querySelector('#github-username');
const avatarInput = document.querySelector('#avatar');
const previews = document.querySelectorAll('#preview');
const btn = document.querySelector('.generate-btn');
const fileError = document.querySelector('.file-error');
const emailError = document.querySelector('.email-error');
const uploadInfo = document.querySelector('.upload-info');
const photoUploadedContainer = document.querySelector('.photo-uploaded-container');
const uploadAvatar = document.querySelector('.upload-avatar');
const removeImageBtn = document.querySelector('.remove-image-btn');
const changeImageBtn = document.querySelector('.change-image-btn');
const formPage = document.querySelector('.form-page');
const ticketPage = document.querySelector('.ticket-ready-page');
const headerEmail = document.querySelector('.header-email');
const headerFullName = document.querySelector('.header-full-name');
const ticketFullName = document.querySelector('.ticket-full-name');
const ticketGithub = document.querySelector('.ticket-github');
const dragAndDropText = document.querySelector('.drag-and-drop-text');
const drogoverText = document.querySelector('.dragover-text');
const cloudSvg = document.querySelector('.cloud');

let isValid = true;

function previewsForeach(){
    previews.forEach((preview)=>{
        preview.src = '';
    })
};

btn.addEventListener('click', (event)=>{
    event.preventDefault();

    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if(avatarInput.value === ''){
        fileError.classList.add('error');
        fileError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="#e16151" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/><path fill="#e16151" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/><path stroke="#e16151" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/></svg><span>File too large. Please upload a photo under 500KB.</span>'
        uploadInfo.style.display = 'none';
        isValid = false;
    }
    if(emailAddress.value === ''){
        emailError.classList.add('error');
        emailError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="#e16151" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/><path fill="#e16151" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/><path stroke="#e16151" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/></svg><span>Please enter a valid email address.</span>'
        emailAddress.classList.add('border-error');
        isValid = false;
    }
    if(!emailRegex.test(emailAddress.value.trim())){
        emailError.classList.add('error');
        emailError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="#e16151" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/><path fill="#e16151" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/><path stroke="#e16151" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/></svg><span>Please enter a valid email address.</span>'
        emailAddress.classList.add('border-error');
        isValid = false;
    }
    if(isValid){
        formPage.style.display = 'none';
        ticketPage.style.display = 'flex';
        headerEmail.innerHTML = emailAddress.value;
        headerFullName.innerHTML = fullName.value;
        ticketFullName.innerHTML = fullName.value;
        ticketGithub.innerHTML = githubUsername.value;
    }
})

emailAddress.addEventListener('input', ()=>{
    if(emailAddress.value !== ''){
        emailError.classList.remove('error');
        emailError.innerHTML = '';
        emailAddress.classList.remove('border-error');
    }
})

avatarInput.addEventListener('input', ()=>{
    if(avatarInput.value !== ''){
        fileError.classList.remove('error');
        fileError.innerHTML = '';
        uploadInfo.style.display = 'flex';
    }
})

avatarInput.addEventListener('change', ()=>{
    const file = avatarInput.files[0];

    if(file){
        if(file.size > 500 * 1024){
            fileError.classList.add('error');
            fileError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="#e16151" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/><path fill="#e16151" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/><path stroke="#e16151" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/></svg><span>File too large. Please upload a photo under 500KB.</span>'
            uploadInfo.style.display = 'none';
            isValid = false;
            photoUploadedContainer.style.display = 'none';
            uploadAvatar.style.display = 'flex';
            avatarInput.value = '';
            previewsForeach();
            return;
        } else{
            fileError.classList.remove('error');
            fileError.innerHTML = ''
            uploadInfo.style.display = 'flex';
            isValid = true;
        }
        previews.forEach((preview)=>{
            preview.src = URL.createObjectURL(file);
        })
        photoUploadedContainer.style.display = 'flex';
        uploadAvatar.style.display = 'none';
    }
});

removeImageBtn.addEventListener('click', ()=>{
    photoUploadedContainer.style.display = 'none';
    uploadAvatar.style.display = 'flex';
    previewsForeach();
    avatarInput.value = '';
})

changeImageBtn.addEventListener('click', ()=>{
    avatarInput.click();
})

window.addEventListener('load', ()=>{
    fullName.value = '';
    emailAddress.value = '';
    githubUsername.value = '';
})

let dragCounter = 0;

uploadAvatar.addEventListener('dragenter', (e) => {
    e.preventDefault();

    dragCounter++;
    uploadAvatar.classList.add('dragover');
});

uploadAvatar.addEventListener('dragover', (e) => {
    e.preventDefault();
});

uploadAvatar.addEventListener('dragleave', () => {
    dragCounter--;

    if (dragCounter === 0) {
        uploadAvatar.classList.remove('dragover');
    }
});

uploadAvatar.addEventListener('drop', (e) => {
    e.preventDefault();

    dragCounter = 0;
    uploadAvatar.classList.remove('dragover');

    const file = e.dataTransfer.files[0];

    if (!file) return;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    avatarInput.files = dataTransfer.files;

    avatarInput.dispatchEvent(new Event('change'));
});