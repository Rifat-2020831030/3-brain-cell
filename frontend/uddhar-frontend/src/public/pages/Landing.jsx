import { HeroSection, PastDisaster, MapSection, CountUp, LogoScroll } from "../Public";
import { ongoingDisaster, orgLogo } from "../data/Data";

const Landing = () => {
  return (
    <>
      <HeroSection />
      <PastDisaster ongoingDisaster={ongoingDisaster}/>
      <MapSection />
      <CountUp />
      <LogoScroll orgLogo={orgLogo}/>
    </>
  );
};
export default Landing;
