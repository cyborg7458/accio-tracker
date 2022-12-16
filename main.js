const userName = document.getElementById('user-name');
const addUserBtn = document.getElementById('add-user-btn');
const userList = document.getElementById('user-list');

let userData = JSON.parse(localStorage.getItem('accio-interview-data'));
if(!userData) userData = [];

const updateLocalStorage = () => {
    localStorage.setItem('accio-interview-data', JSON.stringify(userData));
    displayUserList();
}

const increment = (e) => {
    const idx = e.target.getAttribute('idx');
    userData[idx].interviewCount++;
    updateLocalStorage();
}

const decrement = (e) => {
    const idx = e.target.getAttribute('idx');
    if(userData[idx].interviewCount>0) {
        userData[idx].interviewCount--;
        updateLocalStorage();
    }
}

const displayUserList = () => {
    userList.innerHTML = "";

    let userComponentList = userData.map((user, idx) => {
        let userComponent = document.createElement('div');
        userComponent.setAttribute('class', 'user-component');
        
        let userNameField = document.createElement('span');
        userNameField.setAttribute('class', 'abc');
        userNameField.innerText = user.name;

        
        let incrBtn = document.createElement('button'); 
        incrBtn.innerText = "+";
        incrBtn.setAttribute('class', 'func-btn plus-btn');
        incrBtn.setAttribute('idx', idx);
        incrBtn.addEventListener('click', increment);

        let decrBtn = document.createElement('button');
        decrBtn.innerText = "-";
        decrBtn.setAttribute('class', 'func-btn minus-btn');
        decrBtn.setAttribute('idx', idx);
        decrBtn.addEventListener('click', decrement);

        let countDisplay = document.createElement('span');
        countDisplay.setAttribute('id', 'count-display')
        countDisplay.innerHTML = user.interviewCount;
        
        let btnGroup = document.createElement('span');
        btnGroup.appendChild(decrBtn);
        btnGroup.appendChild(countDisplay);
        btnGroup.appendChild(incrBtn);

        userComponent.appendChild(userNameField);
        userComponent.appendChild(btnGroup);

        return userComponent;
    })
    userComponentList.forEach(userComponent => {
        console.log(userComponent);
        userList.appendChild(userComponent);
    })
}


addUserBtn.addEventListener('click', () => {
    const user = userName.value;
    if(!user) return alert("Enter user name");
    else {
        const newUser = {
            name: user,
            interviewCount: 0
        }
        userData.push(newUser);
        updateLocalStorage();
    }
    userName.value = "";
})

displayUserList();

