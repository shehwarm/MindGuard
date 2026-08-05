function MotivationCard({ streak }) {
  return (
    <div className="bg-gradient-to-r from-[#DCEFD9] to-[#EEF6EA] rounded-3xl p-8 shadow">

      <h2 className="text-2xl font-bold text-[#5E8F63]">
        🔥 Keep Going!
      </h2>

      <p className="text-gray-600 mt-3">
        {streak === 0
          ? "Start your first focus session today!"
          : `You're on a ${streak}-day streak. Don't break it!`}
      </p>

    </div>
  );
}

export default MotivationCard;