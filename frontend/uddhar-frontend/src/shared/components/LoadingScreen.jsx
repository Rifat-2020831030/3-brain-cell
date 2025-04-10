import spinner from "../../assets/icons/loader.svg";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen absolute bg-black">
      <img src={spinner} alt="Loading..." className="animate-spin h-24 w-24" />
    </div>
  );
};
export default LoadingScreen;
