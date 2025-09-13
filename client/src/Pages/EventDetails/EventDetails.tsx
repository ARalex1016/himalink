import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Layout
import Layout from "../../Layout/Layout";

// Store
import useEventStore from "../../Store/useEventStore";

// Type
import type { Event } from "../../type";

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();

  const { getEvent } = useEventStore();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);

        const currentEvent = await getEvent(eventId);
        setEvent(currentEvent);
      } catch (err: any) {
        setError(err.message || "Failed to fetch event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, getEvent]);

  if (loading) {
    return (
      <Layout>
        <p className="text-white/60">Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout className="text-white">
      <img
        src={event?.image[0]}
        alt={event?.title}
        className="w-full aspect-video bg-gray rounded-sm"
      />

      <h2 className="text-xl font-medium">{event?.title}</h2>

      <p>{event?.location}</p>

      <p>{event?.description}</p>
    </Layout>
  );
};

export default EventDetails;
