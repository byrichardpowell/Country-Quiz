import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import QuizSetup from "./Setup";
import { ShortCountry } from "./types";
import { Color, Universal } from "./Css";

/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com"
});

// write a GraphQL query that asks for names and codes for all countries
const GET_COUNTRIES = gql`
  {
    countries {
      name
      code
    }
  }
`;

interface SetupData {
  countries: Array<ShortCountry>;
}

const appCss = css`
  font-family: "Courier";
  background: ${Color.linen};
  color: ${Color.dark};
  padding: 10px 20px;
`;

const h1Css = css`
  color: ${Color.dark};
`;

const App: React.FC = () => {
  const [quizSetupObject, setQuizSetupOject] = useState(null);

  return (
    <div css={appCss}>
      <Global styles={Universal} />
      <h1 css={h1Css}>A Country Quiz</h1>
      <p>Test your knowledge of countries</p>
      {!quizSetupObject ? (
        <Query<SetupData> query={GET_COUNTRIES} client={client}>
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
        `Let's start the quiz ${JSON.stringify(quizSetupObject)}`
      )}
    </div>
  );
};

export default App;
