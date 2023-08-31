import {useState} from "react";
import {useValidation} from "./useValidation";
export const useInput = (initalValue, validations) => {
  const [value, setValue] = useState(initalValue);
  const [isDirty, setDirty] = useState(false);

  const valid = useValidation(value, validations)

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onBlur = (e) => {
    setDirty(true);
  }

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,

  }
}