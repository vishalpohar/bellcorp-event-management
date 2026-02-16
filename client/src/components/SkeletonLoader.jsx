const SkeletonLoader = () => {
  return (
    <div className="border shadow rounded-md w-full mx-auto">
      <div className="flex">
        <div className="flex-1 space-y-6">
          <div className="h-10 shimmer rounded"></div>
          <div className="flex flex-col space-y-3 px-4 pb-4">
            <div className="h-4 w-2/4 shimmer rounded"></div>
            <div className="h-4 w-3/4 shimmer rounded"></div>
            <div className="h-4 shimmer rounded"></div>
            <div className="flex justify-between">
              <div className="h-4 w-[200px] shimmer rounded"></div>
              <div className="h-4 w-[200px] shimmer rounded"></div>
            </div>
            <div className="h-4 w-[100px] shimmer rounded"></div>
            <div className="h-4 w-[120px] shimmer rounded"></div>
            <div className="h-8 shimmer rounded mx-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
