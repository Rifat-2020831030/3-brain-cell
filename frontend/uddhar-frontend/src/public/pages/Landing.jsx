import { HeroSection, PastDisaster, MapSection } from "../Public";
import { ongoingDisaster } from "../data/Data";

const Landing = () => {
  return (
    <>
      <HeroSection />
      <PastDisaster ongoingDisaster={ongoingDisaster}/>
      <MapSection />
    </>
  );
};
export default Landing;
