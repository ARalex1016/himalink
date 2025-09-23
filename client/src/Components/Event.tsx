import { useNavigate } from "react-router-dom";

// Type
import type { Event } from "../type";

// Components
import { ClockIcons } from "./Icon";
import CurrencyDisplay from "./CurrencyDisplay";

// Icons
import DateIcon from "./../assets/icons/my-event.svg";
import LocationIcon from "./../assets/icons/location.svg";
import UsersGroupIcon from "./../assets/icons/user-group.svg";
import { IconText } from "./Icon";

// Utils
import { formatDate, formatTime, formatHour } from "./../Utils/DateManager";
import { capitalizeFirstLetter } from "../Utils/StringManager";

interface EventProps {
  event: Event;
}

const EventCard = ({ event }: EventProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        event?.id && navigate(event?.id);
      }}
      className="w-80 text-white flex flex-col bg-black rounded-lg relative transition-all duration-300 hover:-translate-y-1"
    >
      <div className="bg-accent leading-none py-[2px] rounded-lg px-2 absolute top-2 right-2 opacity-75 hover:bg-black">
        {capitalizeFirstLetter(event?.category)}
      </div>

      <img
        src={event?.coverImageURL}
        alt={event?.title}
        className="w-full aspect-video bg-gray rounded-t-inherit"
      />

      <div className="p-4 pt-2 flex flex-col gap-y-2 rounded-inherit">
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

        <IconText src={LocationIcon} alt="Location">
          {event?.location?.address}
        </IconText>

        <IconText src={UsersGroupIcon} alt="Seats">
          <span className="font-bold">{event?.seatsAvailable}</span> out of{" "}
          <span className="font-bold">{event?.capacity}</span> seats left
        </IconText>

        <CurrencyDisplay
          amount={event?.ticket?.amount}
          fromCur={event?.ticket?.currency}
          toCur="USD"
        />

        <button className="text-white/75 text-lg bg-accent/75 rounded-inherit px-4 hover:bg-accent hover:text-white transition-all duration-300 py-[2px]">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
