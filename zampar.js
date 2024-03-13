const inputEl = document.querySelector('.input')
const addTaskEl = document.querySelector('.add-btn')
const tasksEl = document.querySelector('.tasks')
let lastId = 0

let tasks = []
loadFromStorage()

function criaEl(value) {
    const el = document.createElement(value)
    return el
}

function criaTarefa() {
    if (!inputEl.value) return

    lastId++
    let id = lastId
    tasks.push({
        id: id,
        label: inputEl.value,
        checked: false
    })

    inputEl.value = ''
    inputEl.focus()
    updateStorage()
    updadeView()
}

function updadeView() {
    tasksEl.innerHTML = ``

    tasks.forEach((task) => {
        const li = criaEl('li')
        const label = criaEl('label')
        const input = criaEl('input')
        const span = criaEl('span')
        const button = criaEl('button')

        li.appendChild(label)
        li.appendChild(button)
        label.appendChild(input)
        label.appendChild(span)
        button.classList.add('remove')
        button.innerHTML = `<i class='bx bx-x-circle'></i>`
        button.onclick = () => {
            const indice = tasks.findIndex(value => value.id === task.id)
            if (indice === -1) return
            tasks.splice(indice, 1)
            updadeView()
            updateStorage()
        }

        span.innerText = task.label
        input.type = 'checkbox'
        input.checked = task.checked
        span.className = task.checked ? 'checked' : ''

        input.onclick = () => {
            console.log(task.checked);
            task.checked = !task.checked
            
            updateStorage()
            updadeView()
        }



        tasksEl.appendChild(li)

    })

}

function updateStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('lastId', lastId)
}

function loadFromStorage() {
    tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    lastId = parseInt(localStorage.getItem('lastId') || '0')
    updadeView()
}


addTaskEl.addEventListener('click', () => {
    criaTarefa()
})


const pao = 'Nome'

try {
    pao = Number(pao)
} catch (error) {
    console.log(error);
} finally {
    console.log('Sempre executado');
}

