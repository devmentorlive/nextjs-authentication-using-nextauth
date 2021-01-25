import { useState, useEffect } from 'react';
import { dbConnect, jsonify } from '@/middleware/db';
import Fighter from '@/models/fighter';

export async function getServerSideProps(context) {
  dbConnect();
  const fighters = await Fighter.find({}).exec();

  return {
    props: {
      fighters: jsonify(fighters),
    },
  };
}

export default function Home({ fighters }) {
  const [asyncFighters, setAsyncFighters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch('/api/fighters')
        .then((res) => res.json())
        .then((json) => {
          setAsyncFighters(json);
          setLoading(false);
        });
    }, 1000);
  }, []);

  return (
    <div>
      <h1>Here are some MMA fighters</h1>

      <ul>
        {fighters.map((fighter) => {
          return (
            <li>
              {fighter.firstName} {fighter.lastName}
            </li>
          );
        })}
      </ul>

      <ul>
        {loading && <div>spinner</div>}
        {asyncFighters.map((fighter) => {
          return (
            <li>
              {fighter.firstName} {fighter.lastName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
