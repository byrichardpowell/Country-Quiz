import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import QuizSetup from "./Setup";
import { ShortCountry } from "./types";

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

interface Variables {
  first: number;
}

const App: React.FC = () => {
  const [quizSetupObject, setQuizSetupOject] = useState(null);

  return (
    <div className="App">
      {!quizSetupObject ? (
        <Query<SetupData, Variables> query={GET_COUNTRIES} client={client}>
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
