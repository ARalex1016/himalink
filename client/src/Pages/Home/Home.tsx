import { useEffect } from "react";

// Components
import EventCard from "../../Components/Event";

// Layout
import Layout from "../../Layout/Layout";

// Store
import useEventStore from "../../Store/useEventStore";

// Components
import { Title } from "../../Components/Text";

const Home = () => {
  const { events, getEvents } = useEventStore();

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Layout>
      <Title title="Upcoming Events" />

      <div className="w-full flex flex-row flex-wrap gap-4 justify-around">
        {events.map((event, index) => {
          return <EventCard key={index} event={event} />;
        })}
      </div>
    </Layout>
  );
};

export default Home;
