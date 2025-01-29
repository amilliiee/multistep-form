let currentTab = 1; // Current tab set as first tab
const mainBtn = document.getElementById('mainBtn');

document.querySelectorAll('.checkboxLabel').forEach(label => {
    const checkbox = label.querySelector('input[type=checkbox]');
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            label.classList.add('checked');
        } else {
            label.classList.remove('checked');
        }
    })
})

function showTab(a) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.style.display = 'none';
        tab.classList.remove('filled');
        tab.classList.remove('current');
    });

    const currTab = document.getElementById(`tab${a}`);
    if (currTab) {
        currTab.style.display = 'block';
        currTab.classList.add('filled');
        currTab.classList.add('current');
    } else {
        console.error('Tab not found');
    }

    document.querySelectorAll('.step').forEach((dot, index) => {
        dot.classList.toggle('filled', index < a);
        dot.classList.toggle('current', index === a - 1);
    });

    const stepNum = document.getElementById('stepNum');
    stepNum.textContent = `Step ${a} of 3`;

    const mainBtn = document.getElementById('mainBtn');
    if (a === 3) {
        mainBtn.textContent = 'Confirm';
    } else {
        mainBtn.textContent = 'Continue';
    }
}

function nextTab() {
    const currTab = document.querySelector('.tab.current');
    const inputs = currTab.querySelectorAll('input');
    let valid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.reportValidity();
            valid = false;
        }
    });

    if (valid) {
        if (currentTab < 3) {
            currentTab++;
            showTab(currentTab);
            if (currentTab === 3) {
                updateSummary();
            }
        } else {
            alert('Form has been submitted');
        }
    }
}

function updateSummary() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;

    console.log('Full Name:', fullName);
    console.log('Email:', email);

    document.getElementById('summName').textContent = fullName;
    document.getElementById('summEmail').textContent = email;

    const interests = [];
    if (document.getElementById('int1').checked) interests.push('Software Development');
    if (document.getElementById('int2').checked) interests.push('User Experience');
    if (document.getElementById('int3').checked) interests.push('Graphic Design');

    console.log('Interests:', interests);

    const interestsContainer = document.createElement('ul');
    interests.forEach(interest => {
        const li = document.createElement('li');
        li.textContent = interest;
        interestsContainer.appendChild(li);
    });

    const topicsElement = document.getElementById('summTopics');
    if (topicsElement) {
        topicsElement.innerHTML = '';
        topicsElement.appendChild(interestsContainer);
    } else {
        console.error('Element with ID "summTopics" not found');
    }
}

mainBtn.addEventListener('click', nextTab);

showTab(currentTab);