import spinner from "../../assets/icons/loader.svg";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full absolute top-0 left-0 z-50 bg-black/10">
      <img src={spinner} alt="Loading..." className="animate-spin h-24 w-24" />
    </div>
  );
};
export default LoadingScreen;
