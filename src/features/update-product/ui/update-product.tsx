import css from "./_update-product.module.scss";

import { ProductType } from "@/shared/types/types";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";

import { updateProduct } from "../store/thunk";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/use-redux";
import { toastAuthErr, toastUpdPromise } from "@/shared/helpers/toast";
import { timestampToString } from "@/shared/helpers/parse-date";
import LoadButton from "@/shared/ui/buttons/load-button/load-button";

interface Props {
  product: ProductType;
  id: string;
}

export function UpdateProduct({ product, id }: Props) {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);

  const {
    register,
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<ProductType>({ mode: "onSubmit" });

  const onUpdate: SubmitHandler<ProductType> = async (data) => {
    if (user.isAuth) {
      toastUpdPromise(dispatch(updateProduct({ id, data, user })));
    } else {
      toastAuthErr();
    }
  };

  return (
    <div className={css.updateProduct}>
      <h3>Обновить продукт</h3>

      <form
        className={css.updateForm}
        onSubmit={handleSubmit(onUpdate)}
        noValidate
      >
        <div className={css.formWrapper}>
          <div className={css.inputWrapper}>
            <label htmlFor="code">Штрих код:</label>
            <input
              placeholder="0000000000000"
              type="number"
              autoComplete="off"
              defaultValue={product.code}
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

          <div className={css.inputWrapper}>
            <label htmlFor="name">Наименование:</label>
            <input
              placeholder="Название товара"
              type="text"
              autoComplete="off"
              defaultValue={product.name}
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

          <div className={css.wrapperRow}>
            <div className={css.inputWrapper}>
              <label htmlFor="category">Категория:</label>
              <select
                id={css.category}
                defaultValue={product.category}
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

            <div className={css.inputWrapper}>
              <label htmlFor="quantity">Количество:</label>
              <input
                placeholder="1-99"
                type="number"
                autoComplete="off"
                defaultValue={product.quantity}
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

          <div className={css.wrapperRow}>
            <div className={css.inputWrapper}>
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
                    defaultValue={timestampToString(product.dates.mfd)}
                    placeholder="00.00.0000"
                    inputMode="numeric"
                  />
                )}
              />
            </div>

            <div className={css.inputWrapper}>
              <label htmlFor="exp">Годен до:</label>
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
                    defaultValue={timestampToString(product.dates.exp)}
                    placeholder="00.00.0000"
                    inputMode="numeric"
                  />
                )}
              />
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

        <LoadButton
          type="submit"
          disabled={true}
          isLoading={isSubmitting}
          text="Обновить"
        />
      </form>
    </div>
  );
}
