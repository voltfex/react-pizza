import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';
import { setCategoryId, setCurentPage } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, curentPage } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);

  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurentPage(number));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        categoryId,
        curentPage,
      }),
    );
    window.scrollTo(0, 0);
  };

  // Рендер пицц  с сервера
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, curentPage]);

  // Получение пицц по поиску
  const filteredItems = items.filter((item) => {
    return item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
  });

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Мы потеряли наши пиццы😕</h2>
          <p>Попробуйте обновить страницу попозже</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? (
            [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          ) : filteredItems.length ? (
            filteredItems.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
          ) : (
            <div className="pizza-notFound">К сожалению такой пиццы нет 😣</div>
          )}
        </div>
      )}
      <Pagination curentPage={curentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
