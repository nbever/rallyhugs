import { Page } from 'layout/Page';
import { useEffect, useState } from 'react';
import { useApi } from 'context/ApiContext';
import DetailPanel from 'components/DetailPanel';

const getRandomItem = (items) =>
  items[Math.floor(Math.random() * items.length)];

const HomePage: React.FC = () => {
  const [randomItem, setRandomItem] = useState(null);
  const { getComments } = useApi();

  useEffect(() => {
    let randomTimer;
    getComments({}).then((comments) => {
      setRandomItem(getRandomItem(comments));

      randomTimer = setInterval(() => {
        setRandomItem(getRandomItem(comments));
      }, 5000);
    });

    return () => {
      clearInterval(randomTimer);
    };
  }, []);

  return (
    <Page title="Welcome, have some hugs">
      {randomItem && <DetailPanel row={randomItem} />}
    </Page>
  );
};

export default HomePage;
