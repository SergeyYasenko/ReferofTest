export interface FormValues {
   promoCode: string;
   title: string;
   description: string;
   points: number;
   startDate: string | null;
   endDate: string | null;
   activationLimit: number;
   receiveMethod: 0 | 1;
}

export interface PromoCodeModalProps {
   modelValue: boolean;
}

export interface PromoCodeModalEmits {
   (e: "update:modelValue", value: boolean): void;
}
