import { HeroSection, PastDisaster, MapSection, CountUp, LogoScroll, VOM } from "../Public";
import { ongoingDisaster, orgLogo } from "../data/Data";

const Landing = () => {
  return (
    <>
      <HeroSection />
      <PastDisaster ongoingDisaster={ongoingDisaster}/>
      <MapSection />
      <CountUp />
      <LogoScroll orgLogo={orgLogo}/>
      <VOM />
    </>
  );
};
export default Landing;
