import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Layout
import Layout from "../../Layout/Layout";

// Components
import CurrencyDisplay from "../../Components/CurrencyDisplay";
import { DisplayMap } from "../../Components/Map";

// Icons
import LocationIcon from "./../../assets/icons/location.svg";
import DateIcon from "./../../assets/icons/calendars-icons/my-event.svg";
import UsersGroupIcon from "./../../assets/icons/user-group.svg";
import AvatarImg from "./../../assets/icons/avatar.svg";
import { IconText, ClockIcons } from "../../Components/Icon";

// Store
import useEventStore from "../../Store/useEventStore";
import { useUserStore } from "../../Store/useUserStore";

// Utils
import {
  formatDate,
  formatTime,
  formatHour,
  getDayFromISODate,
  toJSDate,
} from "../../Utils/DateManager";
import { capitalizeFirstLetter } from "../../Utils/StringManager";

// Type
import type { Event, User } from "../../type";

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();

  const { getEvent } = useEventStore();
  const { getUserById } = useUserStore();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [organizerDetail, setOrganizerDetail] = useState<User | null>();
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        // setError(null);

        const currentEvent = await getEvent(eventId);
        setEvent(currentEvent);

        if (currentEvent?.organizerId) {
          let organizer = await getUserById(currentEvent?.organizerId);

          setOrganizerDetail(organizer);
        }
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
    <Layout className="text-white flex justify-center !p-0">
      <div className="max-w-[1008px] w-full">
        <div className="w-full relative mb-2">
          <img
            src={event?.coverImageURL}
            alt={event?.title}
            className="w-full h-40 md:h-80 bg-gray sm:rounded-lg"
          />

          {/* Organizer Profile */}
          <img
            src={organizerDetail?.photoURL || AvatarImg}
            alt="Organizer"
            className="w-16 aspect-square bg-gray rounded-lg outline-3 outline-primary absolute left-side-spacing bottom-0 translate-y-1/2"
          />
        </div>

        <div className="w-full py-2 flex flex-col gap-y-2 px-side-spacing">
          {event?.category && (
            <div className="w-fit bg-accent/50 self-end leading-none py-[2px] rounded-sm px-2 hover:bg-accent/75">
              {capitalizeFirstLetter(event?.category)}
            </div>
          )}

          <h2 className="text-2xl font-medium line-clamp-1">{event?.title}</h2>

          <IconText src={DateIcon} alt="Date">
            <span>
              {event?.date_Time?.startAt
                ? `${getDayFromISODate(
                    toJSDate(event.date_Time.startAt)
                  )}, ${formatDate(toJSDate(event.date_Time.startAt))}`
                : "Date not available"}
            </span>
          </IconText>

          <IconText src={UsersGroupIcon} alt="Seats">
            <span className="font-medium">{event?.seatsAvailable}</span> out of{" "}
            <span className="font-medium">{event?.capacity}</span> seats
            available
          </IconText>

          <p className="text-sm">{event?.description}</p>

          {event?.ticket?.amount && (
            <CurrencyDisplay
              amount={event?.ticket?.amount}
              fromCur={event?.ticket?.currency}
            />
          )}

          <button className="font-medium bg-red-500 py-1 rounded-sm">
            Book Now
          </button>

          <IconText
            src={ClockIcons[formatHour(toJSDate(event?.date_Time?.startAt))]}
            alt="Start Hour"
          >
            <span>From {formatTime(toJSDate(event?.date_Time?.startAt))}</span>
          </IconText>

          <IconText
            src={ClockIcons[formatHour(toJSDate(event?.date_Time?.endAt))]}
            alt="End Hour"
          >
            <span>To {formatTime(toJSDate(event?.date_Time?.endAt))}</span>
          </IconText>

          <IconText src={LocationIcon} alt="Location">
            {event?.location?.address}
          </IconText>

          {event?.location && <DisplayMap markers={[event?.location]} />}
        </div>
      </div>
    </Layout>
  );
};

export default EventDetails;
