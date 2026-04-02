import { useEffect, useState } from "react";
import { useEvent } from "../context/EventsContext";
import EventCard from "../components/EventCard";
import { ArrowDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import SkeletonLoader from "../components/SkeletonLoader";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [selectedLocation, setSelectedLocation] = useState(undefined);
  const [selectedTab, setSelectedTab] = useState("All Events");
  const [page, setPage] = useState(1);
  const { loading } = useEvent();

  const { events, totalPages, categories, locations, filterEvents } =
    useEvent();

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    console.log(event.target.value);
  };

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
  };

  const handleFilter = () => {
    filterEvents({
      category: selectedCategory,
      location: selectedLocation,
      page,
    });
  };

  const loadMoreEvents = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    filterEvents(
      {
        category: selectedCategory,
        location: selectedLocation,
        page: nextPage,
      },
      true,
    );
  };

  const tabChange = (e) => {
    setSelectedTab(e.target.value);
  };

  const filteredByTab = events.filter((event) => {
    if (selectedTab === "Past Events") {
      return new Date(event.date) < new Date();
    } else if (selectedTab === "Upcoming Events") {
      return new Date(event.date) >= new Date();
    }
    return true;
  });

  const tabClassName = "text-gray-700";
  const activeTabClassName =
    "text-blue-600 font-bold border-b-2 border-blue-600 pb-1";

  return (
    <div className="min-h-full">
      <div className="flex flex-col sm:flex-row gap-2 justify-end sm:items-end my-6 mt-14 sm:mt-0">
        <div className="flex gap-2 justify-end md:justify-between sm:items-center">
          <select
            value={selectedLocation}
            className="h-10 w-40 px-2 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 overflow-y-auto"
            onChange={handleLocationChange}>
            <option value="">Location</option>
            {locations.map((location, idx) => (
              <option key={idx} value={location}>
                {location}
              </option>
            ))}
          </select>
          <select
            value={selectedCategory}
            className="h-10 w-40 px-2 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 overflow-y-auto"
            onChange={handleCategoryChange}>
            <option value="">Category</option>
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white rounded-md min-w-32 py-1"
          onClick={handleFilter}>
          Apply filter
        </button>
      </div>

      <div className="flex justify-center py-5">
        <div className="flex gap-5 md:gap-10">
          <button
            className={`text-sm sm:text-base ${selectedTab === "All Events" ? activeTabClassName : tabClassName}`}
            type="button"
            value="All Events"
            onClick={tabChange}>
            All Events
          </button>
          <button
            className={`text-sm sm:text-base ${selectedTab === "Past Events" ? activeTabClassName : tabClassName}`}
            type="button"
            value="Past Events"
            onClick={tabChange}>
            Past Events
          </button>
          <button
            className={`text-sm sm:text-base ${selectedTab === "Upcoming Events" ? activeTabClassName : tabClassName}`}
            type="button"
            value="Upcoming Events"
            onClick={tabChange}>
            Upcoming Events
          </button>
        </div>
      </div>

      {!loading ? (
        filteredByTab.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredByTab.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
            {page < totalPages && (
              <div className="flex justify-center items-center animate-bounce duration-200 mt-8">
                <button
                  type="button"
                  className="bg-black/10 border-2 border-gray-300 p-2 rounded-full"
                  onClick={loadMoreEvents}>
                  <ArrowDown />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-10">
            <p className="text-gray-700 text-lg">No Events Found</p>
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
