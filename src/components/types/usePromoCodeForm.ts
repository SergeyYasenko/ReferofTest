import { ref, computed, watch } from "vue";
import { useForm, useField } from "vee-validate";
import type { FormValues } from "./types";
import { schema } from "./validation";
import { createNoEndDateRef } from "./validation";

interface PromoCodeFormEmits {
   (e: "update:modelValue", value: boolean): void;
}

export const usePromoCodeForm = (emit: PromoCodeFormEmits) => {
   const currentStep = ref<number>(1);
   const noEndDate = createNoEndDateRef();

   // Создаем отдельные поля для правильной работы с метаданными
   const { value: promoCode, meta: promoCodeMeta } =
      useField<string>("promoCode");
   const { value: title, meta: titleMeta } = useField<string>("title");
   const { value: description, meta: descriptionMeta } =
      useField<string>("description");
   const { value: points, meta: pointsMeta } = useField<number>("points");
   const { value: startDate, meta: startDateMeta } = useField<string | null>(
      "startDate"
   );
   const { value: endDate, meta: endDateMeta } = useField<string | null>(
      "endDate"
   );
   const { value: activationLimit, meta: activationLimitMeta } =
      useField<number>("activationLimit");
   const { value: receiveMethod, meta: receiveMethodMeta } = useField<0 | 1>(
      "receiveMethod"
   );

   const { handleSubmit, errors, resetForm, validateField } =
      useForm<FormValues>({
         validationSchema: schema,
         initialValues: {
            promoCode: "",
            title: "",
            description: "",
            points: 0,
            startDate: null,
            endDate: null,
            activationLimit: 0,
            receiveMethod: 0,
         } as FormValues,
      });

   const charCount = computed<number>(() => description.value?.length || 0);

   const goToStep = async (step: number): Promise<void> => {
      if (step === 2) {
         const results = await Promise.all([
            validateField("promoCode"),
            validateField("title"),
            validateField("points"),
         ]);

         if (results.some((result) => !result.valid)) return;
      }
      currentStep.value = step;
   };

   watch(noEndDate, (newValue: boolean) => {
      if (newValue) {
         endDate.value = null;
      }
   });

   // Автоматическое преобразование промокода в верхний регистр
   watch(
      () => promoCode.value,
      (newValue: string | undefined) => {
         if (newValue && newValue !== newValue.toUpperCase()) {
            promoCode.value = newValue.toUpperCase();
         }
      }
   );

   const onSubmit = () => {
      // Собираем все данные из полей
      const formData = {
         promoCode: promoCode.value,
         title: title.value,
         description: description.value,
         points: points.value,
         startDate: startDate.value,
         endDate: endDate.value,
         activationLimit: activationLimit.value,
         receiveMethod: receiveMethod.value,
         noEndDate: noEndDate.value,
      };

      console.log("Создан промокод:", formData);
      closeModal();
   };

   const closeModal = (): void => {
      emit("update:modelValue", false);
      resetForm();
      currentStep.value = 1;
      noEndDate.value = false;
   };

   return {
      currentStep,
      noEndDate,
      // Значения полей
      promoCode,
      title,
      description,
      points,
      startDate,
      endDate,
      activationLimit,
      receiveMethod,
      // Остальное
      charCount,
      errors,
      goToStep,
      onSubmit,
      closeModal,

      formAttrs: {
         promoCode: promoCodeMeta,
         title: titleMeta,
         description: descriptionMeta,
         points: pointsMeta,
         startDate: startDateMeta,
         endDate: endDateMeta,
         activationLimit: activationLimitMeta,
         receiveMethod: receiveMethodMeta,
      },
   };
};
