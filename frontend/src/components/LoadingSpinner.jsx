function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F2]">
      <div className="h-12 w-12 rounded-full border-4 border-[#A8C3A0] border-t-transparent animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;