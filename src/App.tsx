import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import QuizSetup from "./Setup";
import { ShortCountries, FullCountries } from "./types";
import { Color, Universal } from "./Css";
import Questions from "./Questions";
import { isString, shuffle, sample, sampleSize, reject } from "lodash";
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
  background: ${Color.linen};
  color: ${Color.dark};
  padding: 10px 20px;
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

const getQuestion = (questionCode, country) => {
  switch (questionCode) {
    case "phone":
      return `What phone code does ${country.name} have?`;
    case "continent":
      return `What continent does ${country.name} belong to?`;
    case "currency":
      return `What currency does ${country.name} use?`;
    case "languages":
      return `What is one language ${country.name} speaks?`;
    case "emoji":
      return `What is the flag of ${country.name}?`;
  }
};

const getOptions = (questionCode, country, countries) => {
  const falseOptions = sampleSize(
    reject(countries, { code: country.code }),
    3
  ).map(index => {
    const option = sample(countries)[questionCode];
    return {
      ...(isString(option) ? { name: option } : option),
      correct: false
    };
  });
  const trueOption = {
    correct: true,
    name: isString(country[questionCode])
      ? country[questionCode]
      : country[questionCode].name
  };
  return shuffle([...falseOptions, ...[trueOption]]);
};

const App: React.FC = () => {
  const [quizSetup, setQuizSetupOject] = useState(null);

  return (
    <div css={appCss}>
      <Global styles={Universal} />
      <h1 css={h1Css}>A Country Quiz</h1>
      <p>Test your knowledge of countries</p>
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
      ) : (
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
                  question: getQuestion(questionCode, country),
                  options: getOptions(questionCode, country, data.countries)
                };
              }
            );

            return <Questions questions={questions} didFinish={console.log} />;
          }}
        </Query>
      )}
    </div>
  );
};

export default App;
