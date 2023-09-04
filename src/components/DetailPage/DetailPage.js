import { useEffect, useState } from 'react';
import './DetailPage.scss';
import axios from 'axios';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine
} from 'recharts';
import { useParams } from 'react-router-dom';
const DOMAIN = process.env.REACT_APP_DOMAIN;
const PORT = process.env.REACT_APP_PORT;

function DetailPage() {
  const [data, setData] = useState(null);
  const [firstObg, setFirstObg] = useState(null);
  const [secondObg, setSecondObg] = useState(null);
  const [positiveSD, setPositiveSD] = useState(null);
  const [negativeSD, setNegativeSD] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { firstId, secondId } = useParams();

  const bondsRequest = async () => {
    try {
      const firstResponse = await axios.get(
        `${DOMAIN}${PORT}/detail/${firstId}`
      );

      setFirstObg(firstResponse.data);

      const secondResponse = await axios.get(
        `${DOMAIN}${PORT}/detail/${secondId}`
      );
      setSecondObg(secondResponse.data);

      const spreadValue1 = firstResponse.data.spreadValues;

      const spreadValue2 = secondResponse.data.spreadValues;

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

        setData(ratios);
      }
      const average = ratios.reduce((a, b) => a + b.value, 0) / ratios.length;

      const sD = getStandardDeviation(ratios);

      const sDMax = average + 1.5 * sD;

      setPositiveSD(sDMax);

      const sDMin = average - 1.5 * sD;

      setNegativeSD(sDMin);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    bondsRequest();
    setIsLoading(false);
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

  if (isLoading || !firstObg || !secondObg) {
    <div>is Loading...!</div>;
    return;
  }

  function getSignal(array, positiveSD, negativeSD) {
    if (array[array.length - 1].value >= positiveSD) {
      return 'signal-buy';
    } else if (array[array.length - 1].value <= negativeSD) {
      return 'signal-sell';
    } else {
      return 'signal-neutral';
    }
  }

  function getSecondSignal(array, positiveSD, negativeSD) {
    if (array[array.length - 1].value >= positiveSD) {
      return 'signal-sell';
    } else if (array[array.length - 1].value <= negativeSD) {
      return 'signal-buy';
    } else {
      return 'signal-neutral';
    }
  }

  const signal = getSignal(data, positiveSD, negativeSD);
  const secondBondSignal = getSecondSignal(data, positiveSD, negativeSD);

  return (
    <div className="detail-page">
      <h1 className="detail-page__title">{`${firstObg.name} vs ${secondObg.name}`}</h1>
      <div className="outcome-wrapper">
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="value" stroke="#2196f3" />
          <ReferenceLine
            y={positiveSD}
            label="standard deviation + 1.5"
            stroke="#00FF00"
          />
          <ReferenceLine
            y={negativeSD}
            label="standard deviation - 1.5"
            stroke="#FF0000"
          />

          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
        <div className="buy-sell-wrapper">
          <h3 className={signal}>{firstObg.name}</h3>
          <h3 className={secondBondSignal}>{secondObg.name}</h3>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
