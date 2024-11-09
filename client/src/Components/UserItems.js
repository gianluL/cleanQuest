import styles from './UserItems.module.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserItems = () => {
  const [data, setData] = useState([]);


  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/lb');
        setData(response.data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (

    <ul className={styles.userList}>
  {Array.isArray(data) && data.length > 0 ? (
    data.map((user, index) => (
      <li className={styles.UserItem} key={user.id}>
        <p className={styles.position}>{user.position}</p> {/* Position starts from 1 */}
        <p className={styles.username}>{user.name}</p>
        <p className={styles.points}>{user.point}</p>
      </li>
    ))
  ) : (
    <p>No data available</p>
  )}
</ul>


  );
}

export default UserItems;