import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_BOOKS, ALL_BOOKS_OF_GENRE } from '../queries/books';
import GenreFilter from './GenreFilter';

const Books = (props) => {
  const [filter, setFilter] = useState('');

  const booksQuery = useQuery(
    filter === '' ? ALL_BOOKS : ALL_BOOKS_OF_GENRE,
    filter === ''
      ? {}
      : {
          variables: { genre: filter },
        }
  );

  if (!props.show || booksQuery.loading) {
    return null;
  }

  const booksOfGenre = booksQuery.data.allBooks;

  const genres = [
    'refactoring',
    'agile',
    'patterns',
    'design',
    'crime',
    'classic',
    'all genres',
  ];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksOfGenre.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) =>
        genre === 'all genres' ? (
          <GenreFilter
            key='all genres'
            name='all genres'
            setFilter={() => setFilter('')}
          />
        ) : (
          <GenreFilter key={genre} name={genre} setFilter={setFilter} />
        )
      )}
    </div>
  );
};

export default Books;
