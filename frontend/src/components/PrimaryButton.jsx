function PrimaryButton({ text, loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="
      w-full
      bg-[#7BAE7F]
      hover:bg-[#5E8F63]
      text-white
      py-3
      rounded-xl
      font-semibold
      transition-all
      duration-300
      hover:scale-105
      disabled:opacity-70
      "
    >
      {loading ? "Please wait..." : text}
    </button>
  );
}

export default PrimaryButton;