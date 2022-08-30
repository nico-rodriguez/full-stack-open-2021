import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_BOOK } from '../graphql/mutations/books';
import { ALL_AUTHORS } from '../graphql/queries/authors';
import { ALL_BOOKS, ALL_BOOKS_OF_GENRE } from '../graphql/queries/books';

const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      console.error(error.message);
    },
    update: (cache, response) => {
      const addedBook = response.data.addBook;

      // Update cache of all books
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => ({
        allBooks: allBooks.concat(addedBook),
      }));

      // Update cache of books for each genre
      const addedBookGenres = addedBook.genres;
      addedBookGenres.forEach((genre) => {
        cache.updateQuery(
          { query: ALL_BOOKS_OF_GENRE, variables: { genre } },
          (data) => {
            if (data) {
              const { allBooks } = data;

              return {
                allBooks: allBooks.concat(addedBook),
              };
            }

            return null;
          }
        );
      });

      const addedBookAuthor = addedBook.author;
      // Update cache of authors
      cache.updateQuery({ query: ALL_AUTHORS }, (data) => {
        if (data) {
          const { allAuthors } = data;

          return { allAuthors: allAuthors.concat(addedBookAuthor) };
        }

        return null;
      });
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    addBook({ variables: { title, author, published, genres } });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  );
};

export default NewBook;
