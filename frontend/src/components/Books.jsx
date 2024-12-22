import {useState} from 'react'
import { useQuery, gql } from "@apollo/client";
import { ALL_BOOKS} from '../gql'

const Books = (props) => {
  const { loading, error, data } = useQuery(ALL_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState(null);
  if (!props.show) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const books = data.allBooks;
  const allGenres = [...new Set(books.flatMap((book) => book.genres))];
  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genres.includes(selectedGenre))
    : books;
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
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td> {/* Fix: access author.name */}
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render genre filter buttons */}
      <div>
        <button onClick={() => setSelectedGenre(null)}>All Genres</button>
        {allGenres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
