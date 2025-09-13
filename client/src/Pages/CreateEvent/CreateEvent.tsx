import { useEffect } from "react";

// Layout
import Layout from "../../Layout/Layout";

// Store
import useEventStore from "../../Store/useEventStore";

// Components
import { Title } from "../../Components/Text";

// Type
import type { Event } from "../../type";

const CreateEvent = () => {
  const { createEvent } = useEventStore();

  let event: Event = {
    title: "Tihar",
    image: [
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fntb.gov.np%2Ftihar&psig=AOvVaw2y5RnY8P078VlG7VYkdK4H&ust=1757774355838000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJDf9vO5048DFQAAAAAdAAAAABAE",
    ],
    description: "Tihar is the 2nd main festival of Nepal.",
    category: "cultural",
    date: "2025-10-25",
    location: "Romania, Constanta, Mamaia, Strada D18, No.08",
    ticketAmount: 150,
    capacity: 400,
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
