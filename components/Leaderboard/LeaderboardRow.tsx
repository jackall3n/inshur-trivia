import styles from "./LeaderboardRow.module.scss";
import { IUser } from "../../types/User";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

interface Props {
  user: IUser;
}

function LeaderboardRow({ user }: Props) {
  const { name, photo, average, games, score, rank, position } = user;

  return (
    <div className={styles.row} data-rank={rank}>
      <div className={styles.position}>#{position}</div>
      <div className={styles.content}>
        <ProfilePicture url={photo} className={styles.ProfilePicture} />
        <div className={styles.detail}>
          <div className={styles.name}>
            {name}
          </div>
          <div className={styles.subline}>
            Scored {score} / Played {games}
          </div>
        </div>
        <div className={styles.score}>{average.toFixed(1)}</div>
      </div>
    </div>
  )
}

export default LeaderboardRow;
