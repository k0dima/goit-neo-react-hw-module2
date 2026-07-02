import css from './Options.module.css';

function Options({ totalFeedback, onUpdate, onReset }) {
  return (
    <div className={css.options}>
      <button className={css.button} type="button" onClick={() => onUpdate('good')}>
        Good
      </button>
      <button
        className={css.button}
        type="button"
        onClick={() => onUpdate('neutral')}
      >
        Neutral
      </button>
      <button className={css.button} type="button" onClick={() => onUpdate('bad')}>
        Bad
      </button>
      {totalFeedback > 0 && (
        <button className={css.button} type="button" onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
}

export default Options;
