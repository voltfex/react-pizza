import React from 'react';

const Categories = ({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  // return (
  //   <div className="categories">
  //     <ul>
  //       <li className="active">Все</li>
  //       <li>Мясные</li>
  //       <li>Вегетарианская</li>
  //       <li>Гриль</li>
  //       <li>Острые</li>
  //       <li>Закрытые</li>
  //     </ul>
  //   </div>
  // );
};

export default Categories;
