function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8F0E4]">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-[#334155]">
            {value}
          </h2>

        </div>

        <div className="text-[#7BAE7F]">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;