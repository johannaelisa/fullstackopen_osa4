import { countBy, forEach, groupBy, mapValues, sumBy, maxBy, toPairs } from 'lodash'
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const mostLikes = blogs.reduce((maxBlog, nextBlog) => {
    return nextBlog.likes > maxBlog.likes ? nextBlog : maxBlog
  })
  return mostLikes
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const blogCounts = countBy(blogs, 'author')
  let maxAuthor = ''
  let maxBlogs = 0
  forEach(blogCounts, function(value, key) {
    if (value > maxBlogs) {
      maxAuthor = key
      maxBlogs = value
    }
  })
  return { author: maxAuthor, blogs: maxBlogs }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const grouppedBy = groupBy(blogs, 'author')
  const total = mapValues(grouppedBy, authorGroup => sumBy(authorGroup, 'likes'))
  const mostThumbsUp = maxBy(toPairs(total), ([author, likes]) => likes)
  return { author: mostThumbsUp[0], likes: mostThumbsUp[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
