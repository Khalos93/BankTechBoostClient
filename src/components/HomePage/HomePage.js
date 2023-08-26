import { useEffect, useState } from 'react';
import './HomePage.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DOMAIN = process.env.REACT_APP_DOMAIN;
const PORT = process.env.REACT_APP_PORT;

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState(null);

  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);

  const [selected, setSelected] = useState('');
  const [notSelect, setNotSelect] = useState('bond--not-select');

  useEffect(() => {
    axios
      .get(`${DOMAIN}${PORT}`)
      .then(res => {
        setDatas(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function clickHandler(e) {
    setSelected('bond--selected');
    setNotSelect('');

    if (!firstChoice) {
      setFirstChoice(e.target.id);
    } else if (firstChoice && !secondChoice) {
      setSecondChoice(e.target.id);
    } else if (firstChoice && secondChoice && e.target.id !== firstChoice) {
      setSecondChoice(e.target.id);
    } else if (firstChoice === e.target.id && secondChoice) {
      setFirstChoice(null);
    } else if (
      firstChoice &&
      firstChoice !== e.target.id &&
      secondChoice === e.target.id
    ) {
      setSecondChoice(null);
    }

    console.log(firstChoice);
    console.log(secondChoice);
  }

  if (isLoading) {
    return <h1> is Loading...</h1>;
  }

  return (
    <div className={`hero `}>
      {datas.map(bond => {
        return (
          <article
            key={bond.id}
            className={`bond ${selected} ${notSelect}`}
            id={bond.id}
            onClick={e => {
              clickHandler(e);
            }}
          >
            <h3 className="bond__title obligation--detail">{bond.name}</h3>
            <p className="bond__status obligation--detail">{bond.status}</p>
            <p className="bond__price obligation--detail">
              {bond.value[bond.value.length - 1].value}
            </p>

            <p>
              {(
                bond.value[bond.value.length - 1].value -
                bond.value[bond.value.length - 2].value
              ).toFixed(2)}
            </p>
          </article>
        );
      })}
      <div className="button-wrapper">
        <button className="button">cancel</button>
        <Link className="button button--link">submit</Link>
      </div>
    </div>
  );
}

export default HomePage;
