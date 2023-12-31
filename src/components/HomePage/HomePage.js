import { useEffect, useState } from 'react';
import './HomePage.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Disclaimer from '../Disclaimer/Disclaimer';

const DOMAIN = process.env.REACT_APP_DOMAIN;
const PORT = process.env.REACT_APP_PORT;

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState(null);

  const [firstId, setFirstId] = useState(null);
  const [secondId, setSecondId] = useState(null);

  const [selecteFirstdArticle, setSelecteFirstdArticle] = useState(null);
  const [selectSecondArticle, setSelectSecondArticle] = useState(null);

  const [clickable, setClickable] = useState(false);

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

  function clickSelectHandler(e, bondId) {
    if (!firstId && !secondId) {
      setFirstId(bondId);
      setSelecteFirstdArticle(bondId);
    } else if (firstId && !secondId && firstId !== e.target.id) {
      setSecondId(bondId);
      setSelectSecondArticle(bondId);
      setClickable(true);
    }
  }

  function resetState() {
    setFirstId(null);
    setSecondId(null);

    setSelecteFirstdArticle(null);
    setSelectSecondArticle(null);
    setClickable(false);
  }

  if (isLoading) {
    return <h1> is Loading...</h1>;
  }

  return (
    <div className={`hero `}>
      <NavBar />
      <Disclaimer />
      <div className="hero-wrapper">
        {datas.map(bond => {
          return (
            <article
              key={bond.id}
              className={`bond ${
                selecteFirstdArticle === bond.id
                  ? 'bond--selected'
                  : 'bond--not-selected'
              } ${
                selecteFirstdArticle && selectSecondArticle === bond.id
                  ? 'bond--second-selection'
                  : 'bond--not-selected'
              }`}
              id={bond.id}
              onClick={e => {
                clickSelectHandler(e, bond.id);
              }}
            >
              <h3 className="bond__title obligation--detail">{bond.name}</h3>
              <p className="bond__status obligation--detail">{bond.status}</p>
              <p className="bond__price obligation--detail">
                {bond.value[bond.value.length - 1].value}
              </p>

              <p className="bond__daily-change obligation--detail">
                {(
                  bond.value[bond.value.length - 1].value -
                  bond.value[bond.value.length - 2].value
                ).toFixed(2)}
              </p>
            </article>
          );
        })}
        <div className="button-wrapper">
          <button className="button" onClick={resetState}>
            cancel
          </button>
          <Link
            style={{ pointerEvents: clickable ? '' : 'none' }}
            to={`/detail/${firstId}/${secondId}`}
            className="button button--link"
          >
            submit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
