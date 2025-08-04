// validation.ts
import * as yup from "yup";
import { ref } from "vue";

export const schema = yup.object({
   promoCode: yup
      .string()
      .required("Обязательно поле")
      .max(30, "Максимум 30 символов")
      .transform((value) => value?.toUpperCase()),
   title: yup
      .string()
      .required("Обязательно поле")
      .max(120, "Максимум 120 символов"),
   description: yup.string().max(250, "Максимум 250 символов"),
   points: yup
      .number()
      .required("Обязательно поле")
      .min(1, "Минимум 1 балл")
      .typeError("Только числовые значения"),
   startDate: yup
      .date()
      .required("Дата начала обязательна")
      .typeError("Некорректная дата"),
   endDate: yup.date().when("noEndDate", {
      is: false,
      then: (schema) =>
         schema.min(
            yup.ref("startDate"),
            "Дата окончания должна быть позже даты начала"
         ),
      otherwise: (schema) => schema.nullable(),
   }),
   activationLimit: yup
      .number()
      .required("Обязательно поле")
      .min(1, "Минимум 1 активация")
      .typeError("Только числовые значения"),
   receiveMethod: yup
      .number()
      .required("Выберите способ получения")
      .oneOf([0, 1], "Неверное значение")
      .typeError("Только числовые значения"),
});

export const createNoEndDateRef = () => ref(false);
