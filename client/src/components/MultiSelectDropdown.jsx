import styles from "../Styles/Form.module.css";

const MultiSelectDropdown = ({ options, selected, toggleOption }) => {
  return (
    <div className={styles.multiSelect}>
      <div className={styles.dropdownSelected}>
        <div>{selected.length} seleccionado/s</div>
        {/* <img src={Dropdown} /> */}
      </div>
      <ul className={styles.dropdownOptions}>
        {options.map((option) => {
          const isSelected = selected.includes(option.id);

          return (
            <li
              className={styles.dropdownOption}
              onClick={() => toggleOption({ id: option.id })}
            >
              <input
                type="checkbox"
                checked={isSelected}
                className="c-multi-select-dropdown__option-checkbox"
              ></input>
              <span>{option.nombre}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MultiSelectDropdown;
