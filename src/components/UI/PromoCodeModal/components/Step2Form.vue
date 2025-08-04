<script setup lang="ts">
import { Field } from "vee-validate";
import "@/components/UI/PromoCodeModal/PromoCodeModal.scss";
import type { FieldMeta } from "vee-validate";

interface ReceiveMethodOption {
   value: 0 | 1;
   label: string;
}

interface Props {
   startDate: string | null;
   startDateAttrs: FieldMeta<string | null>;
   endDate: string | null;
   endDateAttrs: FieldMeta<string | null>;
   activationLimit: number;
   activationLimitAttrs: FieldMeta<number>;
   receiveMethod: 0 | 1;
   receiveMethodAttrs: FieldMeta<0 | 1>;
   errors: Record<string, string>;
   noEndDate: boolean;
}

withDefaults(defineProps<Props>(), {
   startDate: null,
   endDate: null,
   activationLimit: 0,
   receiveMethod: 0,
   errors: () => ({}),
   noEndDate: false,
});

const emit = defineEmits<{
   (e: "update:startDate", value: string): void;
   (e: "update:endDate", value: string | null): void;
   (e: "update:activationLimit", value: number): void;
   (e: "update:receiveMethod", value: 0 | 1): void;
   (e: "update:noEndDate", value: boolean): void;
   (e: "submit"): void;
   (e: "back"): void;
}>();

const receiveMethods: ReceiveMethodOption[] = [
   { value: 0, label: "Создать промокод без отправки" },
   { value: 1, label: "Отправить промокод всем пользователям" },
];
</script>

<template>
   <form @submit.prevent="$emit('submit')" class="PromoCodeModal__form">
      <div class="PromoCodeModal__form-group">
         <div class="PromoCodeModal__form-item">
            <div class="PromoCodeModal__form-item-title">
               Срок действия промокода<span>*</span>
            </div>
            <div class="PromoCodeModal__date-fields">
               <div class="PromoCodeModal__date-field">
                  <label>Дата начала</label>
                  <Field
                     v-bind="startDateAttrs"
                     name="startDate"
                     type="datetime-local"
                     :value="startDate"
                     @update:modelValue="(val) => emit('update:startDate', val)"
                     class="PromoCodeModal__form-input"
                     :class="{ error: errors.startDate }"
                  />
                  <span
                     v-if="errors.startDate"
                     class="PromoCodeModal__error-message"
                  >
                     {{ errors.startDate }}
                  </span>
               </div>

               <div class="PromoCodeModal__checkbox-field-group">
                  <div class="PromoCodeModal__date-field" v-if="!noEndDate">
                     <label>Дата конца</label>
                     <Field
                        v-if="!noEndDate"
                        v-bind="endDateAttrs"
                        name="endDate"
                        type="datetime-local"
                        :value="endDate"
                        @update:modelValue="
                           (val) => emit('update:endDate', val)
                        "
                        class="PromoCodeModal__form-input"
                        :class="{ error: errors.endDate }"
                        :min="startDate || undefined"
                     />
                     <span
                        v-if="errors.endDate"
                        class="PromoCodeModal__error-message"
                     >
                        {{ errors.endDate }}
                     </span>
                  </div>
               </div>
            </div>

            <div class="PromoCodeModal__checkbox-field">
               <input
                  type="checkbox"
                  id="noEndDate"
                  :checked="noEndDate"
                  @change="
                     $emit(
                        'update:noEndDate',
                        ($event.target as HTMLInputElement).checked
                     )
                  "
               />
               <label for="noEndDate">Без даты конца</label>
            </div>
         </div>

         <div class="PromoCodeModal__form-item">
            <div class="PromoCodeModal__form-item-title">
               Введите лимит активаций (шт.)<span>*</span>
            </div>
            <Field
               v-bind="activationLimitAttrs"
               name="activationLimit"
               type="number"
               min="1"
               :value="activationLimit"
               @update:modelValue="(val) => emit('update:activationLimit', val)"
               placeholder="Введите лимит"
               class="PromoCodeModal__form-input"
               :class="{ error: errors.activationLimit }"
            />
            <span
               v-if="errors.activationLimit"
               class="PromoCodeModal__error-message"
            >
               {{ errors.activationLimit }}
            </span>
         </div>

         <div class="PromoCodeModal__form-item">
            <div
               class="PromoCodeModal__form-item-title PromoCodeModal__form-item-title--radio"
            >
               Настроить получение промокода
            </div>
            <div class="PromoCodeModal__radio-group">
               <div
                  v-for="method in receiveMethods"
                  :key="method.value"
                  class="PromoCodeModal__radio-option"
               >
                  <Field
                     v-bind="receiveMethodAttrs"
                     name="receiveMethod"
                     type="radio"
                     :value="method.value"
                     :checked="receiveMethod === method.value"
                     @update:modelValue="(val) => emit('update:receiveMethod', Number(val) as 0 | 1)"
                     class="PromoCodeModal__radio-input"
                  />
                  <label
                     :for="`receiveMethod-${method.value}`"
                     class="PromoCodeModal__radio-label"
                  >
                     {{ method.label }}
                  </label>
               </div>
            </div>
         </div>
      </div>
      <div class="PromoCodeModal__form-actions">
         <slot name="actions">
            <button
               type="button"
               class="PromoCodeModal__submit-button PromoCodeModal__submit-button--back"
               @click="$emit('back')"
            >
               Назад
            </button>
            <button type="submit" class="PromoCodeModal__submit-button">
               Применить
            </button>
         </slot>
      </div>
   </form>
</template>
