import { useNavigate } from "react-router-dom";

// Type
import type { Event } from "../type";

// Components
import { AmountWithCurrency } from "./CurrencyDisplay";

// Icons
import DateIcon from "./../assets/icons/calendars-icons/my-event.svg";
import LocationIcon from "./../assets/icons/location.svg";
import UsersGroupIcon from "./../assets/icons/user-group.svg";
import { IconText } from "./Icon";

// Utils
import {
  formatDate,
  getDayFromISODate,
  toJSDate,
} from "./../Utils/DateManager";
import { capitalizeFirstLetter } from "../Utils/StringManager";
import { getValidImageURL } from "../Utils/FileManager";

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
      className="w-80 text-white flex flex-col bg-secondary rounded-lg relative transition-all duration-300 hover:-translate-y-1"
    >
      {!!getValidImageURL(event?.coverImageURL) && (
        <img
          src={getValidImageURL(event?.coverImageURL)}
          alt={event?.title}
          className="w-full aspect-video bg-gray rounded-t-inherit"
        />
      )}

      <div className="p-4 pt-2 flex flex-col gap-y-2 rounded-inherit">
        <div className="bg-accent/60 w-fit leading-none py-[2px] rounded-lg px-2 opacity-75 hover:bg-accent/30">
          {capitalizeFirstLetter(event?.category)}
        </div>

        <h2 className="text-lg font-medium line-clamp-1">{event?.title}</h2>

        <IconText src={DateIcon} alt="Date">
          <span>
            {event?.date_Time?.startAt
              ? `${getDayFromISODate(
                  toJSDate(event.date_Time.startAt)
                )}, ${formatDate(toJSDate(event.date_Time.startAt))}`
              : "Date not available"}
          </span>
        </IconText>

        {/* <IconText
          src={ClockIcons[formatHour(event?.date_Time?.startAt.toDate())]}
          alt="Start Hour"
        >
          <span>From {formatTime(event?.date_Time?.startAt.toDate())}</span>
        </IconText> */}

        <IconText src={LocationIcon} alt="Location">
          {event?.location?.address}
        </IconText>

        <IconText src={UsersGroupIcon} alt="Seats">
          <span className="font-bold">{event?.seatsAvailable}</span> out of{" "}
          <span className="font-bold">{event?.capacity}</span> seats left
        </IconText>

        <div className="w-full flex flex-row justify-between rounded-inherit">
          <AmountWithCurrency
            amount={event?.ticket?.amount}
            currency={event?.ticket?.currency}
          />

          <button className="text-white/75 text-base font-medium bg-accent/75 rounded-inherit hover:bg-accent hover:text-white transition-all duration-300  px-4 py-[2px]">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
