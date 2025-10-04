import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Layout
import Layout from "../../Layout/Layout";

// Components
import { BackButton } from "../../Components/Button";
import CurrencyDisplay from "../../Components/CurrencyDisplay";

// Icons
import LocationIcon from "./../../assets/icons/location.svg";
import DateIcon from "./../../assets/icons/my-event.svg";
import UsersGroupIcon from "./../../assets/icons/user-group.svg";
import { IconText, ClockIcons } from "../../Components/Icon";

// Store
import useEventStore from "../../Store/useEventStore";

// Utils
import {
  formatDate,
  formatTime,
  formatHour,
  getDayFromISODate,
} from "../../Utils/DateManager";
import { capitalizeFirstLetter } from "../../Utils/StringManager";

// Type
import type { Event } from "../../type";

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();

  const { getEvent } = useEventStore();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  console.log(event);

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
    <Layout className="text-white mt-6">
      <BackButton />

      {event?.category && (
        <div className="bg-accent/75 leading-none py-[2px] rounded-sm px-2 absolute right-side-spacing hover:bg-black">
          {capitalizeFirstLetter(event?.category)}
        </div>
      )}

      <img
        src={event?.coverImageURL}
        alt={event?.title}
        className="w-full aspect-video bg-gray rounded-sm"
      />

      <div className="py-2 flex flex-col gap-y-2">
        <IconText src={DateIcon} alt="Date">
          <span>
            {event?.date_Time?.startAt
              ? `${getDayFromISODate(
                  event.date_Time.startAt.toDate()
                )}, ${formatDate(event.date_Time.startAt.toDate())}`
              : "Date not available"}
          </span>
        </IconText>

        <h2 className="text-lg font-medium line-clamp-1">{event?.title}</h2>

        <IconText src={LocationIcon} alt="Location">
          {event?.location?.address}
        </IconText>

        <IconText src={UsersGroupIcon} alt="Seats">
          <span className="font-bold">{event?.seatsAvailable}</span> out of{" "}
          <span className="font-bold">{event?.capacity}</span> seats left
        </IconText>

        <p className="text-sms">{event?.shortDescription}</p>

        {event?.ticket?.amount && (
          <CurrencyDisplay
            amount={event?.ticket?.amount}
            fromCur={event?.ticket?.currency}
          />
        )}

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
      </div>
    </Layout>
  );
};

export default EventDetails;
