import React, { useEffect, useState } from "react";
import { getDeviceCategoryList } from "../../../../services/api/ICT Assets/ICTAssets";

function DeviceCategorySelectInput({ label, category_id, isDisabled, setCategory_id }) {
  const [category_name, setCategory_name] = useState();
  const [categories, setCategories] = useState([]);

  const handleSetCategoryId = (selectedCategory) => {
    for (let i = 0; i < categories?.length; i++) {
      if (categories[i]?.category_name === selectedCategory) {
        setCategory_id(categories[i].category_id);
      }
    }
  };

  const handleSetCategoryName = (category_id) => {
    for (let i = 0; i < categories?.length; i++) {
      if (categories[i].category_id === category_id) {
        setCategory_name(categories[i]?.category_name);
      }
    }
  };

  useEffect(() => {
    getDeviceCategoryList(setCategories);
  }, []);

  useEffect(() => {
    if (categories?.length > 0) {
      handleSetCategoryName(category_id);
    }
  }, [category_id, categories]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        value={category_name}
        isDisabled={isDisabled}
        onChange={(e) => {
          setCategory_name(e.target.value);
          handleSetCategoryId(e.target.value);
        }}
      >
        <option></option>
        {categories?.map((item) => (
          <option key={item.category_id}>{item.category_name}</option>
        ))}
      </select>
    </div>
  );
}

export default DeviceCategorySelectInput;

/**
 import React, { useEffect, useState } from "react";

function CategorySelectInput({ label, value, options, setOnChange, onChoose }) {
  const [inputValue, setInputValue] = useState();

  const fnc = (option) => {
    return <option key={option.id}>{option.category || option.name}</option>;
  };

  useEffect(() => {
    setInputValue(value);

    if (onChoose) {
      onChoose(value);
    }
  }, [value]);

  return (
    <div className="text-input col-span-2">
      <span className="w-fit text-zinc-500 -mt-5 bg-white">{label}</span>
      <select
        className="outline-none"
        value={inputValue}
        onChange={(e) => {
          setOnChange(e.target.value);
          if (onChoose) {
            onChoose(e.target.value);
          }
        }}
      >
        {/*options.map((option) => (
          <option key={option.id}></option>
        ))*
        <option></option>
        {options.map((option) => fnc(option))}
      </select>
    </div>
  );
}

export default CategorySelectInput;

 */
