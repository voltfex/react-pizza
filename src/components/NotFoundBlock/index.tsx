import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😢</span>
        <br />
        Ничего не найдено
      </h1>
      <p>К сожалению такой страницы у нас нет.</p>
    </div>
  );
};

export default NotFoundBlock;
