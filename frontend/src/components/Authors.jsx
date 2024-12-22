import {useState} from 'react'
import { useQuery,useMutation } from "@apollo/client";
import Select from 'react-select';
import {ALL_AUTHORS, SET_BIRTH_YEAR} from '../gql'
const Authors = (props) => {
  //const [author, setAuthor] = useState("")
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [born, setBorn] = useState("")
  const { loading, error, data } = useQuery(ALL_AUTHORS);
  const [setBirthYear] = useMutation(SET_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0]?.message);
    },
  });
  if (!props.show) {
    return null
  }
  const submit = async (event) => {
    event.preventDefault();
    const bornInt = parseInt(born);
    // setBirthYear({
    //   variables: { author, setBornTo: bornInt },
    // });

    // setAuthor("");
    setBirthYear({
      variables: { name: selectedAuthor.value, setBornTo: bornInt },
    });

    setSelectedAuthor(null);
    setBorn("");
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const authors = data.allAuthors;
  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));
  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>set birth year</h2>
        <form onSubmit={submit}>
        {/* <div>
          name
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div> */}
        <div>
            <label>Select Author</label>
            <Select
              value={selectedAuthor}
              onChange={setSelectedAuthor}
              options={options}
              placeholder="Select author..."
            />
          </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update Birth Year</button>
        </form>
      </div>
    </>
  )
}

export default Authors
