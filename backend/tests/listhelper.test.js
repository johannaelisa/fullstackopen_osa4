const listHelper = require('../utils/list_helper')

test('dummy returns 1', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithNoBlog = []
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithSeveralBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422ba77b54a799834d17f8',
      title: 'Ensure that everything still works',
      author: 'Minni Hiiri',
      url: '"http://example.com"',
      likes: 2,
      __v: 0
    },
    {
      _id: '2a522ba77b54a799834d17d2',
      title: 'A penny for your thoughts.',
      author: 'John Heywood',
      url: '"http://example.com"',
      likes: 3,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithNoBlog)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithSeveralBlog)
    expect(result).toBe(10)
  })
})

describe('most liked blog', () => {
  const listWithNoBlog = []
  const listWithSeveralBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422ba77b54a799834d17f8',
      title: 'Ensure that everything still works',
      author: 'Minni Hiiri',
      url: '"http://example.com"',
      likes: 2,
      __v: 0
    },
    {
      _id: '2a522ba77b54a799834d17d2',
      title: 'A penny for your thoughts.',
      author: 'John Heywood',
      url: '"http://example.com"',
      likes: 9,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.favoriteBlog(listWithNoBlog)
    expect(result).toBe(0)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(listWithSeveralBlog)
    expect(result.likes).toEqual(9)
  })
})

describe('most blogs', () => {
  const listWithNoBlog = []
  const listWithSeveralBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422ba77b54a799834d17f8',
      title: 'Oh, Mickey, you are so fine!',
      author: 'Minni Hiiri',
      url: '"http://example.com"',
      likes: 2,
      __v: 0
    },
    {
      _id: '2a522ba77b54a799834d17d2',
      title: 'A penny for your thoughts.',
      author: 'John Heywood',
      url: '"http://example.com"',
      likes: 9,
      __v: 0
    },
    {
      _id: '5a174ba77b54a799821r17f5',
      title: 'Why, hello there!',
      author: 'Minni Hiiri',
      url: '"http://example.com"',
      likes: 2,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.mostBlogs(listWithNoBlog)
    expect(result).toBe(0)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(listWithSeveralBlog)
    expect(result.blogs).toEqual(2)
  })
})
describe('most likes', () => {
  const listWithNoBlog = []
  const listWithSeveralBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422ba77b54a799834d17f8',
      title: 'Oh, Mickey, you are so fine!',
      author: 'Minni Hiiri',
      url: '"http://example.com"',
      likes: 2,
      __v: 0
    },
    {
      _id: '2a522ba77b54a799834d17d2',
      title: 'A penny for your thoughts.',
      author: 'John Heywood',
      url: '"http://example.com"',
      likes: 9,
      __v: 0
    },
    {
      _id: '5a174ba77b54a799821r17f5',
      title: 'Why, hello there!',
      author: 'Minni Hiiri',
      url: '"http://example.com"',
      likes: 2,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.mostLikes(listWithNoBlog)
    expect(result).toBe(0)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(listWithSeveralBlog)
    console.log(result)
    expect(result.likes).toEqual(9)
  })
})