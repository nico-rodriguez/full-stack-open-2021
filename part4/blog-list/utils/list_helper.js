/* eslint-disable no-param-reassign */
const dummy = () => 1;

const totalLikes = (blogs) => blogs
  .reduce((total, { likes }) => total + likes, 0);

const favoriteBlog = (blogs) => [...blogs]
  .sort(({ likes: likes1 }, { likes: likes2 }) => likes2 - likes1)[0];

const mostBlogs = (blogsList) => {
  const blogsByAuthor = blogsList
    .reduce((blogsNumber, blog) => {
      if (blog.author in blogsNumber) {
        blogsNumber[blog.author] += 1;
      } else {
        blogsNumber[blog.author] = 1;
      }
      return blogsNumber;
    }, {}); // e.g.: { "Robert C. Martin": 5, "Edsger W. Dijkstra": 7 }

  //  => [{ "author": "Robert C. Martin", blogs: 5 }, { "author": "Edsger W. Dijkstra", blogs: 7 }]
  return Object.entries(blogsByAuthor)
    .map(([author, blogs]) => ({
      author,
      blogs
    }))
    .sort(({ blogs: blogs1 }, { blogs: blogs2 }) => blogs2 - blogs1)[0];
};

const mostLikes = (blogsList) => {
  const likesByAuthor = blogsList
    .reduce((likesNumber, blog) => {
      if (blog.author in likesNumber) {
        likesNumber[blog.author] += blog.likes;
      } else {
        likesNumber[blog.author] = blog.likes;
      }
      return likesNumber;
    }, {}); // e.g.: { "Robert C. Martin": 5, "Edsger W. Dijkstra": 7 }

  //  => [{ "author": "Robert C. Martin", likes: 5 }, { "author": "Edsger W. Dijkstra", likes: 7 }]
  return Object.entries(likesByAuthor)
    .map(([author, likes]) => ({
      author,
      likes
    }))
    .sort(({ likes: likes1 }, { likes: likes2 }) => likes2 - likes1)[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
