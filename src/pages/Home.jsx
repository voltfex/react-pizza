import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurentPage } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, curentPage } = useSelector((state) => state.filter);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
    console.log(id);
  };

  const onChangePage = (number) => {
    dispatch(setCurentPage(number));
  };

  // Получение данных с сервера
  React.useEffect(() => {
    setIsLoading(true);
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    // const search = searchValue ? `&search=${searchValue}` : '';
    axios
      .get(
        `https://66562e759f970b3b36c48e64.mockapi.io/items?page=${curentPage}&limit=4&${
          categoryId ? `category=${categoryId}` : ''
        }&sortBy=${sortBy}&order=${order}`,
      )
      .then((res) => setItems(res.data))
      .then(() => setIsLoading(false));
    window.scrollTo(0, 0);
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
      <div className="content__items">
        {isLoading ? (
          [...new Array(6)].map((_, index) => <Skeleton key={index} />)
        ) : filteredItems.length ? (
          filteredItems.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
        ) : (
          <div className="pizza-notFound">К сожалению такой пиццы нет 😣</div>
        )}
      </div>
      <Pagination curentPage={curentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
