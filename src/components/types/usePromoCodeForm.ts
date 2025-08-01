import { ref, computed, watch } from "vue";
import { useForm } from "vee-validate";
import type { FormValues } from "./types";
import { schema } from "./validation";
import { createNoEndDateRef } from "./validation";
import { useField } from "vee-validate";

interface PromoCodeFormEmits {
   (e: "update:modelValue", value: boolean): void;
}

export const usePromoCodeForm = (emit: PromoCodeFormEmits) => {
   const currentStep = ref<number>(1);
   const noEndDate = createNoEndDateRef();

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
   receiveMethod.value = 0;

   const charCount = computed<number>(() => description.value?.length || 0);

   const {
      handleSubmit,
      errors,
      resetForm,
      validateField,
      meta: formMeta,
   } = useForm<FormValues>({
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

   const onSubmit = handleSubmit((values: FormValues) => {
      console.log("Создан промокод:", {
         ...values,
         noEndDate: noEndDate.value,
      });
      closeModal();
   });

   const closeModal = (): void => {
      emit("update:modelValue", false);
      resetForm();
      currentStep.value = 1;
      noEndDate.value = false;
   };

   watch(
      () => promoCode.value,
      (newValue: string | undefined) => {
         if (newValue) {
            promoCode.value = newValue.toUpperCase();
         }
      }
   );

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
