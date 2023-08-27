import { useEffect, useRef } from 'react';
import './DetailPage.scss';
import axios from 'axios';
const DOMAIN = process.env.REACT_APP_DOMAIN;
const PORT = process.env.REACT_APP_PORT;

function DetailPage({ firstChoice, secondChoice }) {
  const firstBond = useRef(null);
  const secondBond = useRef(null);

  useEffect(() => {
    axios
      .get(`${DOMAIN}${PORT}/detail/${firstChoice.current}`)
      .then(
        res => {
          firstBond.current = res.data;
          axios
            .get(`${DOMAIN}${PORT}/detail/${secondChoice.current}`)
            .then(res => {
              secondBond.current = res.data;
            })
            .catch(err => {
              console.log(err);
            });
        },
        [secondChoice.current]
      )
      .catch(err => {
        console.log(err);
      });
  }, [firstChoice.current]);

  console.log({ firstBond });
  console.log({ secondBond });

  return (
    <div>
      <h1>dettagli</h1>
    </div>
  );
}

export default DetailPage;
