import { useNavigate } from "react-router-dom";

// Type
import type { Event } from "../type";

// Components
import { BaseIcon } from "./Icon";

// Icons
import DateIcon from "./../assets/icons/my-event.svg";
import LocationIcon from "./../assets/icons/location.svg";
import UsersGroupIcon from "./../assets/icons/user-group.svg";

// Utils
import { formatDate, formatTime } from "./../Utils/DateManager";

interface EventProps {
  event: Event;
}

interface IconTextProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

const IconText = ({ src, alt, children }: IconTextProps) => {
  return (
    <div className="flex flex-row items-center gap-x-2">
      <BaseIcon src={src} alt={alt} />

      <p className="text-white/75 text-base line-clamp-1">{children}</p>
    </div>
  );
};

const EventCard = ({ event }: EventProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        event?.id && navigate(event?.id);
      }}
      className="w-80 text-white flex flex-col bg-black rounded-lg relative"
    >
      <div className="bg-accent/80 leading-none py-[2px] rounded-lg px-2 absolute top-2 right-2">
        {event.category}
      </div>

      <img
        src={event.image[0]}
        alt={event.title}
        className="w-full aspect-video bg-gray rounded-t-inherit"
      />

      <div className="p-4 pt-2 flex flex-col gap-y-2 rounded-inherit">
        <h2 className="text-lg font-medium line-clamp-1">{event.title}</h2>

        <IconText src={DateIcon} alt="Date">
          <span>{formatDate(event.date)}</span> at{" "}
          <span>{formatTime(event.date)}</span>
        </IconText>

        <IconText src={LocationIcon} alt="Location">
          {event.location}
        </IconText>

        <IconText src={UsersGroupIcon} alt="Seats">
          100 out of {event.capacity} seats left
        </IconText>

        <div className="flex flex-row justify-between rounded-inherit mt-1">
          <p className="text-accent/75 text-xl font-medium">
            ${event.ticketAmount}
          </p>

          <button className="text-white/75 bg-accent/75 rounded-inherit px-4 hover:bg-accent hover:text-white transition-all duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
