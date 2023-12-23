import "./_add-product.scss";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { toast } from "react-toastify";

import { AddFormInputsType } from "@/types/types";

import { useAuth } from "@/hooks/use-auth";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";

import { addProduct, setBarcodes } from "@/store/slices/dataSlice";
import { setSelectType } from "@/store/slices/addFormSlice";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toastAuthErr } from "@/lib/toast";

import Informer from "@/components/common/informer/informer";
import { LoadButton } from "@/components/common/load-button/load-button";
import CalcExpirationDate from "./components/calcExpirationDate";

export default function AddProduct() {
  const dispatch = useAppDispatch();
  const { isAuth, email } = useAuth();

  const [expirationDate, setExpirationDate] = useState("");

  const { selectType } = useAppSelector((state) => state.addForm);

  const {
    register,
    control,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
  } = useForm<AddFormInputsType>({ mode: "onChange" });

  CalcExpirationDate(watch, getValues, setExpirationDate);

  const onCreate: SubmitHandler<AddFormInputsType> = async (data) => {
    try {
      await toast.promise(dispatch(addProduct({ data, email })), {
        pending: "Загрузка на сервер",
        success: "Загружено успешно",
        error: "Ошибка при добавлении",
      });

      dispatch(setBarcodes(data));

      reset();
    } catch (e) {
      console.log(`ADD PRODUCT:`, e);
    }
  };

  const getBarcodesInfo = async (barcode: string): Promise<void> => {
    try {
      const docRef = doc(db, `barcodes/${barcode}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setValue("name", docSnap.data().name);
        setValue("category", docSnap.data().category);
      }
    } catch (error) {
      console.log("GET BARCODE INFO:", error);
    }
  };

  return (
    <div className="add_product">
      <div className="add_product__header">
        <Informer title="Добавление" />
      </div>

      <form
        className="add_product__form"
        onSubmit={handleSubmit(onCreate)}
        noValidate
      >
        <div className="add_product__form__wrapper">
          <div className="add_product__form__input">
            <label htmlFor="code">Штрих код:</label>
            <input
              type="number"
              autoComplete="off"
              {...register("code", {
                required: "Введите штрих код",
                minLength: {
                  value: 6,
                  message: "Минимальная длина 6 символов",
                },
                maxLength: {
                  value: 16,
                  message: "Максимальная длина 16 символов",
                },
              })}
              onChange={(e) => getBarcodesInfo(e.target.value)}
            />
          </div>

          <div className="add_product__form__input">
            <label htmlFor="name">Наименование:</label>
            <input
              type="text"
              autoComplete="off"
              {...register("name", {
                required: "Введите название",
                minLength: {
                  value: 8,
                  message: "Минимальная длина 8 символов",
                },
                maxLength: {
                  value: 50,
                  message: "Максимальная длина 50 символов",
                },
              })}
            />
          </div>

          <div className="add_product__form__wrapper__row">
            <div className="add_product__form__input">
              <label htmlFor="category">Категория:</label>
              <select
                id="category"
                {...register("category", {
                  required: "Выберите категорию",
                })}
              >
                <option value="Косметика">Продукты</option>
                <option value="Продукты">Химия</option>
                <option value="Алкоголь">Алкоголь</option>
                <option value="Химия">Косметика</option>
                <option value="Другое">Другое</option>
              </select>
            </div>

            <div className="add_product__form__input">
              <label htmlFor="quantity">Количество:</label>
              <input
                placeholder="1-99"
                type="number"
                defaultValue={1}
                autoComplete="off"
                {...register("quantity", {
                  required: "Введите количество",
                  min: {
                    value: 1,
                    message: "Минимальное число 1",
                  },
                  max: {
                    value: 999,
                    message: "Максимальное число 99",
                  },
                })}
              />
            </div>
          </div>

          <div className="add_product__form__wrapper__row">
            <div className="add_product__form__input">
              <label htmlFor="mfd">Годен от:</label>
              <Controller
                control={control}
                {...register("dates.mfd", {
                  required: "Укажите дату производства",
                })}
                render={({ field }) => (
                  <IMaskInput
                    mask={Date}
                    min={new Date(2018, 0, 1)}
                    max={new Date(2099, 0, 1)}
                    onChange={(date) => field.onChange(date)}
                    placeholder="00.00.0000"
                    inputMode="numeric"
                  />
                )}
              />
            </div>

            <div className="add_product__form__input">
              <select
                id="exp_type"
                defaultValue={selectType}
                onChange={(e) => {
                  dispatch(setSelectType(e.target.value));
                }}
              >
                <option value="date">Годен до:</option>
                <option value="month">Годен месяцев:</option>
              </select>

              {selectType === "date" ? (
                <Controller
                  control={control}
                  {...register("dates.exp", {
                    required: "Укажите дату просрочки",
                  })}
                  render={({ field }) => (
                    <IMaskInput
                      mask={Date}
                      min={new Date(2018, 0, 1)}
                      max={new Date(2099, 0, 1)}
                      onChange={(date) => field.onChange(date)}
                      placeholder="00.00.0000"
                      inputMode="numeric"
                    />
                  )}
                />
              ) : (
                <input
                  type="number"
                  defaultValue={0}
                  autoComplete="off"
                  {...register("dates.exp", {
                    required: "Введите количество месяцев",
                    min: {
                      value: 1,
                      message: "Мин. кол. месяцев 1",
                    },
                    max: {
                      value: 120,
                      message: "Макс. кол. месяцев 120",
                    },
                  })}
                />
              )}

              <span id="exp_date_informer">{expirationDate}</span>
            </div>
          </div>
        </div>

        <LoadButton
          type="submit"
          disabled={true}
          isLoading={isSubmitting}
          text="Добавить"
          onClick={isAuth ? () => null : toastAuthErr}
        />
      </form>
    </div>
  );
}
