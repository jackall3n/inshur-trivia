import styles from './ProfilePicture.module.scss';
import classnames from "classnames";

interface Props {
  url: string;
  className?: string;
}

function ProfilePicture({ url, className }: Props) {
  return (
    <div className={classnames(styles.ProfilePicture, 'ProfilePicture', className)}>
      <img src={url} alt="Profile picture" />
    </div>
  )
}

export default ProfilePicture;
