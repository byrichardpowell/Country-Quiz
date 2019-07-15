import React, { useState } from "react";
import { ShortCountry } from "./types";
import { string } from "prop-types";
import { type } from "os";

interface Props {
  countries: Array<ShortCountry>;
}

const questionTypes = [
  {
    code: "phone",
    name: "phone numbers"
  },
  {
    code: "continent",
    name: "continents"
  },
  {
    code: "currency",
    name: "currency"
  },
  {
    code: "languages",
    name: "languages"
  },
  {
    code: "emoji",
    name: "flags"
  }
];

const QuizSetup: React.FC<Props> = ({ countries }) => {
  const [search, setSearch] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const isValid = selectedCountries.length > 0 && selectedQuestions.length > 0;

  return (
    <form className="QuizSetup">
      <fieldset>
        <legend>Which countries should be in the quiz?</legend>
        <input
          type="search"
          placeholder="Search for a country"
          onChange={e => setSearch(e.target.value)}
          value={search}
        />
        {countries
          .filter(
            country =>
              country.name.indexOf(search) > -1 ||
              country.code.indexOf(search) > -1
          )
          .map(country => {
            return (
              <label>
                <input
                  type="checkbox"
                  value={country.code}
                  name={country.code}
                  onChange={e => {
                    if (e.target.checked) {
                      setSelectedCountries([
                        ...selectedCountries,
                        ...[e.target.value]
                      ]);
                    } else {
                      setSelectedCountries(
                        selectedCountries.filter(
                          country => country !== e.target.value
                        )
                      );
                    }
                  }}
                />
                {country.name}
              </label>
            );
          })}
      </fieldset>
      <fieldset>
        <legend>What type of questions do you want?</legend>
        {questionTypes.map(question => {
          return (
            <label>
              <input
                type="checkbox"
                value={question.code}
                name={question.name}
                onChange={e => {
                  if (e.target.checked) {
                    setSelectedQuestions([
                      ...selectedQuestions,
                      ...[e.target.value]
                    ]);
                  } else {
                    setSelectedQuestions(
                      selectedQuestions.filter(
                        question => question !== e.target.value
                      )
                    );
                  }
                }}
              />
              {`Questions about ${question.name}`}
            </label>
          );
        })}
      </fieldset>
      <button type="submit" disabled={isValid === false}>
        Start the quiz!
      </button>
    </form>
  );
};

export default QuizSetup;
