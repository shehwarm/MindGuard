import { useAuth } from "../context/AuthContext";

function WelcomeCard() {
  const { user } = useAuth();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <div className="bg-gradient-to-r from-[#A8C3A0] to-[#DDEFD8] rounded-3xl p-8 text-[#334155] shadow-md">

      <h1 className="text-3xl font-bold">
        {greeting}, {user?.name}! 👋
      </h1>

      <p className="mt-3 text-lg">
        Stay focused and make today productive.
      </p>

    </div>
  );
}

export default WelcomeCard;