import { HeroSection, PastDisaster } from "../Public";
import { ongoingDisaster } from "../data/Data";

const Landing = () => {
  return (
    <>
      <HeroSection />
      <PastDisaster ongoingDisaster={ongoingDisaster}/>
    </>
  );
};
export default Landing;
