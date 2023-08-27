import { useEffect, useRef } from 'react';
import './DetailPage.scss';
import axios from 'axios';
const DOMAIN = process.env.REACT_APP_DOMAIN;
const PORT = process.env.REACT_APP_PORT;

function DetailPage({ firstChoice, secondChoice }) {
  // const firstBond = useRef(null);
  // const secondBond = useRef(null);

  let firstBond;
  let secondBond;

  useEffect(() => {
    axios
      .get(`${DOMAIN}${PORT}/detail/${firstChoice.current}`)
      .then(res => {
        firstBond = res.data;

        axios
          .get(`${DOMAIN}${PORT}/detail/${secondChoice.current}`)
          .then(res => {
            secondBond = res.data;

            const spreadValue1 = firstBond.spreadValues;
            console.log(spreadValue1);
            const spreadValue2 = secondBond.spreadValues;

            const ratios = [];

            for (let i = 0; i < spreadValue1.length; i++) {
              const inputDate = spreadValue1[i].date;
              const parsedDate = new Date(inputDate);
              const formattedDate = parsedDate.toISOString().split('T')[0];

              const ratio = {
                date: formattedDate,
                value: spreadValue1[i].value / spreadValue2[i].value
              };
              ratios.push(ratio);
            }
            const avarage =
              ratios.reduce((a, b) => a + b.value, 0) / ratios.length;

            const sD = getStandardDeviation(ratios);
            console.log(sD);

            const sDMax = avarage + 1.5 * sD;
            console.log(sDMax);
            const sDMin = avarage - 1.5 * sD;
            console.log(sDMin);
          })
          .catch(err => {
            console.log(err);
          });
      }, [])
      .catch(err => {
        console.log(err);
      });
  }, []);

  function getStandardDeviation(array) {
    const n = array.length;

    const mean = array.reduce((sum, obj) => sum + obj.value, 0) / n;

    const squaredDifferencesSum = array.reduce((sum, obj) => {
      const diff = obj.value - mean;
      return sum + diff * diff;
    }, 0);

    const standardDeviation = Math.sqrt(squaredDifferencesSum / n);

    return standardDeviation;
  }

  return (
    <div>
      <h1>dettagli</h1>
    </div>
  );
}

export default DetailPage;
