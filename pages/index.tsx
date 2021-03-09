import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.scss'
import { orderBy, take } from 'lodash'
import { IUser } from '../types/User';
import Podium from "../components/Podium/Podium";
import LeaderboardRow from "../components/Leaderboard/LeaderboardRow";
import { useState } from "react";

console.log({ styles })

interface Props {
  users: IUser[];
}

export default function Home({ users }: Props) {
  const { query, push } = useRouter();

  const [byRank, setByRank] = useState(query?.order === 'score');

  const u = orderBy(users, byRank ? 'rank' : 'position').map(user => {
    return {
      ...user,
      position: byRank ? user.rank : user.position
    }
  });

  async function updateOrder(rank: boolean) {
    setByRank(rank);
    await push(`/?order=${rank ? 'score' : 'average'}`, undefined, { shallow: true })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Inshur Trivia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <img src="https://www.viola-group.com/wp-content/uploads/2019/04/INSHUR-logo-300x145.png" />
          <div>Trivia</div>
        </header>
        <Podium users={take(u, 3)} />

        <button onClick={() => updateOrder(!byRank)}>{byRank ? 'By average' : 'By score'}</button>

        {u.map((user) => (
          <LeaderboardRow key={user.userId} user={user} />
        ))}
      </main>

      <footer className={styles.footer}>
        Powered by 🍔
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch("https://api-trivia.springrole.com/api/v1/public/leaderboard/60001a13650f6900136875ff?timespan=ALL_TIME&category=All");
  const { data } = await res.json();

  const users = data.map(user => ({
    ...user,
    average: user.score / user.games
  }));

  const ordered = orderBy(users, 'average', 'desc');

  let position = 1;
  let score = undefined;
  let index = 1;

  const positioned = ordered.map(user => {
    if (score !== user.average) {
      position = index;
    }

    index++;

    score = user.average;

    return {
      position,
      ...user,
    }
  })

  return { props: { users: positioned } }
}
