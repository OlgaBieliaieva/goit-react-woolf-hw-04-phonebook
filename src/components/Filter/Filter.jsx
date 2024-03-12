import css from './Filter.module.css';

export default function Filter({ filter, filterChangeHandler }) {
  return (
    <label className={css.formLabel}>
      Find contacts by name
      <input
        className={css.formInput}
        type="text"
        name="filter"
        value={filter}
        onChange={filterChangeHandler}
        placeholder="type your query here..."
        autoComplete="off"
      />
    </label>
  );
}
