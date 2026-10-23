// 1. Status Update via Click
const statusBtn = document.getElementById('status-btn');
const statusText = document.getElementById('status-text');

statusBtn.addEventListener('click', () => {
  statusText.textContent = 'Status: Action completed successfully!';
});

// 2. Live Character Count
const charInput = document.getElementById('char-input');
const charCount = document.getElementById('char-count');

charInput.addEventListener('input', (event) => {
  charCount.textContent = event.target.value.length;
});

// 3 & 4. Form Submit with Prevent Default and Error/Success Handling
const regForm = document.getElementById('reg-form');
const regName = document.getElementById('reg-name');
const regEmail = document.getElementById('reg-email');
const formFeedback = document.getElementById('form-feedback');

regForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameVal = regName.value.trim();
  const emailVal = regEmail.value.trim();

  // Reset previous styling classes
  formFeedback.className = '';

  if (!nameVal || !emailVal) {
    formFeedback.textContent = 'Error: Both name and email are required.';
    formFeedback.classList.add('error');
    return;
  }

  formFeedback.textContent = `Success! Registered ${nameVal} (${emailVal}).`;
  formFeedback.classList.add('success');

  regForm.reset();
});