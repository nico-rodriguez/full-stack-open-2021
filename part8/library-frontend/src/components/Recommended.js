import { useQuery } from '@apollo/client';
import { ALL_BOOKS_OF_GENRE } from '../queries/books';

const Recommended = ({ show, favoriteGenre }) => {
  const booksQuery = useQuery(ALL_BOOKS_OF_GENRE, {
    variables: { genre: favoriteGenre },
  });

  if (!show || booksQuery.loading) {
    return null;
  }

  const books = booksQuery.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(({ title, author, published }) => (
            <tr key={title}>
              <td>{title}</td>
              <td>{author.name}</td>
              <td>{published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
