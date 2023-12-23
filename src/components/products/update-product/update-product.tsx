import { AddFormInputsType } from "@/types/types";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAuth } from "@/hooks/use-auth";
import { useAppDispatch } from "@/hooks/redux-hooks";

import { updateProduct } from "@/store/slices/dataSlice";

import { toast } from "react-toastify";
import { toastAuthErr } from "@/lib/toast";

import { LoadButton } from "@/components/common/load-button/load-button";

export const UpdateProduct = ({
  product,
  id,
}: {
  product: AddFormInputsType;
  id: string;
}) => {
  const dispatch = useAppDispatch();
  const { isAuth, email } = useAuth();

  const {
    register,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<AddFormInputsType>({ mode: "onSubmit" });

  const onUpdate: SubmitHandler<AddFormInputsType> = async (data) => {
    try {
      await toast.promise(dispatch(updateProduct({ id, data, email })), {
        pending: "Загрузка на сервер",
        success: "Обновлено успешно",
        error: "Ошибка при обновлении",
      });
    } catch (error) {
      console.log(`UPDATE PRODUCT:`, error);
    }
  };

  useEffect(() => {
    setValue("name", product.name);
    setValue("code", product.code);
    setValue("dates.mfd", product.dates.mfd);
    setValue("dates.exp", product.dates.exp);
    setValue("quantity", product.quantity);
  }, [id, product, setValue]);

  return (
    <div className="update-product">
      <h3>Обновить продукт</h3>

      <form
        className="update-product__form"
        onSubmit={handleSubmit(onUpdate)}
        noValidate
      >
        <div className="update-product__form__wrapper">
          <div className="update-product__form__input">
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
            />
          </div>

          <div className="update-product__form__input">
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

          <div className="add-product__form__wrapper__row">
            <div className="add-product__form__input">
              <label htmlFor="category">Категория:</label>
              <select
                id="category"
                {...register("category", {
                  required: "Выберите категорию",
                })}
              >
                <option
                  value="Продукты"
                  selected={product.category == "Продукты" ? true : false}
                >
                  Продукты
                </option>
                <option
                  value="Химия"
                  selected={product.category == "Химия" ? true : false}
                >
                  Химия
                </option>
                <option
                  value="Алкоголь"
                  selected={product.category == "Алкоголь" ? true : false}
                >
                  Алкоголь
                </option>
                <option
                  value="Косметика"
                  selected={product.category == "Косметика" ? true : false}
                >
                  Косметика
                </option>
                <option
                  value="Другое"
                  selected={product.category == "Другое" ? true : false}
                >
                  Другое
                </option>
              </select>
            </div>

            <div className="add-product__form__input">
              <label htmlFor="quantity">Количество:</label>
              <input
                placeholder="1-99"
                type="number"
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

          <div className="update-product__form__wrapper__row">
            <div className="update-product__form__input">
              <label htmlFor="mfd">Годен от:</label>
              <input
                type="text"
                autoComplete="off"
                inputMode="numeric"
                {...register("dates.mfd", {
                  required: "Укажите дату производства",
                })}
              />
            </div>

            <div className="update-product__form__input">
              <label htmlFor="exp">Годен до:</label>
              <input
                type="text"
                autoComplete="off"
                inputMode="numeric"
                {...register("dates.exp", {
                  required: "Укажите дату просрочки",
                })}
              />
            </div>
          </div>
        </div>

        <LoadButton
          type="submit"
          disabled={true}
          isLoading={isSubmitting}
          text="Обновить"
          onClick={isAuth ? () => null : toastAuthErr}
        />
      </form>
    </div>
  );
};
