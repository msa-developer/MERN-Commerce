import { Loader } from "lucide-react";

const LoadingScroll = () => {
  return (
    <Loader className="animate-spin w-10 h-10 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-info" />
  );
};

export default LoadingScroll;
