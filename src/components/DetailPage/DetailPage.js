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

  let firstBond;
  let secondBond;

  // const bondsRequest = async () => {
  //   try {
  //     const firstResponse = await axios.get(
  //       `${DOMAIN}${PORT}/detail/${firstId}`
  //     );
  //     console.log(firstResponse.data);
  //     setFirstObg(firstResponse.data);
  //     console.log(firstObg);

  //     const secondResponse = await axios.get(
  //       `${DOMAIN}${PORT}/detail/${secondId}`
  //     );
  //     setSecondObg(secondResponse.data);

  //     const spreadValue1 = firstObg.spreadValues;

  //     const spreadValue2 = secondObg.spreadValues;

  //     const ratios = [];

  //     for (let i = 0; i < spreadValue1.length; i++) {
  //       const inputDate = spreadValue1[i].date;
  //       const parsedDate = new Date(inputDate);
  //       const formattedDate = parsedDate.toISOString().split('T')[0];

  //       const ratio = {
  //         date: formattedDate,
  //         value: spreadValue1[i].value / spreadValue2[i].value
  //       };
  //       ratios.push(ratio);

  //       setData(ratios);
  //     }
  //     const avarage = ratios.reduce((a, b) => a + b.value, 0) / ratios.length;

  //     const sD = getStandardDeviation(ratios);

  //     const sDMax = avarage + 1.5 * sD;
  //     setPositiveSD(sDMax);

  //     const sDMin = avarage - 1.5 * sD;
  //     setNegativeSD(sDMin);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   bondsRequest();
  //   if (data && positiveSD && negativeSD && firstObg && secondObg) {
  //     setIsLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    axios
      .get(`${DOMAIN}${PORT}/detail/${firstId}`)
      .then(res => {
        firstBond = res.data;

        setFirstObg(res.data.name);

        axios
          .get(`${DOMAIN}${PORT}/detail/${secondId}`)
          .then(resp => {
            secondBond = resp.data;

            setSecondObg(resp.data.name);

            const spreadValue1 = firstBond.spreadValues;

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
              console.log(ratios);
              setData(ratios);
            }
            const avarage =
              ratios.reduce((a, b) => a + b.value, 0) / ratios.length;

            const sD = getStandardDeviation(ratios);

            const sDMax = avarage + 1.5 * sD;
            setPositiveSD(sDMax);

            const sDMin = avarage - 1.5 * sD;
            setNegativeSD(sDMin);

            setIsLoading(false);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // axios
  //   .get(`${DOMAIN}${PORT}/detail/${firstId}`)
  //   .then(res => {
  //     firstBond = res.data;

  //     setFirstObg(res.data.name);

  //     axios
  //       .get(`${DOMAIN}${PORT}/detail/${secondId}`)
  //       .then(resp => {
  //         secondBond = resp.data;

  //         setSecondObg(resp.data.name);

  //         const spreadValue1 = firstBond.spreadValues;

  //         const spreadValue2 = secondBond.spreadValues;

  //         const ratios = [];

  //         for (let i = 0; i < spreadValue1.length; i++) {
  //           const inputDate = spreadValue1[i].date;
  //           const parsedDate = new Date(inputDate);
  //           const formattedDate = parsedDate.toISOString().split('T')[0];

  //           const ratio = {
  //             date: formattedDate,
  //             value: spreadValue1[i].value / spreadValue2[i].value
  //           };
  //           ratios.push(ratio);
  //           console.log(ratios);
  //           setData(ratios);
  //         }
  //         const avarage =
  //           ratios.reduce((a, b) => a + b.value, 0) / ratios.length;

  //         const sD = getStandardDeviation(ratios);

  //         const sDMax = avarage + 1.5 * sD;
  //         setPositiveSD(sDMax);

  //         const sDMin = avarage - 1.5 * sD;
  //         setNegativeSD(sDMin);

  //         if (data && positiveSD && negativeSD) {
  //           setIsLoading(false);
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

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

  if (isLoading) {
    <div>is Loading...!</div>;
    return;
  }

  return (
    <div>
      <h1>{`${firstObg} vs ${secondObg}`}</h1>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="value" stroke="#2196f3" />
        <ReferenceLine
          x={positiveSD}
          label="standard deviation + 1.5"
          stroke="#00FF00"
        />
        <ReferenceLine
          x={negativeSD}
          label="standard deviation - 1.5"
          stroke="#FF0000"
        />
        {/* <ReferenceLine
          x={2}
          label="standard deviation + 1.5"
          stroke="#00FF00"
        />
        <ReferenceLine
          x={1}
          label="standard deviation - 1.5"
          stroke="#FF0000"
        /> */}
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}

export default DetailPage;
