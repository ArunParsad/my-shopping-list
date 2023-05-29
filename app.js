const input = document.querySelector('#user-input')
const inputForm = document.querySelector('#input-form')
const shoppingList = document.querySelector('.list')
const filter = document.querySelector('.filter')
let isEdit = false
// LocalStorage utilities

// Get items from loacal Storage

const getItemsFromLocalStorage = () => {
  let itemsFromStorage
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = []
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))
  }

  return itemsFromStorage
}

// Add item to local storage
const addToLocalStorage = (item) => {
  const itemsFromStorage = getItemsFromLocalStorage()
  itemsFromStorage.push(item)
  // conver to string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

// Event Handelar

// Create a button
const createButton = (classes) => {
  const button = document.createElement('button')
  button.className = classes
  return button
}

// Create a icon
const createIcon = (classes) => {
  const i = document.createElement('i')
  i.className = classes
  return i
}

const addItemToList = (e) => {
  e.preventDefault()
  const userInput = input.value
  if (userInput !== '') {
    if (isEdit) {
      const itemToEdit = shoppingList.querySelector('.edit-mode')
      removeFromLocalStorage(itemToEdit.textContent)
      itemToEdit.classList.remove('edit-mode')
      itemToEdit.remove()
      isEdit = false
    }
    addToDOM(userInput)
    input.value = ''
    addToLocalStorage(userInput)
  } else {
    alert('Please enter name of item')
  }
}

// Add to DOM

const addToDOM = (input) => {
  const li = document.createElement('li')
  li.className = 'list-item'
  const text = document.createElement('p')
  text.appendChild(document.createTextNode(input))
  li.appendChild(text)
  const div = document.createElement('div')
  div.className = 'button-group'
  const editButton = createButton('edit')
  const editIcon = createIcon('fa-solid fa-pen-to-square')
  editButton.appendChild(editIcon)
  const deleteButton = createButton('delete')
  const deleteIcon = createIcon('fa-solid fa-trash')
  deleteButton.appendChild(deleteIcon)
  div.appendChild(editButton)
  div.appendChild(deleteButton)
  li.appendChild(div)
  shoppingList.appendChild(li)
}
// displaying data
const display = () => {
  const itemsFromStorage = getItemsFromLocalStorage()
  itemsFromStorage.forEach((item) => addToDOM(item))
}

display()

// remove from local Storage
const removeFromLocalStorage = (item) => {
  const itemsFromStorage = getItemsFromLocalStorage()
  const updatedItemsFromStorage = itemsFromStorage.filter((i) => i !== item)
  localStorage.setItem('items', JSON.stringify(updatedItemsFromStorage))
}

// Complete the List
const onClickList = (e) => {
  if (e.target.classList.contains('list-item')) {
    e.target.classList.toggle('completed')
  }

  if (e.target.classList.contains('fa-trash')) {
    e.target.parentElement.parentElement.parentElement.remove()
    removeFromLocalStorage(
      e.target.parentElement.parentElement.parentElement.textContent
    )
  }

  if (e.target.classList.contains('fa-pen-to-square')) {
    isEdit = true
    input.value = e.target.parentElement.parentElement.parentElement.textContent
    e.target.parentElement.parentElement.parentElement.classList.toggle(
      'edit-mode'
    )
  }
}

const filterItems = (e) => {
  const input = e.target.value.toLowerCase()
  const listItems = shoppingList.querySelectorAll('li')
  listItems.forEach((item) => {
    if (item.textContent.toLowerCase().indexOf(input) !== -1) {
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  })
}

// Event listeners
inputForm.addEventListener('submit', addItemToList)
shoppingList.addEventListener('click', onClickList)
filter.addEventListener('input', filterItems)
