import { Link } from 'react-router-dom';
import './AboutPage.scss';

function AboutPage() {
  return (
    <>
      <header class="header">
        <h1 class="header__title">About Our Bond Ratio Analysis Software</h1>
      </header>

      <section class="section">
        <h2 class="section__title">Introduction</h2>
        <p class="section__content">
          Welcome to our Bond Ratio Analysis Software, a powerful tool designed
          to analyze financial bond data and provide valuable insights into the
          market. With this software, you can effortlessly calculate ratios
          between different bonds and use statistical analysis, including
          standard deviation, to identify trading signals and investment
          opportunities.
        </p>
      </section>

      <section class="section">
        <h2 class="section__title">Features</h2>
        <ul class="section__list">
          <li class="section__item">
            <strong class="section__item-title">Bond Ratio Calculation:</strong>{' '}
            Our software enables you to compare and contrast two bonds,
            providing you with the ability to calculate ratios between them. By
            examining various aspects of these financial instruments, you gain a
            deeper understanding of their performance and relationship in the
            market.
          </li>
          <li class="section__item">
            <strong class="section__item-title">
              Standard Deviation Analysis:
            </strong>{' '}
            One of the key features of our software is its use of standard
            deviation as a statistical measure. Standard deviation helps you
            gauge the volatility and risk associated with specific bond pairs.
            It provides a valuable metric for identifying potential trading
            opportunities and assessing market stability.
          </li>
          <li class="section__item">
            <strong class="section__item-title">Trading Signals:</strong> Our
            software doesn't stop at just calculations. It goes a step further
            by generating trading signals based on the results of bond ratio
            analysis and standard deviation. These signals can help you make
            informed decisions in your investment strategies.
          </li>
        </ul>
      </section>

      <section class="section">
        <h2 class="section__title">How It Works</h2>
        <ol class="section__list">
          <li class="section__item">
            <strong class="section__item-title">Data Input:</strong> You provide
            data for the two bonds you want to analyze. This data typically
            includes bond identifiers, historical pricing data, and other
            relevant information.
          </li>
          <li class="section__item">
            <strong class="section__item-title">Ratio Calculation:</strong> The
            software calculates various ratios between the two bonds, revealing
            their historical performance relative to each other.
          </li>
          <li class="section__item">
            <strong class="section__item-title">Standard Deviation:</strong>{' '}
            Standard deviation is computed to assess the level of risk
            associated with the bond pair. Higher standard deviations indicate
            greater volatility.
          </li>
          <li class="section__item">
            <strong class="section__item-title">Signal Generation:</strong>{' '}
            Based on the calculated ratios and standard deviation, the software
            generates trading signals. These signals can be used as part of your
            trading strategy.
          </li>
          <li class="section__item">
            <strong class="section__item-title">Visualizations:</strong> The
            software often provides visualizations such as charts and graphs to
            help you interpret the data more effectively.
          </li>
        </ol>
      </section>

      <section class="section">
        <h2 class="section__title">Use Cases</h2>
        <ul class="section__list">
          <li class="section__item">
            <strong class="section__item-title">
              Investment Decision-Making:
            </strong>{' '}
            Use our software to make well-informed investment decisions by
            evaluating the historical performance and risk associated with bond
            pairs.
          </li>
          <li class="section__item">
            <strong class="section__item-title">Risk Management:</strong> Assess
            the level of risk in your portfolio and take proactive steps to
            manage it based on the standard deviation analysis.
          </li>
          <li class="section__item">
            <strong class="section__item-title">Market Monitoring:</strong>{' '}
            Continuously monitor bond ratios and trading signals to stay ahead
            of market trends and seize opportunities as they arise.
          </li>
        </ul>
      </section>

      <section class="section">
        <h2 class="section__title">Conclusion</h2>
        <p class="section__content">
          Our Bond Ratio Analysis Software is a valuable tool for investors,
          traders, and financial professionals. It empowers you to analyze bond
          data comprehensively and make data-driven decisions that can lead to
          successful investments. Whether you are an experienced investor or
          just starting in the world of bonds, our software is designed to
          assist you in your financial journey.
        </p>
        <p class="section__content">
          Start using our software today and gain an edge in the bond market!
        </p>
      </section>
      <section class="section">
        <h2 class="section__title">Reliability</h2>
        <p class="section__content">
          This program has been crafted by traders for traders. The original
          idea was conceived by the master trader{' '}
          {
            <Link
              to={'https://www.linkedin.com/in/david-golin-75b6641/'}
              class="section__link"
            >
              David Golin
            </Link>
          }
          , whose expertise in the field is unmatched. It was then brought to
          life by the developer {''}
          {
            <Link
              to={'https://www.linkedin.com/in/riccardo-golin/'}
              class="section__link"
            >
              Riccardo Golin
            </Link>
          }
          , a recent graduate of the intensive BrainStation Bootcamp.
        </p>
      </section>
    </>
  );
}

export default AboutPage;
