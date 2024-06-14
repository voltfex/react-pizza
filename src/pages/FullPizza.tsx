import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://66562e759f970b3b36c48e64.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        console.log(`Произошла ошибка ( ${error}`);
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} р</h4>
    </div>
  );
};

export default FullPizza;
