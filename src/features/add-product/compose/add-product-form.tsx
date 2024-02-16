import css from "./_add-product-form.module.scss";

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";

import { AddFormInputsType, ProductType } from "@/shared/types/types";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/use-redux";

import { addProduct } from "../model/add-product";
import { setSelectType } from "@/app/slices/addFormSlice";

import { toastAuthErr, toastPromise } from "@/shared/helpers/toast";

import CalcExpirationDate from "../lib/calc-exp-date";
import getBarcodesInfo from "../lib/get-barcodes-info";
import findSimilarProducts from "../lib/find-similar-products";

import { SimilarProducts } from "./similar-products";
import LoadButton from "@/shared/ui/buttons/load-button/load-button";
import HeaderInformer from "@/shared/ui/header-informer/header-informer";
import { Modal } from "@/shared/ui/modal/modal";

export function AddProductForm() {
  const dispatch = useAppDispatch();

  const [similarModalActive, setSimilarModalActive] = useState(false);

  const [expirationDate, setExpirationDate] = useState("");
  const [similarItems, setSimilarItems] = useState<ProductType[]>([]);

  const user = useAppSelector((state) => state.user);
  const products = useAppSelector((state) => state.data.products);
  const { selectType } = useAppSelector((state) => state.addForm);

  const {
    register,
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
  } = useForm<AddFormInputsType>({ mode: "onChange" });

  const onCreate: SubmitHandler<AddFormInputsType> = async (data) => {
    try {
      if (user.isAuth) {
        toastPromise(dispatch(addProduct({ data, user, selectType })));
      } else {
        toastAuthErr();
      }

      reset();
    } catch (e) {
      console.error(`ADD PRODUCT:`, e);
    }
  };

  CalcExpirationDate(watch, getValues, setExpirationDate);

  return (
    <>
      <div className={css.addProduct}>
        <div className={css.addProductHeader}>
          <HeaderInformer title="Добавление" />
        </div>

        <form
          className={css.addProductForm}
          onSubmit={handleSubmit(onCreate)}
          noValidate
        >
          <div className={css.formWrapper}>
            <div className={css.formInput}>
              <label htmlFor="code">Штрих код:</label>
              <input
                placeholder="0000000000000"
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
                onChange={(e) => {
                  getBarcodesInfo(e.target.value, setValue);
                  findSimilarProducts(
                    products,
                    e.target.value,
                    setSimilarItems
                  );
                }}
              />
            </div>

            <div className={css.formInput}>
              <label htmlFor="name">Наименование:</label>
              <input
                placeholder="Название товара"
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

            <div className={css.formRow}>
              <div className={css.formInput}>
                <label htmlFor="category">Категория:</label>
                <select
                  id={css.category}
                  {...register("category", {
                    required: "Выберите категорию",
                  })}
                >
                  <option value="Продукты">Продукты</option>
                  <option value="Химия">Химия</option>
                  <option value="Алкоголь">Алкоголь</option>
                  <option value="Косметика">Косметика</option>
                  <option value="Другое">Другое</option>
                </select>
              </div>

              <div className={css.formInput}>
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
                      value: 99,
                      message: "Максимальное число 99",
                    },
                  })}
                />
              </div>
            </div>

            <div className={css.formRow}>
              <div className={css.formInput}>
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
                      onAccept={(date) => field.onChange(date)}
                      placeholder="00.00.0000"
                      inputMode="numeric"
                    />
                  )}
                />
              </div>

              <div className={css.formInput}>
                <select
                  id={css.exp_type}
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
                        onAccept={(date) => field.onChange(date)}
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

                <span id={css.exp_date_informer}>{expirationDate}</span>
              </div>
            </div>

            <p className={css.error}>
              {(errors.code && errors.code.message) ||
                (errors.name && errors.name.message) ||
                (errors.category && errors.category.message) ||
                (errors.quantity && errors.quantity.message) ||
                (errors.dates != undefined &&
                  errors.dates.mfd &&
                  errors.dates.mfd.message) ||
                (errors.dates != undefined &&
                  errors.dates.exp &&
                  errors.dates.exp.message)}
            </p>
          </div>

          <div className={css.formButtonWrapper}>
            <LoadButton
              type="submit"
              disabled={true}
              isLoading={isSubmitting}
              text="Добавить"
            />

            <div
              className={
                similarItems.length
                  ? `${css.similarButton} ${css.active}`
                  : css.similarButton
              }
              onClick={() => setSimilarModalActive(true)}
            >
              Похожие
            </div>
          </div>
        </form>
      </div>

      <Modal active={similarModalActive} setActive={setSimilarModalActive}>
        <SimilarProducts items={similarItems} />
      </Modal>
    </>
  );
}
