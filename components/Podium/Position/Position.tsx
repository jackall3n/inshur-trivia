import { IUser } from '../../../types/User';
import styles from './Position.module.scss';
import ProfilePicture from "../../ProfilePicture/ProfilePicture";

interface Props {
  user: IUser;
}

function Position({ user }: Props) {
  return (
    <div className={styles.Position} data-position={user.position}>
      {user.position === 1 && <img src="https://image.flaticon.com/icons/png/512/1657/1657088.png" height={50} />}
      <div>
        <ProfilePicture url={user.photo} className={styles.picture} />
      </div>
      <div>
        <strong className={styles.position}>#{user.position}</strong>
      </div>
    </div>
  )
}

export default Position;
