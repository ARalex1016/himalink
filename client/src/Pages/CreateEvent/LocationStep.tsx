import { useFormContext } from "react-hook-form";
import { z } from "zod";

// Type
// import type { Location } from "../../type";

// Components
import { LocationPickerMap } from "../../Components/Map";
import { SubTitle, ErrorMessage } from "../../Components/Text";

// Schema
import { createEventSchema } from "../../Schema/createEventSchema";

interface LocationStepProps {
  title: string;
}

// interface LocationWithDetails extends Location {
//   additionalDetails?: string;
// }

// ✅ Infer only the fields we need
export const locationStepSchema = createEventSchema.pick({
  location: true,
});

export type LocationInfoStepSchema = z.infer<typeof locationStepSchema>;

export const LocationStep = ({ title }: LocationStepProps) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<LocationInfoStepSchema>();

  return (
    <>
      <SubTitle title={title} className="!text-center font-medium" />

      <LocationPickerMap setValue={setValue} fieldName="location">
        {/* <textarea
          value={location?.additionalDetails || ""}
          onChange={(e) =>
            setLocation(
              (pre) =>
                ({
                  ...pre,
                  additionalDetails: e.target.value,
                } as LocationWithDetails)
            )
          }
          placeholder="Apartment, floor, building, or landmark (optional)"
          rows={3}
          className="text-sm text-white border-2 border-white rounded p-2 w-full mt-2 resize-none"
        /> */}
      </LocationPickerMap>

      {errors.location && (
        <ErrorMessage
          message={errors.location.message || null}
          className="text-red-400 text-sm"
        ></ErrorMessage>
      )}
    </>
  );
};
