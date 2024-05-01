export default function HeroSection() {
  return (
    <div className="relative text-cloud overflow-hidden max-h-[600px]">
      <img
        src="/images/banner.png"
        alt="Hero Image"
        className="w-full h-full"
      />
      <div className="absolute inset-x-0 bottom-0 mb-10 flex justify-center">
        <div className="inline-flex shadow-lg">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 w-64 border-2 text-black border-gray-300 rounded-l-md focus:outline-none focus:border-salmon"
          />
          <button className="px-4 py-2 bg-tigerlily text- rounded-r-md">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
