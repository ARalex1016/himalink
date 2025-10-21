import { useState } from "react";

// Layout
import Layout from "../../Layout/Layout";

// Store
// import useEventStore from "../../Store/useEventStore";

// Components
import { Title } from "../../Components/Text";
import { LocationPickerMap } from "../../Components/Map";
import AlertBox from "../../Components/AlertBox";

// Firebase
// import { Timestamp } from "firebase/firestore";

// Hooks
import { useMultiStepForm } from "../../Hooks/useMultiStepForm";

// Type
import type { Location } from "../../type";

interface LocationWithDetails extends Location {
  additionalDetails?: string;
}

// Location Step Component
interface LocationStepProps {
  location: LocationWithDetails | null;
  setLocation: React.Dispatch<React.SetStateAction<LocationWithDetails | null>>;
}

const LocationStep = ({ location, setLocation }: LocationStepProps) => {
  return (
    <>
      <h2 className="text-white text-lg font-medium mb-2">Location Info</h2>

      <LocationPickerMap onLocationSelect={setLocation}>
        {location?.address && location?.lat && location?.lng && (
          <textarea
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
          />
        )}
      </LocationPickerMap>
    </>
  );
};

const CreateEvent = () => {
  // const { createEvent } = useEventStore();

  const [location, setLocation] = useState<LocationWithDetails | null>(null);

  const steps = [
    <LocationStep location={location} setLocation={setLocation} />,
  ];

  const { step, currentStepIndex, isFirstStep, isLastStep, next, back } =
    useMultiStepForm({ steps });

  return (
    <Layout>
      <Title title="Create Event" />

      {step}

      <div className="flex flex-row justify-between mt-5">
        {isFirstStep ? (
          <div></div>
        ) : (
          <button
            onClick={back}
            className="text-white font-medium bg-blue-600 px-5 py-1 rounded-sm"
          >
            Pre
          </button>
        )}

        <button
          onClick={next}
          className="text-white font-medium bg-red-500 px-5 py-1 rounded-sm"
        >
          Next
        </button>
      </div>
    </Layout>
  );
};

export default CreateEvent;
