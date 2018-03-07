let $ = id => document.getElementById(id)
let commentsArray = []

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
  inputBox.className = 'inputBox'
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

function addAuthor (author) {
  let commentAuthor = document.createElement('div')
  commentAuthor.innerText = author
  return commentAuthor
}

function addTime (time) {
  let commentTime = document.createElement('div')
//   let ts = new Date(time)
//   console.log(time / 1000)
  let nowTs = Math.floor(new Date().getTime() / 1000)
//   console.log(nowTs)
  let seconds = nowTs - Math.floor(time / 1000)
//   console.log(seconds)
  if (seconds > 2 * 24 * 3600) {
    commentTime.innerText = Math.floor(seconds / (24 * 3600)) + ' days ago'
  } else if (seconds > 24 * 3600) {
    commentTime.innerText = 'yesterday'
  } else if (seconds > 2 * 3600) {
    commentTime.innerText = Math.floor(seconds / 3600) + ' hours ago'
  } else if (seconds > 3600) {
    commentTime.innerText = '1 hour ago'
  } else if (seconds > 60) {
    commentTime.innerText = Math.floor(seconds / 60) + ' minutes ago'
  } else if (seconds === 60) {
    commentTime.innerText = '1 minute ago'
  } else commentTime.innerText = seconds + ' seconds ago'
  return commentTime
}

function addAuthorAndTime (obj) {
  let commentHeader = document.createElement('div')
  commentHeader.appendChild(addAuthor(obj.author))
  commentHeader.appendChild(addTime(obj.time))
  return commentHeader
}

function createCommentObj (commentText, event) {
  let comment = {}
  comment['text'] = commentText
  if (event.target.parentElement.children[0].value !== '') {
    comment['author'] = event.target.parentElement.children[0].value
  } else {
    comment['author'] = 'Anonymous'
  }
  comment['time'] = new Date().getTime()
  commentsArray.push(comment)
  return comment
}

function replyHandler (container) {
  if (container.style.display === 'flex') {
    container.style.display = 'none'
  } else {
    container.style.display = 'flex'
  }
}

function addReactionOps (commentBox) {
  let ops = document.createElement('div')
  let replyBtn = document.createElement('div')
  replyBtn.innerText = 'Reply'
  replyBtn.style.cursor = 'pointer'
  ops.appendChild(replyBtn)
  let replyBox = document.createElement('div')
  replyBox.style.display = 'none'
  ops.appendChild(replyBox)
  createCommentForm(replyBox, ops)
  replyBtn.addEventListener('click', () => {
    replyHandler(replyBox)
  })
  return ops
}

function createComment (commentObj) {
  let commentBox = document.createElement('div')
  commentBox.appendChild(addAuthorAndTime(commentObj))
  let comment = document.createElement('div')
  comment.innerText = commentObj.text
  commentBox.appendChild(comment)
  commentBox.appendChild(addReactionOps(commentBox))
  return commentBox
}

function addComment (event, commentsContainer) {
  let commentText = event.target.parentElement.parentElement.children[0].value
  if (commentText !== '') {
    commentsContainer.appendChild(createComment(createCommentObj(commentText, event)))
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

function loadComments (commentsContainer) {
  commentsArray.forEach((comment) => {
    createComment(comment)
  })
}
function start () {
  let container = createContainer()
  let commentsContainer = createCommentsContainer()
  createCommentForm(container, commentsContainer)
  loadComments(commentsContainer)
}

start()
