import "./_update-products.scss";

import { ProductType } from "@/types/types";

import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";

import { updateProduct } from "@/store/slices/dataSlice";
import { updatedActionsUser } from "@/store/slices/userSlice";

import { toastAuthErr, toastPromise } from "@/lib/toast";
import { timestampToString } from "@/lib/date";

import { LoadButton } from "@/components/common/load-button/load-button";

export const UpdateProduct = ({
  product,
  id,
}: {
  product: ProductType;
  id: string;
}) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<ProductType>({ mode: "onSubmit" });

  const onUpdate: SubmitHandler<ProductType> = async (data) => {
    try {
      toastPromise(dispatch(updateProduct({ id, data, user })));
      await dispatch(updatedActionsUser(user));
    } catch (e) {
      toastAuthErr();
      console.log(`UPDATE PRODUCT:`, e);
    }
  };

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

          <div className="update-product__form__input">
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

          <div className="add-product__form__wrapper__row">
            <div className="add-product__form__input">
              <label htmlFor="category">Категория:</label>
              <select
                id="category"
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

            <div className="add-product__form__input">
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

          <div className="update-product__form__wrapper__row">
            <div className="update-product__form__input">
              <label htmlFor="mfd">Годен от:</label>
              <input
                type="text"
                autoComplete="off"
                inputMode="numeric"
                defaultValue={timestampToString(product.dates.mfd)}
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
                defaultValue={timestampToString(product.dates.exp)}
                {...register("dates.exp", {
                  required: "Укажите дату просрочки",
                })}
              />
            </div>
          </div>

          <p className="update-product__form__wrapper__error">
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
};
