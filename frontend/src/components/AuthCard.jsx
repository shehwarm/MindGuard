function AuthCard({ children }) {
  return (
    <div
      className="
      w-full
      max-w-md
      bg-white
      rounded-3xl
      shadow-lg
      border
      border-[#E8F0E4]
      p-8
      "
    >
      {children}
    </div>
  );
}

export default AuthCard;