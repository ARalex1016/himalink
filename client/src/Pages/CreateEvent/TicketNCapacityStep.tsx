import { z } from "zod";
import { useFormContext } from "react-hook-form";

// Schema
import { createEventSchema } from "../../Schema/createEventSchema";

// Components
import { SubTitle, ErrorMessage } from "../../Components/Text";
import {
  InputFieldWrapper,
  InputField,
  SelectField,
} from "../../Components/Input";

// Data
import currencies from "../../Data/currency.json";

interface TicketNCapacityStepProps {
  title: string;
}

export const ticketNcapacityStepSchema = createEventSchema.pick({
  capacity: true,
  ticket: true,
});

type TicketNCapacityStepSchema = z.infer<typeof ticketNcapacityStepSchema>;

export const TicketNCapacityStep = ({ title }: TicketNCapacityStepProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TicketNCapacityStepSchema>();

  return (
    <>
      <SubTitle title={title} className="!text-center font-medium" />

      {/* Capacity */}
      <InputFieldWrapper>
        <InputField
          type="number"
          placeholder="Capacity"
          {...register("capacity", { valueAsNumber: true })}
          className="w-full"
        />

        <ErrorMessage message={errors.capacity?.message || null} />
      </InputFieldWrapper>

      {/* Ticket Amount & Capacity */}
      <InputFieldWrapper>
        <div className="flex flex-row">
          <InputField
            type="number"
            placeholder="Ticket Amount"
            {...register("ticket.amount", { valueAsNumber: true })}
            className="w-full rounded-r-none"
          />

          <SelectField
            options={currencies}
            placeholder="Currency"
            {...register("ticket.currency")}
          />
        </div>

        <ErrorMessage
          message={
            errors.ticket?.amount?.message ||
            errors.ticket?.currency?.message ||
            null
          }
        />
      </InputFieldWrapper>
    </>
  );
};
