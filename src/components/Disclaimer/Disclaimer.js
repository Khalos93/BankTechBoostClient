import { Link } from 'react-router-dom';
import './Disclaimer.scss';
import { useEffect, useState } from 'react';

function Disclaimer() {
  const [display, setDispaly] = useState('block');

  function closeHandler() {
    localStorage.setItem('disclaimerAccepted', true);
    setDispaly('none');
  }

  useEffect(() => {
    const hasDisclaimerAccepted = localStorage.getItem('disclaimerAccepted');
    if (hasDisclaimerAccepted) {
      setDispaly('none');
    }
  }, []);

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = dd + '/' + mm + '/' + yyyy;
  return (
    <article className={`disclaimer ${display}`}>
      <section>
        <p>
          The information provided on this website/application is for general
          informational purposes only and should not be considered as financial
          advice. It is not intended to substitute professional financial
          advice, investment, or taxation advice.
        </p>
        <p>
          You should consult with a qualified financial advisor or other
          relevant professionals to obtain personalized advice tailored to your
          specific situation.
        </p>
        <p>
          I make every effort to provide accurate and up-to-date information.
          However, we do not warrant the accuracy, completeness, or reliability
          of any information provided. Any reliance you place on such
          information is strictly at your own risk.
        </p>
        <p>
          Investing in financial markets involves risks, and there is no
          guarantee of specific outcomes or results. Past performance is not
          indicative of future results. Before making any financial decisions,
          you should carefully consider your investment goals, risk tolerance,
          and conduct thorough research.
        </p>
        <p>
          I are not responsible for any financial losses, damages, or legal
          actions that may arise from your use of this website/application or
          reliance on the information presented herein.
        </p>
        <p>
          I do not endorse or recommend any specific financial products,
          services, companies, or investment strategies mentioned on this
          website/application. Any reference to third-party products, services,
          or websites is for informational purposes only and does not constitute
          an endorsement or recommendation.
        </p>
        <p>
          You are solely responsible for your financial decisions and actions.
          We disclaim any liability for actions taken based on the information
          provided on this website/application.
        </p>
        <p>
          Before making any financial decisions, we strongly recommend seeking
          advice from qualified professionals and conducting your own due
          diligence.
        </p>
        <p>
          Please note that laws and regulations related to financial matters can
          vary by jurisdiction, and you should be aware of and comply with the
          laws applicable in your region.
        </p>
        <p>
          By using this website/application, you agree to the terms of this
          financial disclaimer.
        </p>
        <p>{`Last updated: ${formattedToday}`} </p>
      </section>
      <div className="button-to-flex">
        <Link to={'/about'} className="button">
          Leave
        </Link>
        <button className="button--link" onClick={closeHandler}>
          Accept
        </button>
      </div>
    </article>
  );
}

export default Disclaimer;
