let $ = id => document.getElementById(id)

function createContainer () {
  let containerBox = document.createElement('div')
  containerBox.id = 'container'
  $('comments').appendChild(containerBox)
  return containerBox
}

function removePlaceHolder (event) {
  event.target.placeholder = ''
}

function addPlaceHolder (event, text) {
  event.target.placeholder = text
}

function createInputBox () {
  let inputBox = document.createElement('input')
  inputBox.id = 'inputBox'
  inputBox.setAttribute('placeholder', 'Enter comment here')
  inputBox.addEventListener('focus', (event) => removePlaceHolder(event))
  inputBox.addEventListener('blur', (event) => addPlaceHolder(event, 'Enter comment here'))
  return inputBox
}

function createNameHolder () {
  let authorName = document.createElement('input')
  authorName.setAttribute('placeholder', 'Name (Optional)')
  authorName.addEventListener('focus', (event) => removePlaceHolder(event))
  authorName.addEventListener('blur', (event) => addPlaceHolder(event, 'Name (Optional)'))
  return authorName
}

function createSubmitBtn () {
  let submitBtn = document.createElement('button')
  submitBtn.innerText = 'Submit'
  submitBtn.addEventListener('click', () => { console.log('Hello World') })
  return submitBtn
}

function createIpWrapper () {
  let authorDetails = document.createElement('div')
  authorDetails.appendChild(createNameHolder())
  authorDetails.appendChild(createSubmitBtn())
  return authorDetails
}

function createCommentForm (container) {
  let commentForm = document.createElement('div')
  commentForm.appendChild(createInputBox())
  commentForm.appendChild(createIpWrapper())
  container.appendChild(commentForm)
}

createCommentForm(createContainer())
