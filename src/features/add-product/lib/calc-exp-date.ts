import { AddFormInputsType } from "@/shared/types/types";

import { useEffect } from "react";
import { UseFormGetValues, UseFormWatch } from "react-hook-form";
import { isValid } from "date-fns";

import { useAppSelector } from "@/shared/hooks/use-redux";

import {
  calcDistanceEndFromExp,
  calcDistanceEndFromMonth,
  stringToTimestamp,
} from "@/shared/helpers/date";

export default function CalcExpirationDate(
  watch: UseFormWatch<AddFormInputsType>,
  getValues: UseFormGetValues<AddFormInputsType>,
  setExpirationDate: React.Dispatch<React.SetStateAction<string>>
) {
  const { selectType } = useAppSelector((state) => state.settings);

  useEffect(() => {
    const subscription = watch(() => {
      setExpirationDate("");
      if (selectType === "date") {
        (isValid(stringToTimestamp(getValues("dates.exp"))) &&
          getValues("dates.exp")?.length > 9) ||
        getValues("dates.exp")?.length < 9
          ? setExpirationDate(calcDistanceEndFromExp(getValues("dates.exp")))
          : null;
      } else {
        setExpirationDate(
          calcDistanceEndFromMonth(
            getValues("dates.mfd"),
            getValues("dates.exp")
          )
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, selectType, getValues, setExpirationDate]);
}
