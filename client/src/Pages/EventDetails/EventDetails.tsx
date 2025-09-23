import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Layout
import Layout from "../../Layout/Layout";

// Icons
import LocationIcon from "./../../assets/icons/location.svg";
import DateIcon from "./../../assets/icons/my-event.svg";
import UsersGroupIcon from "./../../assets/icons/user-group.svg";
import { IconText, ClockIcons } from "../../Components/Icon";

// Store
import useEventStore from "../../Store/useEventStore";

// Utils
import { formatDate, formatTime, formatHour } from "../../Utils/DateManager";

// Type
import type { Event } from "../../type";

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();

  const { getEvent } = useEventStore();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        // setError(null);

        const currentEvent = await getEvent(eventId);
        setEvent(currentEvent);
      } catch (err: any) {
        // setError(err.message || "Failed to fetch event");
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
        src={event?.coverImageURL}
        alt={event?.title}
        className="w-full aspect-video bg-gray rounded-sm"
      />

      <div className="py-2 flex flex-col gap-y-2">
        <h2 className="text-lg font-medium line-clamp-1">{event?.title}</h2>

        <IconText src={DateIcon} alt="Date">
          <span>{formatDate(event?.date_Time?.startAt.toDate())}</span>
        </IconText>

        <IconText
          src={ClockIcons[formatHour(event?.date_Time?.startAt.toDate())]}
          alt="Start Hour"
        >
          <span>From {formatTime(event?.date_Time?.startAt.toDate())}</span>
        </IconText>

        <IconText
          src={ClockIcons[formatHour(event?.date_Time?.endAt.toDate())]}
          alt="End Hour"
        >
          <span>To {formatTime(event?.date_Time?.endAt.toDate())}</span>
        </IconText>

        <IconText src={LocationIcon} alt="Location">
          {event?.location?.address}
        </IconText>

        <IconText src={UsersGroupIcon} alt="Seats">
          <span className="font-bold">{event?.seatsAvailable}</span> out of{" "}
          <span className="font-bold">{event?.capacity}</span> seats left
        </IconText>

        <div className="flex flex-row justify-around">
          <p className="text-accent/75 text-xl font-medium">
            {event?.ticket?.amount}
            {event?.ticket?.currency}
          </p>

          <p className="font-bold">=</p>

          <p className="text-accent/75 text-xl font-medium">
            {event?.ticket?.amount}
            {event?.ticket?.currency}
          </p>
        </div>

        <button className="text-white/75 text-lg bg-accent/75 rounded-lg px-4 hover:bg-accent hover:text-white transition-all duration-300 py-[2px]">
          View Details
        </button>
      </div>

      <p className="text-sms">{event?.shortDescription}</p>
    </Layout>
  );
};

export default EventDetails;
