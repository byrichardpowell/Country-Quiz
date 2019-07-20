import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import QuizSetup from "./Setup";
import { ShortCountries, FullCountries } from "./types";
import { Color, Universal } from "./Css";
import Questions from "./Questions";
import Results from "./Results";
import {
  isString,
  isObject,
  shuffle,
  sample,
  sampleSize,
  find,
  isArray
} from "lodash";
/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com"
});

// write a GraphQL query that asks for names and codes for all countries
const GET_SHORT_COUNTRIES = gql`
  {
    countries {
      name
      code
    }
  }
`;

const appCss = css`
  font-family: "Courier";
  background: ${Color.white};
  color: ${Color.dark};
  padding: 0 20px 20px;
  height: 100%;
  border: 10px solid ${Color.linen};
`;

const h1Css = css`
  color: ${Color.dark};
`;

const getLongCountriesQuery = (quizSetup): String => {
  const fieldValues = {
    phone: `phone
    `,
    continent: `continent {
      name
    }
    `,
    currency: `currency
    `,
    languages: `languages {
      name
    }
    `,
    emoji: `emoji
    `
  };

  const fields = quizSetup.selectedQuestions.reduce((fields, question) => {
    return (fields += fieldValues[question]);
  }, "");

  return gql`
    {
      countries {
        name
        code
        ${fields}
      }
    }
  `;
};

const getOptionName = (country, questionCode) => {
  if (isString(country[questionCode])) {
    return country[questionCode];
  }
  if (isArray(country[questionCode]) && country[questionCode].length) {
    return country[questionCode][0].name;
  }
  return country[questionCode].name;
};

const getOptions = (questionCode, questionCountry, countries) => {
  const uniqFalseOptions = countries.reduce((options, country) => {
    const questionCountryOption = getOptionName(questionCountry, questionCode);
    const thisCountryOption = getOptionName(country, questionCode);

    if (questionCountryOption !== thisCountryOption) {
      if (isObject(find(options, ["name", thisCountryOption])) === false) {
        options.push({
          name: thisCountryOption,
          correct: false
        });
      }
    }
    return options;
  }, []);

  const trueOption = {
    correct: true,
    name: getOptionName(questionCountry, questionCode)
  };
  return shuffle([...sampleSize(uniqFalseOptions, 3), ...[trueOption]]);
};

const App: React.FC = () => {
  const [quizSetup, setQuizSetupOject] = useState(null);
  const [answers, setAnswers] = useState(null);

  return (
    <div css={appCss}>
      <Global styles={Universal} />
      <h1 css={h1Css}>A Country Quiz</h1>
      <p>Test your country knowledge.</p>
      {!quizSetup ? (
        <Query<ShortCountries> query={GET_SHORT_COUNTRIES} client={client}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{error.message}</p>;
            return (
              <QuizSetup
                countries={data.countries}
                didSetupQuiz={setQuizSetupOject}
              />
            );
          }}
        </Query>
      ) : null}
      {quizSetup && !answers ? (
        <Query<FullCountries>
          query={getLongCountriesQuery(quizSetup)}
          client={client}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{error.message}</p>;

            const questions = quizSetup.selectedCountries.map(
              selectedCountry => {
                const country = data.countries.find(
                  country => country.code === selectedCountry
                );
                const questionCode = sample(quizSetup.selectedQuestions);

                return {
                  country,
                  questionCode,
                  options: getOptions(questionCode, country, data.countries)
                };
              }
            );

            return <Questions questions={questions} didFinish={setAnswers} />;
          }}
        </Query>
      ) : null}
      {answers ? (
        <Results
          answers={answers}
          reset={() => {
            setQuizSetupOject(null);
            setAnswers(null);
          }}
        />
      ) : null}
    </div>
  );
};

export default App;
