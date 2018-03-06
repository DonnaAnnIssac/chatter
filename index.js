let $ = id => document.getElementById(id)

function createContainer () {
  let containerBox = document.createElement('div')
  containerBox.id = 'container'
  $('comments').appendChild(containerBox)
  return containerBox
}

function createInputBox () {
  let inputBox = document.createElement('input')
  inputBox.setAttribute('contenteditable', 'true')
  inputBox.setAttribute('placeholder', 'Enter comment here')
  inputBox.addEventListener('focus', (event) => {
    event.target.placeholder = ''
  })
  inputBox.addEventListener('blur', (event) => {
    event.target.placeholder = 'Enter comment here'
  })
  return inputBox
}
function createCommentForm (container) {
  let commentForm = document.createElement('div')
  container.appendChild(commentForm.appendChild(createInputBox()))
}

createCommentForm(createContainer())
