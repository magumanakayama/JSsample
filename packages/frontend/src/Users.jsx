import { useUsers } from './useUsers';
import './App.css';

const User = ({ name }) => {
  return <li style={{padding: '8px'}}>{name}</li>;
};

const Users = () => {
  const { submit, input, inputText, users } = useUsers();

  const userList = users.map((user, index) => {
    return <User key={index} name={user}></User>;
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
  };
  
  const handleChange = (event) => {
    input(event.target.value);
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

export default Users;
