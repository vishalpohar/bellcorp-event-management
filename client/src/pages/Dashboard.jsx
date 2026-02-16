import { useEffect } from "react";
import { useEvent } from "../context/EventsContext";

const Dashboard = () => {
  const {
    myRegistrations,
    getMyRegistrations,
    categorizeEvent,
    cancelEvent,
    loading,
  } = useEvent();

  useEffect(() => {
    getMyRegistrations();
  }, []);

  const upcomingEvents = myRegistrations.filter(
    (event) => categorizeEvent(event.date) === "Upcoming",
  );

  const pastEvents = myRegistrations.filter(
    (event) => categorizeEvent(event.date) === "Past",
  );

  return (
    <div className="min-h-screen px-6 mt-14 sm:mt-4 my-6">
      <h1 className="text-gray-700 text-2xl mb-8">My Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Total Registered</h2>
          <p className="text-2xl font-bold mt-2">{myRegistrations.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Upcoming Events</h2>
          <p className="text-2xl font-bold mt-2 text-green-600">
            {upcomingEvents.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Past Events</h2>
          <p className="text-2xl font-bold mt-2 text-red-600">
            {pastEvents.length}
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-gray-700 text-xl mb-4">Upcoming Events</h2>

        {upcomingEvents.length === 0 ? (
          <p className="text-gray-500">No upcoming events.</p>
        ) : (
          <div className="flex gap-6 overflow-x-auto">
            {upcomingEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white p-6 rounded-xl shadow min-w-[300px]">
                <h3 className="font-semibold text-lg">{event.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(event.date).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">{event.location}</p>
                <p className="text-sm text-gray-600 mb-3">
                  Organizer: {event.organizer}
                </p>

                <button
                  onClick={() => cancelEvent({ eventId: event._id })}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600">
                  Cancel Registration
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-gray-700 text-xl mb-4">Past Events</h2>

        {pastEvents.length === 0 ? (
          <p className="text-gray-500">No past events.</p>
        ) : (
          <div className="flex gap-6 overflow-x-auto">
            {pastEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white p-6 rounded-xl shadow opacity-80 min-w-[300px]">
                <h3 className="font-semibold text-lg">{event.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(event.date).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">{event.location}</p>
                <p className="text-sm text-gray-600">
                  Organizer: {event.organizer}
                </p>
                <p className="mt-3 text-green-600 font-medium">✔ Completed</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {loading && <div className="mt-6 text-gray-500">Loading...</div>}
    </div>
  );
};

export default Dashboard;
