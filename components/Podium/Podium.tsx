import { IUser } from '../../types/User';
import styles from './Podium.module.scss';
import Position from "./Position/Position";

interface Props {
  users: IUser[];
}

function Podium({ users }: Props) {
  const [first, second, third] = users;

  return (
    <div className={styles.Podium}>
      <Position user={second}  />
      <Position user={first} />
      <Position user={third} />
    </div>
  )
}

export default Podium;
