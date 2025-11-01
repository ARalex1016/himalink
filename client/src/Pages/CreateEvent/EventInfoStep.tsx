import { useFormContext } from "react-hook-form";
import { z } from "zod"; //

// Components
import { SubTitle, ErrorMessage } from "../../Components/Text";
import { InputFieldWrapper, InputField } from "../../Components/Input";

// Schema
import { createEventSchema } from "../../Schema/createEventSchema";

// Data
import categories from "../../Data/category.json";

// Utils
import { capitalizeFirstLetter } from "../../Utils/StringManager";

interface EventInfoStepProps {
  title: string;
}

// ✅ Infer only the fields we need
export const eventInfoStepSchema = createEventSchema.pick({
  title: true,
  description: true,
  category: true,
  coverImageURL: true,
});

type EventInfoStepSchema = z.infer<typeof eventInfoStepSchema>;

export const EventInfoStep = ({ title }: EventInfoStepProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<EventInfoStepSchema>();

  // // Watch the coverImageURL field
  const coverImage = watch("coverImageURL");

  //  Generate preview URL if coverImage is a File
  const previewCoverImage =
    coverImage instanceof File
      ? URL.createObjectURL(coverImage)
      : typeof coverImage === "string"
      ? coverImage
      : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setValue("coverImageURL", selectedFile, { shouldValidate: true });
  };

  return (
    <>
      <SubTitle title={title} className="!text-center font-medium" />

      {/* Image Uploader & Preview */}
      <InputFieldWrapper>
        <div className="w-full h-36 rounded-md border border-white/75 relative overflow-hidden">
          <input
            type="file"
            id="uploader"
            accept="image/*"
            onChange={handleFileChange}
            className="text-white/60 w-full h-full px-2 absolute z-10"
          />

          {previewCoverImage && (
            <img
              src={previewCoverImage}
              alt="Preview"
              className="absolute inset-0 rounded-inherit"
            />
          )}
        </div>

        <ErrorMessage message={errors?.coverImageURL?.message || null} />
      </InputFieldWrapper>

      {/* Title */}
      <InputFieldWrapper>
        <InputField
          placeholder="Title"
          {...register("title")}
          className="w-full"
        />

        <ErrorMessage message={errors?.title?.message || null} />
      </InputFieldWrapper>

      {/* Description */}
      <InputFieldWrapper>
        <textarea
          rows={4}
          placeholder="Description"
          {...register("description")}
          className="w-full bg-transparent border border-white/25 rounded-md px-4 py-2 text-white/75 focus:outline-none focus:border-white"
        ></textarea>

        <ErrorMessage message={errors?.description?.message || null} />
      </InputFieldWrapper>

      {/* Category Select */}
      <InputFieldWrapper>
        <select
          {...register("category")}
          defaultValue=""
          className="w-full bg-transparent text-white/75 px-4 py-2 border border-white/25 rounded-md focus:outline-none focus:border-white"
        >
          {/* Placeholder */}
          <option value="" disabled hidden>
            Select category
          </option>

          {categories.map((category: string) => (
            <option
              key={category}
              value={category}
              className="text-white bg-gray-800"
            >
              {capitalizeFirstLetter(category)}
            </option>
          ))}
        </select>

        <ErrorMessage message={errors?.category?.message || null} />
      </InputFieldWrapper>
    </>
  );
};
