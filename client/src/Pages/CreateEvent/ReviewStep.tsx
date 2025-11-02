import { useFormContext } from "react-hook-form";

// Components
import { SubTitle } from "../../Components/Text";
import Template1 from "../../EventTemplate/Template1";

// Type
import type { CreateEventType } from "../../Schema/createEventSchema";

// Store
import useAuthStore from "../../Store/useAuthStore";

interface ReviewStepProps {
  title: string;
}

export const ReviewStep = ({ title: StepTitle }: ReviewStepProps) => {
  const { user } = useAuthStore();

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

  return (
    <>
      <SubTitle title={StepTitle} className="!text-center font-medium" />

      <Template1
        title={title}
        coverImageURL={coverImageURL}
        organizerProfile={user?.photoURL}
        description={description}
        capacity={capacity}
        category={category}
        date_Time={date_Time}
        location={location}
        ticket={ticket}
      />

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
