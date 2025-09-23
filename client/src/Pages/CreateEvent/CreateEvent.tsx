import { useEffect } from "react";

// Layout
import Layout from "../../Layout/Layout";

// Store
import useEventStore from "../../Store/useEventStore";

// Components
import { Title } from "../../Components/Text";

// Firebase
import { Timestamp } from "firebase/firestore";

// Type
import type { Event } from "../../type";

const CreateEvent = () => {
  const { createEvent } = useEventStore();

  let event: Event = {
    title: "Tihar",
    organizerId: "jds",
    coverImageURL:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fntb.gov.np%2Ftihar&psig=AOvVaw2y5RnY8P078VlG7VYkdK4H&ust=1757774355838000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJDf9vO5048DFQAAAAAdAAAAABAE",
    shortDescription: "Tihar is the 2nd main festival of Nepal.",
    category: "cultural",
    date_Time: {
      startAt: Timestamp.fromDate(new Date("2025-10-25T08:00:00.000Z")),
      endAt: Timestamp.fromDate(new Date("2025-10-25T18:30:00.000Z")),
    },
    location: {
      lat: 44.4268,
      lng: 26.1025,
      address: "Romania, Bucharest",
      placeName: "Sector 10",
      googlePlaceId: "63728ndb",
    },
    ticket: {
      amount: 200,
      currency: "RON",
    },
    capacity: 400,
    seatsAvailable: 300,
    status: "published",
  };

  useEffect(() => {
    createEvent(event);
  }, []);

  return (
    <Layout>
      <Title title="Create Event" />
    </Layout>
  );
};

export default CreateEvent;
