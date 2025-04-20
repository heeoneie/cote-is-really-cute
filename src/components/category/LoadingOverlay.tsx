const LoadingOverlay = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
  </div>
);

export default LoadingOverlay;
