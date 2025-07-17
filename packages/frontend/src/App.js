import { useState, useEffect } from 'react';
import './App.css';

const User = ({ name }) => {
  return <li style={{padding: '8px'}}>{name}</li>;
};

const getUsers = async () => {
  const response = await fetch('/api/users');
  const body = await response.json();
  return body;
}

const App = () => {
  const [inputText, setInputText] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then(data => {
        const users = data.users.map(user => user.name);
        setUsers(users);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const userList = users.map((user, index) => {
    return <User key={index} name={user}></User>;
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsers([...users, inputText]);
  };
  
  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div className="App">
      <ul>
        {userList}
      </ul>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type = "text" onChange={handleChange}/>
        <button type="submit">追加</button>
      </form>
      <div>入力値：{inputText}</div>
    </div>
  );
}

export default App;
