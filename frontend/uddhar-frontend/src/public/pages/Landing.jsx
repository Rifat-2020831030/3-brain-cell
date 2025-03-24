import { HeroSection, PastDisaster, MapSection, CountUp, LogoScroll, VOM, Footer } from "../Public";
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
      <Footer />
    </>
  );
};
export default Landing;
