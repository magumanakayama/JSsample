import { useState, useEffect } from 'react';

const getUsers = async () => {
  const response = await fetch('/api/users');
  const body = await response.json();
  return body;
}

export function useUsers() {
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

  const submit = () => setUsers([...users, inputText]);
  const input = (text) => setInputText(text);

  return {submit, input, inputText, users};
}

export default useUsers;
