import { HeroSection, PastDisaster, MapSection, CountUp } from "../Public";
import { ongoingDisaster } from "../data/Data";

const Landing = () => {
  return (
    <>
      <HeroSection />
      <PastDisaster ongoingDisaster={ongoingDisaster}/>
      <MapSection />
      <CountUp />
    </>
  );
};
export default Landing;
