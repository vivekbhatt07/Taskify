import { useState, KeyboardEvent } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface AutoCompleteWithTagsProps {
  type?: "text" | "number";
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
  // @ts-ignore
  const [options, setOptions] = useState<string[]>(tags);

  // @ts-ignore
  const customInputTagHandler = (event: any, value: string[]) => {
    console.log(value, "Value");
    let latestValue = value.at(-1);
    // @ts-ignore
    if (type === "number") latestValue = parseFloat(latestValue);
    if (typeof value.at(-1) === "string") {
      // @ts-ignore
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
      // getOptionLabel={(option) => {
      //   return <span title={option}>{option}</span>;
      // }}
      freeSolo
      disabled={disabled}
      value={values}
      // @ts-ignore
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      includeInputInList
      filterSelectedOptions
      renderInput={(params) => {
        params.inputProps.onKeyDown = handleKeyDown;

        return (
          <TextField
            required={values.length === 0}
            {...params}
            type={type}
            label={label}
            placeholder={!values?.length ? placeholder : ""}
            inputProps={{
              ...params.inputProps,
              value: inputValue,
              maxLength: 15,
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
