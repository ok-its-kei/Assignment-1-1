window.addEventListener('load', () => {
    priorities = JSON.parse(localStorage.getItem('priorities')) || [];
    const nameInput = document.querySelector('#name');
    const newPriorityForm = document.querySelector('#new-priority-form');
    
    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })

    newPriorityForm.addEventListener('submit', e => {
        e.preventDefault();

        const priority = {
            content: e.target.elements.content.value,
            type: e.target.elements.type.value,
            done: false,
            createAt: new Date().getTime()
        }

        priorities.push(priority);

        localStorage.setItem('priorities', JSON.stringify(priorities));

        e.target.reset();

        DisplayPriorities();
    })

        DisplayPriorities();
})

function DisplayPriorities () {
    const priorityList = document.querySelector('#priority-list');
    
    priorityList.innerHTML = '';

    priorities.forEach(priority => {
        const  priorityItem = document.createElement('div');
        priorityItem.classList.add('priority-item')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = priority.done;
        span.classList.add('bubble');

        if (priority.category == 'common') {
            span.classList.add('common');
        } else {
            span.classList.add('top');
        }

        content.classList.add('priority-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${priority.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        priorityItem.appendChild(label);
        priorityItem.appendChild(content);
        priorityItem.appendChild(actions);

        priorityList.appendChild(priorityItem);

        if (priority.done) {
            priorityItem.classList.add('done');
        }

        input.addEventListener('click', e => {
            priority.done = e.target.checked;
            localStorage.setItem('priorities', JSON.stringify(priorities));

            if (priority.done) {
                priorityItem.classList.add('done');
            } else {
                priorityItem.classList.remove('done');
            }

            DisplayPriorities();
        })

        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                priority.content = e.target.value;
                localStorage.setItem('priorities',JSON.stringify(priorities));
                DisplayPriorities();
            })
        })

        deleteButton.addEventListener('click', e => {
            priorities = priorities.filter(t => t != priority);
            localStorage.setItem('priorities', JSON.stringify(priorities));
            DisplayPriorities();
        })
    })
}