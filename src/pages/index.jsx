import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

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
  const [session, loading] = useSession();

  return (
    <div>
      <header>
        {session ? (
          <button onClick={signOut}>Sign out</button>
        ) : (
          <button onClick={signIn}>Sign in</button>
        )}
      </header>
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
    </div>
  );
}
