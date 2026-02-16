import { MapPin, Users, Calendar, Clock, User, Tag } from "lucide-react";
import formatDate from "../utils/formatDate";
import { useEvent } from "../context/EventsContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const {
    _id: eventId,
    name,
    organizer,
    category,
    date,
    location,
    description,
    capacity,
    availableSeats,
  } = event;
  const { formattedDate, time } = formatDate(date);
  const {
    loading,
    categorizeEvent,
    registerForEvent,
    isEventRegistered,
    cancelEvent,
  } = useEvent();
  const { user } = useAuth();
  const navigate = useNavigate();
  const categorizedEvent = categorizeEvent(date);
  const isRegistered = isEventRegistered(eventId);
  const isPast = categorizedEvent === "Past";

  const handleRegistration = () => {
    if (!user) return navigate("/login");
    registerForEvent({ eventId });
  };

  const handleCancellation = () => {
    cancelEvent({ eventId });
  };

  const buttonState = (() => {
    if (isPast)
      return {
        text: "Event Ended",
        disabled: true,
        action: null,
        btnClassName:
          "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200",
      };

    if (loading)
      return {
        text: "Processing...",
        disabled: true,
        action: null,
        btnClassName:
          "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200",
      };

    if (isRegistered)
      return {
        text: "Cancel Event",
        disabled: false,
        action: handleCancellation,
        btnClassName:
          "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm hover:shadow",
      };

    if (availableSeats <= 0)
      return {
        text: "Event is Full",
        disabled: true,
        action: null,
        btnClassName:
          "bg-orange-100 text-orange-400 cursor-not-allowed border border-gray-200",
      };

    return {
      text: "Register for Event",
      disabled: false,
      action: handleRegistration,
      btnClassName:
        "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow",
    };
  })();

  return (
    <div className="flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="px-4 py-2.5 border-b bg-gray-100 text-gray-800 border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Tag size={14} className="opacity-70" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              {category}
            </span>
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isPast ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
            }`}>
            <span
              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                isPast ? "bg-red-500" : "bg-green-500"
              }`}></span>
            {categorizedEvent}
          </span>
        </div>
      </div>

      <div className="flex flex-col h-full p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>

        <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-3">
          <User size={14} className="flex-shrink-0" />
          <span className="truncate">Organized by {organizer}</span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-start gap-2">
            <Calendar
              size={16}
              className="text-gray-400 flex-shrink-0 mt-0.5"
            />
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm font-medium text-gray-900">
                {formattedDate}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500">Time</p>
              <p className="text-sm font-medium text-gray-900">{time}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 col-span-2">
            <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-medium text-gray-900">{location}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-gray-400" />
            <span className="text-gray-600">Capacity: {capacity}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-600">
              Available Seats {availableSeats}
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={buttonState.disabled}
          className={`mt-auto w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
            buttonState.btnClassName
          }`}
          onClick={buttonState.action}>
          {buttonState.text}
        </button>

        {isPast && (
          <p className="text-xs text-center text-gray-400 mt-2">
            This event has already taken place
          </p>
        )}
      </div>
    </div>
  );
};

export default EventCard;
