import { useFormContext } from "react-hook-form";

// Components
import { SubTitle } from "../../Components/Text";
import Template1 from "../../EventTemplate/Template1";

// Type
import type { CreateEventType } from "../../Schema/createEventSchema";

interface ReviewStepProps {
  title: string;
}

export const ReviewStep = ({ title: StepTitle }: ReviewStepProps) => {
  const { watch } = useFormContext<CreateEventType>();

  const {
    coverImageURL,
    title,
    description,
    capacity,
    category,
    date_Time,
    location,
    ticket,
  } = watch();

  //  Generate preview URL if coverImage is a File
  const previewCoverImage =
    coverImageURL instanceof File
      ? URL.createObjectURL(coverImageURL)
      : typeof coverImageURL === "string"
      ? coverImageURL
      : null;

  return (
    <>
      <SubTitle title={StepTitle} className="!text-center font-medium" />

      {previewCoverImage && (
        <Template1
          title={title}
          coverImageURL={previewCoverImage}
          shortDescription={description}
          capacity={capacity}
          category={category}
          date_Time={date_Time}
          location={location}
          ticket={ticket}
        />
      )}

      {/* {previewCoverImage && (
        <img
          src={previewCoverImage}
          alt="Cover Image"
          className="w-full aspect-video rounded-md"
        />
      )} */}

      {/* <h2 className="text-white text-2xl font-medium line-clamp-1">{title}</h2> */}
    </>
  );
};
