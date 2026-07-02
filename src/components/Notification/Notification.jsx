import css from './Notification.module.css';

function Notification({ message }) {
  return <p className={css.message}>{message}</p>;
}

export default Notification;
