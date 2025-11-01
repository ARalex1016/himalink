import { z } from "zod";
import { useFormContext } from "react-hook-form";

// Schema
import { createEventSchema } from "../../Schema/createEventSchema";

// Components
import { SubTitle, ErrorMessage } from "../../Components/Text";
import { InputField, InputFieldWrapper } from "../../Components/Input";

interface DateNTimeStepProps {
  title: string;
}

export const dateNTimeStepSchema = createEventSchema.pick({
  date_Time: true,
});

type dateNTimeStepSchema = z.infer<typeof dateNTimeStepSchema>;

export const DateNTimeStep = ({ title }: DateNTimeStepProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<dateNTimeStepSchema>();

  return (
    <>
      <SubTitle title={title} className="!text-center font-medium" />

      <InputFieldWrapper>
        <label className="text-white/60">
          Start At
          <InputField
            type="datetime-local"
            {...register("date_Time.startAt")}
            className="w-full"
          />
        </label>

        <ErrorMessage message={errors.date_Time?.startAt?.message || null} />
      </InputFieldWrapper>

      <InputFieldWrapper>
        <label className="text-white/60">
          End At
          <InputField
            type="datetime-local"
            {...register("date_Time.endAt")}
            className="w-full"
          />
        </label>

        <ErrorMessage message={errors.date_Time?.endAt?.message || null} />
      </InputFieldWrapper>
    </>
  );
};
