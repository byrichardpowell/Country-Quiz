import React, { useState } from "react";
import { ShortCountries } from "../types";
import Selector from "./Selector";
import { Color } from "../Css";
import { questionTypes } from "../Helpers/questionTypes";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";

interface Props extends ShortCountries {
  didSetupQuiz: Function;
}

const listWrapperCss = css`
  max-width: 280px;
  position: relative;

  input[type="search"] {
    width: 100%;
    padding: 15px 10px;
  }

  label {
    display: block;
    padding: 10px 5px 5px 5px;
    cursor: pointer;
  }

  label:hover {
    background: ${Color.light};
  }

  input[type="checkbox"] {
    margin-right: 5px;
  }

  .count {
    position: absolute;
    top: 15px;
    right: 10px;
  }
`;

const countryWrapperCss = css`
  max-height: 190px;
  overflow: auto;
  background: ${Color.white};
  border: 1px solid ${Color.light};
  border-top: none;
`;

const QuizSetup: React.FC<Props> = ({ countries, didSetupQuiz }) => {
  const [search, setSearch] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const isValid = selectedCountries.length > 0 && selectedQuestions.length > 0;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        didSetupQuiz({
          selectedQuestions,
          selectedCountries
        });
      }}
    >
      <fieldset>
        <legend>Which countries should be in the quiz?</legend>
        <div css={listWrapperCss}>
          <input
            type="search"
            placeholder="Search for a country"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
          <small className="count">
            {`${selectedCountries.length} selected`}
          </small>
          <div css={countryWrapperCss}>
            {countries
              .filter(
                country =>
                  country.name.toLowerCase().indexOf(search.toLowerCase()) >
                    -1 ||
                  country.code.toLowerCase().indexOf(search.toLowerCase()) > -1
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
          </div>
        </div>
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
