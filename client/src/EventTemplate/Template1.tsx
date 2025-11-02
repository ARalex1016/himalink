// Components
import CurrencyDisplay from "../Components/CurrencyDisplay";
import { DisplayMap } from "../Components/Map";

// Icons
import LocationIcon from "./../assets/icons/location.svg";
import DateIcon from "./../assets/icons/my-event.svg";
import UsersGroupIcon from "./../assets/icons/user-group.svg";
import AvatarIcon from "./../assets/icons/avatar.svg";
import { IconText, ClockIcons } from "../Components/Icon";

// Utils
import { capitalizeFirstLetter } from "../Utils/StringManager";
import {
  getDayFromISODate,
  formatDate,
  formatHour,
  formatTime,
} from "../Utils/DateManager";

// Type
import type { Event } from "../type";

interface Template1Props extends Event {
  organizerProfile?: string;
  buttonText?: string;
  onCLick?: () => void;
}

const Template1 = ({
  title,
  description,
  coverImageURL,
  organizerProfile,
  category,
  date_Time,
  seatsAvailable,
  capacity,
  ticket,
  location,
  buttonText = "Book Now",
  onCLick,
}: Template1Props) => {
  //  Generate preview URL if coverImage is a File
  const previewCoverImage =
    coverImageURL instanceof File
      ? URL.createObjectURL(coverImageURL)
      : typeof coverImageURL === "string"
      ? coverImageURL
      : null;

  return (
    <div className="max-w-[1008px] w-full">
      {/* Image */}
      <div className="w-full relative mb-2">
        {previewCoverImage && (
          <img
            src={previewCoverImage}
            alt={title}
            className="w-full h-40 md:h-80 bg-gray sm:rounded-lg"
          />
        )}

        {/* Organizer Profile */}
        <img
          src={organizerProfile || AvatarIcon}
          alt="Organizer"
          className="w-16 aspect-square bg-gray rounded-full outline-4 outline-primary absolute left-side-spacing bottom-0 translate-y-1/2"
        />
      </div>

      <div className="w-full py-2 flex flex-col gap-y-2 px-side-spacing">
        {category && (
          <div className="w-fit text-white/60 bg-accent/60 self-end leading-none py-[2px] rounded-sm px-2 hover:text-white/80 hover:bg-accent/80">
            {capitalizeFirstLetter(category)}
          </div>
        )}

        <h2 className="text-2xl text-white font-medium line-clamp-1">
          {title}
        </h2>

        <IconText src={DateIcon} alt="Date">
          <span>
            {date_Time?.startAt
              ? `${getDayFromISODate(date_Time.startAt)}, ${formatDate(
                  date_Time.startAt
                )}`
              : "Date not available"}
          </span>
        </IconText>

        <IconText src={UsersGroupIcon} alt="Seats">
          <span className="font-medium">
            {seatsAvailable ? seatsAvailable : capacity}
          </span>{" "}
          out of <span className="font-medium">{capacity}</span> seats available
        </IconText>

        <p className="text-sm text-white/75">{description}</p>

        {ticket?.amount && (
          <CurrencyDisplay amount={ticket?.amount} fromCur={ticket?.currency} />
        )}

        <button
          type="button"
          disabled={onCLick ? false : true}
          onClick={onCLick}
          className="font-medium text-white/75 bg-red-500/75 py-1 rounded-sm hover:text-white hover:bg-red-500"
        >
          {buttonText}
        </button>

        <IconText
          src={ClockIcons[formatHour(date_Time?.startAt)]}
          alt="Start Hour"
        >
          <span>From {formatTime(date_Time?.startAt)}</span>
        </IconText>

        <IconText src={ClockIcons[formatHour(date_Time?.endAt)]} alt="End Hour">
          <span>To {formatTime(date_Time?.endAt)}</span>
        </IconText>

        <IconText src={LocationIcon} alt="Location">
          {location?.address}
        </IconText>

        {location && <DisplayMap markers={[location]} />}
      </div>
    </div>
  );
};

export default Template1;
