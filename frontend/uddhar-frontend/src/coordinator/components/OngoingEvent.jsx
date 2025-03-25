import { MapPin } from "lucide-react";

const OngoingEvent = ({ info, onClickEventHandler, bg}) => {
  return (
    <>
      <div
        className={`min-w-70 h-50 ${bg} flex flex-col gap-y-[10px] text-left p-10 rounded cursor-pointer`}
        onClick={() => {
          onClickEventHandler(info.location);
        }}
      >
        <p className="text-3xl font-bold flex items-center gap-x-3">
          <MapPin />
          {info.location}
        </p>
        <p className="text-[20px]">{info.name}</p>
        <p className="text-lg">{info.date}</p>
      </div>
    </>
  );
};

export default OngoingEvent;
