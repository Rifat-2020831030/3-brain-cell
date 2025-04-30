import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col items-center justify-center m-10 gap-y-5">
        <h1 className="font-extrabold text-4xl">Coming Soon</h1>
        <p>The page is under development. Thanks for your patience</p>
        <button type="button" onClick={()=> navigate(-1)} className="text-blue-400 cursor-pointer">GO back to previous page</button>
      </div>
    </div>
  );
};
export default ComingSoon;
