import { useState } from 'react';
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
  const [users, setUsers] = useState(['maguma', 'nakayama', 'okabe']);

  getUsers()
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      // console.error(error);
    });

  const userList = users.map((user, index) => {
    return <User key={index} name={user}></User>;
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsers([...users, inputText]);
    console.log('handle submit');
  };
  
  const handleChange = (event) => {
    setInputText(event.target.value);
    console.log('handle change: ', inputText);
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
