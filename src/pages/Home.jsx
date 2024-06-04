import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const { searchValue } = React.useContext(SearchContext);
  const [curentPage, setCurentPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
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
  }, [categoryId, sortType, curentPage]);

  const filteredItems = items.filter((item) => {
    return item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
  });

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
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
      <Pagination onChangePage={(id) => setCurentPage(id)} />
    </div>
  );
};

export default Home;
