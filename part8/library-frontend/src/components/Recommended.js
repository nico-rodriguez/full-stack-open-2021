import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries/books';
import { USER_FAVORITE_GENRE } from '../queries/users';

const Recommended = ({ show }) => {
  const booksQuery = useQuery(ALL_BOOKS);
  const favoriteGenreQuery = useQuery(USER_FAVORITE_GENRE);

  if (!show || booksQuery.loading || favoriteGenreQuery.loading) {
    return null;
  }

  const favoriteGenre = favoriteGenreQuery.data.me.favoriteGenre;
  const books = booksQuery.data.allBooks;
  const booksOfGenre = books.filter((book) =>
    book.genres.includes(favoriteGenre)
  );
  console.log(booksOfGenre);

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
          {booksOfGenre.map(({ title, author, published }) => (
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
