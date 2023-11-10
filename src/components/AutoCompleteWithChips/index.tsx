import React, { useState, KeyboardEvent } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface AutoCompleteWithTagsProps {
  type?: "text";
  tags?: string[];
  label?: string;
  placeholder?: string;
  values: string[];
  onTagUpdate?: (updatedTags: string[]) => void;
  disabled?: boolean;
}

export default function AutoCompleteWithTags(props: AutoCompleteWithTagsProps) {
  const {
    type = "text",
    tags = [],
    label = "tags",
    placeholder = "",
    values = [],
    onTagUpdate,
    disabled,
  } = props;

  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<string[]>(tags);

  const customInputTagHandler = (event: any, value: string[]) => {
    let latestValue = value.at(-1);
    if (type === "number") latestValue = parseFloat(latestValue);
    if (typeof value.at(-1) === "string") {
      onTagUpdate && onTagUpdate([...value.slice(0, -1), latestValue]);
    } else {
      onTagUpdate && onTagUpdate(value);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Tab": {
        if (inputValue.length > 0) {
          event.preventDefault();
          customInputTagHandler(event, values.concat([inputValue]));
          setInputValue("");
        }
        break;
      }
      default:
    }
  };

  return (
    <Autocomplete
      multiple
      id="multiple-limit-tags"
      options={options}
      getOptionLabel={(option) => {
        return <span title={option}>{option}</span>;
      }}
      freeSolo
      disabled={disabled}
      value={values}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      includeInputInList
      filterSelectedOptions
      renderInput={(params) => {
        params.inputProps.onKeyDown = handleKeyDown;

        return (
          <TextField
            {...params}
            type={type}
            label={label}
            placeholder={!values?.length ? placeholder : ""}
            inputProps={{
              ...params.inputProps,
              value: inputValue,
            }}
          />
        );
      }}
      onChange={(event, value) => {
        customInputTagHandler(event, value);
      }}
    />
  );
}
