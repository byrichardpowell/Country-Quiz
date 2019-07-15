import React, { useState } from "react";
import { ShortCountry } from "../types";
import CountrySelector from "./CountrySelector";
import Selector from "./Selector";

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

  console.log(selectedCountries);
  console.log(selectedQuestions);
  console.log("======");

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
              <Selector
                {...country}
                onSelect={code => {
                  setSelectedCountries([...selectedCountries, ...[code]]);
                }}
                onDeselect={code =>
                  setSelectedCountries(
                    selectedCountries.filter(code => code !== country.code)
                  )
                }
              />
            );
          })}
      </fieldset>
      <fieldset>
        <legend>What type of questions do you want?</legend>
        {questionTypes.map(question => {
          return (
            <Selector
              {...question}
              onSelect={code => {
                setSelectedQuestions([...selectedQuestions, ...[code]]);
              }}
              onDeselect={code =>
                setSelectedQuestions(
                  selectedQuestions.filter(code => question.code !== code)
                )
              }
            />
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
