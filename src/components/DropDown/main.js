import React from "react";

const DropDown = ({ options, label, onChange, value }) => {
  return (
    <select
      className="form-select w-25"
      aria-label="Default select example"
      onChange={onChange}
      value={value}
    >
      {options &&
        options.length > 0 &&
        options.map((option, index) => (
          <option value={option.value} key={option.value + index}>
            {option.label}
          </option>
        ))}
    </select>
  );
};

export default DropDown;
