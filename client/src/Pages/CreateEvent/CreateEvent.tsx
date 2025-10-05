import { useState } from "react";

// Layout
import Layout from "../../Layout/Layout";

// Store
import useEventStore from "../../Store/useEventStore";

// Components
import { Title } from "../../Components/Text";
import { LocationPickerMap } from "../../Components/Map";
import AlertBox from "../../Components/AlertBox";

// Firebase
// import { Timestamp } from "firebase/firestore";

// Type
import type { Location } from "../../type";

interface LocationWithDetails extends Location {
  additionalDetails?: string;
}

const CreateEvent = () => {
  const { createEvent } = useEventStore();

  const [location, setLocation] = useState<LocationWithDetails | null>(null);

  const handleSave = () => {
    if (!location)
      return AlertBox({
        title: "Error",
        text: "Please select a location",
        icon: "error",
        confirmButtonText: "OK",
      });
  };

  return (
    <Layout>
      <Title title="Create Event" />

      <LocationPickerMap onLocationSelect={setLocation} />

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
          className="text-sm border rounded p-2 w-full mt-2 resize-none"
        />
      )}

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Event
      </button>
    </Layout>
  );
};

export default CreateEvent;
