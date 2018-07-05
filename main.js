renderAllBlogs()

const publishBlogBtn = document.querySelector('.submit')
publishBlogBtn.addEventListener('click', publishBlog)

const createPostBtn = document.getElementById('NEWPOST')
createPostBtn.addEventListener('click', createNewBlog)

function renderAllBlogs () {
  axios.get('https://glacial-mesa-16810.herokuapp.com/')
  .catch(error => console.log(error))
  .then(response => {
    const writtenPosts = response.data.posts
    const postsList = document.querySelector('.list-group')
    while (postsList.firstChild) { postsList.removeChild(postsList.firstChild) }

    writtenPosts.forEach(post => {
      const newBlog = document.createElement('li')
      newBlog.classList.add('list-group-item')
      newBlog.classList.add(`li-id-${post.id}`)
      newBlog.innerHTML = post.title
      postsList.appendChild(newBlog)
    })

    makeBlogTitlesClickable()
  });
}

function publishBlog (event) {
  event.preventDefault()

  const title = document.getElementById('blogtitle').value
  const body = document.getElementById('blogcontents').value
  const errorMsg = document.querySelector('.blog-err')

  axios.post('https://glacial-mesa-16810.herokuapp.com/', { title, body })
  .catch(error => { errorMsg.style.display = 'block' })
  .then(response => {
    if (errorMsg.style.display == 'block') errorMsg.style.display = 'none'
    renderAllBlogs()
  })
}

function createNewBlog (event) {
  event.preventDefault()

  document.querySelector('.newblog').style = 'display: block;'
  document.querySelector('.previousblog').style = 'display: none;'
}

function makeBlogTitlesClickable () {
  const blogTitles = document.querySelectorAll('.list-group-item')
  blogTitles.forEach(blog => {
    blog.addEventListener('click', (event) => {
      event.preventDefault()
      const blogId = blog.classList[1].replace('li-id-', '')
      document.querySelector('.newblog').style = 'display: none;'
      document.querySelector('.previousblog').style = 'display: block;'
      getBlogById(blogId)
    })
  })
}

function getBlogById (blogId) {
  axios.get(`https://glacial-mesa-16810.herokuapp.com/${blogId}`)
  .then(response => {
    const blogBody = response.data.post.body
    document.querySelector('.blog-content').innerHTML = blogBody
  })
  .catch(error => { errorMsg.style.display = 'block' })
}
