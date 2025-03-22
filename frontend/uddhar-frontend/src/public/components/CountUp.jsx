import StatNumber from "./StatNumber";
import {stats as data} from "../data/Data"; 

export const CountUp = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 md:py-24">
      <p className="mb-8 text-center text-black font-extrabold text-5xl max-sm:text-xl md:mb-16">
        Our Plateform in Numbers
      </p>

      <div className="flex flex-col items-center justify-center sm:flex-row">
        {data.map((stat) => (
            <StatNumber key={stat.id} number={stat.number} subheading={stat.subheading} />
        ))}
      </div>
    </div>
  );
};


