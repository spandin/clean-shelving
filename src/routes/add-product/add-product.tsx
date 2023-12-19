import "./_add-product.scss";
import { useEffect } from "react";
import { AddFormInputsType } from "@/types/types";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "@/hooks/redux-hooks";

import { useAuth } from "@/hooks/use-auth";
import { addProduct, setBarcodes } from "@/store/slices/dataSlice";

import { toast } from "react-toastify";
import { IMaskInput } from "react-imask";

import Informer from "@/components/common/informer/informer";
import { LoadButton } from "@/components/common/load-button";

export default function AddProduct() {
  const dispatch = useAppDispatch();
  const { email } = useAuth();

  const {
    register,
    control,
    watch,
    formState: { isSubmitting },
    handleSubmit,

    reset,
  } = useForm<AddFormInputsType>({ mode: "onChange" });

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

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
              placeholder="8600012345678900"
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
            />
          </div>

          <div className="add_product__form__input">
            <label htmlFor="name">Наименование:</label>
            <input
              placeholder="Nestle Decoration 75g"
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
                {...register("category", {
                  required: "Выберите категорию",
                })}
              >
                <option value="Косметика">Косметика</option>
                <option value="Продукты">Продукты</option>
                <option value="Алкоголь">Алкоголь</option>
                <option value="Химия">Химия</option>
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
                    value: 99,
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
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    placeholder="00.00.0000"
                    inputMode="numeric"
                  />
                )}
              />
            </div>

            <div className="add_product__form__input">
              <select>
                <option value="fullDate">Годен до:</option>
                <option value="month">Годен месяцев:</option>
              </select>

              <Controller
                control={control}
                {...register("dates.exp", {
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
          </div>
        </div>

        <LoadButton
          type="submit"
          disabled={true}
          isLoading={isSubmitting}
          text="Добавить"
        />
      </form>
    </div>
  );
}
