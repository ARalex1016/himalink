import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Layout
import Layout from "../../Layout/Layout";

// Store
import useEventStore from "../../Store/useEventStore";
import { useFileStore } from "../../Store/useFileStore";

// Components
import { EventInfoStep, eventInfoStepSchema } from "./EventInfoStep";
import { LocationStep, locationStepSchema } from "./LocationStep";
import { DateNTimeStep, dateNTimeStepSchema } from "./DateNTimeStep";
import {
  TicketNCapacityStep,
  ticketNcapacityStepSchema,
} from "./TicketNCapacityStep";
import { ReviewStep } from "./ReviewStep";
import { Title } from "../../Components/Text";
import AlertBox from "../../Components/AlertBox";

// Hooks
import { useMultiStepForm } from "../../Hooks/useMultiStepForm";

// Schema
import {
  createEventSchema,
  type CreateEventType,
} from "../../Schema/createEventSchema";

const CreateEvent = () => {
  const { createEvent } = useEventStore();
  const { uploading, uploadProgress, uploadFile } = useFileStore();

  const methods = useForm<CreateEventType>({
    resolver: zodResolver(createEventSchema) as any,
    mode: "onSubmit",
    shouldUnregister: false, // important for multi-step forms
  });

  const steps = [
    {
      id: "event",
      label: "Event Info",
      component: EventInfoStep,
      schema: eventInfoStepSchema,
    },
    {
      id: "date&time",
      label: "Date & Time",
      component: DateNTimeStep,
      schema: dateNTimeStepSchema,
    },
    {
      id: "location",
      label: "Location Info",
      component: LocationStep,
      schema: locationStepSchema,
    },
    {
      id: "ticket&capacity",
      label: "Ticket & Capacity",
      component: TicketNCapacityStep,
      schema: ticketNcapacityStepSchema,
    },
    {
      id: "review",
      label: "Review",
      component: ReviewStep,
      schema: createEventSchema,
    },
  ];

  const { step, currentStepIndex, isFirstStep, isLastStep, next, back } =
    useMultiStepForm({ steps });

  let CurrentStepComponent = step.component;

  const handleNext = async () => {
    const currentStepFields = Object.keys(
      steps[currentStepIndex].schema.shape
    ) as (keyof CreateEventType)[];

    const isValid = await methods.trigger(currentStepFields);

    if (isValid) next();

    // next();
  };

  const publishEvent = async (data: CreateEventType) => {
    try {
      await createEvent(data);

      AlertBox({
        title: "Your Event has been saved",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);

      AlertBox({
        title: "Something went wrong",
        text: "Try it again!",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const onSubmit = async (data: CreateEventType) => {
    try {
      await uploadFile(data.coverImageURL);
      console.log("Uploaded");

      // publishEvent(data);
    } catch (error) {
      console.log("Error Uploading", error);

      AlertBox({
        title: "Something went wrong",
        text: "Try it again!",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <Layout>
      <Title title="Create Event" />

      {uploading && (
        <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center z-10">
          <p className="text-xl text-white">Uploading Image</p>

          <p className="text-5xl text-white font-medium">{uploadProgress}%</p>
        </div>
      )}

      {/* Steps Display */}
      <div className="flex flex-row justify-end">
        <p className="text-white/60 text-sm">
          Steps{" "}
          <span className="text-white font-bold">
            {currentStepIndex + 1}/{steps.length}
          </span>
        </p>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 shadow-md shadow-white/20 rounded-lg px-4 pt-2 pb-5"
        >
          <CurrentStepComponent title={steps[currentStepIndex].label} />

          {/* Action Button */}
          <div className="flex flex-row justify-end gap-x-2 mt-2">
            {!isFirstStep && (
              <button
                type="button"
                onClick={back}
                className="text-white font-medium bg-blue-600 px-5 py-1 rounded-sm"
              >
                Pre
              </button>
            )}

            {!isLastStep && (
              <button
                type="button"
                onClick={handleNext}
                className="text-white font-medium bg-red-500 px-5 py-1 rounded-sm"
              >
                Next
              </button>
            )}

            {isLastStep && (
              <button
                type="submit"
                className="text-white font-medium bg-red-500 px-5 py-1 rounded-sm"
              >
                Publish
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default CreateEvent;
