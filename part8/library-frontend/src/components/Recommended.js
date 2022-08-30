import { useQuery } from '@apollo/client';
import { ALL_BOOKS_OF_FAVORITE_GENRE } from '../graphql/queries/books';
import { USER_FAVORITE_GENRE } from '../graphql/queries/users';

const Recommended = ({ show }) => {
  const booksQuery = useQuery(ALL_BOOKS_OF_FAVORITE_GENRE);
  const favoriteGenreQuery = useQuery(USER_FAVORITE_GENRE);

  if (!show || booksQuery.loading || favoriteGenreQuery.loading) {
    return null;
  }

  console.log(booksQuery.data);
  const books = booksQuery.data.allBooksOfFavoriteGenre;
  const favoriteGenre = favoriteGenreQuery.data.me.favoriteGenre;

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
