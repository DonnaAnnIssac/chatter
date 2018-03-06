let $ = id => document.getElementById(id)

function createContainer () {
  let containerBox = document.createElement('div')
  containerBox.id = 'container'
  $('comments').appendChild(containerBox)
  return containerBox
}

function createCommentsContainer () {
  let commentsContainer = document.createElement('div')
  commentsContainer.id = 'commentsContainer'
  $('comments').appendChild(commentsContainer)
  return commentsContainer
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

function addAuthor (event) {
  let commentAuthor = document.createElement('div')
  if (event.target.parentElement.children[0].value !== '') {
    commentAuthor.innerText = event.target.parentElement.children[0].value
  } else {
    commentAuthor.innerText = 'Anonymous'
  }
  return commentAuthor
}

function createComment (commentText, event) {
  let commentBox = document.createElement('div')
  commentBox.appendChild(addAuthor(event))
  let comment = document.createElement('div')
  comment.innerText = commentText
  commentBox.appendChild(comment)
  return commentBox
}

function addComment (event, commentsContainer) {
  let commentText = event.target.parentElement.parentElement.children[0].value
  if (commentText !== '') {
    commentsContainer.appendChild(createComment(commentText, event))
  }
}

function createSubmitBtn (commentsContainer) {
  let submitBtn = document.createElement('button')
  submitBtn.innerText = 'Submit'
  submitBtn.className = 'postComment'
  submitBtn.addEventListener('click', (event) => addComment(event, commentsContainer))
  return submitBtn
}

function createIpWrapper (commentsContainer) {
  let authorDetails = document.createElement('div')
  authorDetails.appendChild(createNameHolder())
  authorDetails.appendChild(createSubmitBtn(commentsContainer))
  return authorDetails
}

function createCommentForm (container, commentsContainer) {
  container.appendChild(createInputBox())
  container.appendChild(createIpWrapper(commentsContainer))
}

function start () {
  let container = createContainer()
  let commentsContainer = createCommentsContainer()
  createCommentForm(container, commentsContainer)
}

start()
