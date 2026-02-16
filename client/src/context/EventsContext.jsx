import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import { useAuth } from "./AuthContext";

const EventContext = createContext(null);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [myRegistrations, setMyRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const { user } = useAuth();

  const resetStates = () => {
    setEvents([]);
    setTotalPages(1);
    setMyRegistrations([]);
    setCategories([]);
    setLocations([]);
  };

  const filterEvents = async (
    { search_q, date, location, category, page },
    isLoadMore = false,
  ) => {
    setLoading(true);
    try {
      let params = new URLSearchParams();

      if (search_q) params.append("search_q", search_q);
      if (date) params.append("date", date);
      if (location) params.append("location", location);
      if (category) params.append("category", category);
      if (page) params.append("page", page);
      else params.append("page", 1);

      const queryString = params.toString();
      const url = queryString ? `/events?${queryString}` : "/events";

      const res = await axios.get(url);

      if (isLoadMore) setEvents((prev) => [...prev, ...res.data.events]);
      else setEvents(res.data.events);

      setTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const registerForEvent = async ({ eventId }) => {
    setLoading(true);
    try {
      const res = await axios.post(`/event-registrations/${eventId}`);
      toast.success(res.data.message || "Registered Successfully");
      setMyRegistrations((prev) => [...prev, res.data.event]);

      setEvents((prev) =>
        prev.map((event) =>
          event._id === eventId
            ? {
                ...event,
                availableSeats: res.data.event.availableSeats,
              }
            : event,
        ),
      );
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getMyRegistrations = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/event-registrations");
      setMyRegistrations(res.data);
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const cancelEvent = async ({ eventId }) => {
    setLoading(true);
    try {
      const res = await axios.delete(`/event-registrations/${eventId}`);
      toast.success(res.data.message);

      setMyRegistrations((prev) =>
        prev.filter((registration) => registration._id !== eventId),
      );

      setEvents((prev) =>
        prev.map((event) =>
          event._id === eventId
            ? { ...event, availableSeats: res.data.event.availableSeats }
            : event,
        ),
      );
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const categorizeEvent = (date) => {
    return new Date(date) < new Date() ? "Past" : "Upcoming";
  };

  const isEventRegistered = (eventId) => {
    return myRegistrations.some((registration) => registration._id === eventId);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      resetStates();
      try {
        const res = await axios.get("/events?page=1");
        const eventsData = res.data.events;
        setEvents(eventsData);
        setTotalPages(res.data.totalPages);

        const uniqueCategories = [
          ...new Set(eventsData.map((event) => event.category)),
        ];
        setCategories(uniqueCategories);

        const uniqueLocations = [
          ...new Set(eventsData.map((event) => event.location)),
        ];
        setLocations(uniqueLocations);
        const token = localStorage.getItem("token");
        if (token) await getMyRegistrations();
      } catch (error) {
        toast.error(error.response.data.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user]);

  return (
    <EventContext.Provider
      value={{
        events,
        totalPages,
        loading,
        categories,
        locations,
        myRegistrations,
        filterEvents,
        categorizeEvent,
        registerForEvent,
        getMyRegistrations,
        cancelEvent,
        isEventRegistered,
      }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
