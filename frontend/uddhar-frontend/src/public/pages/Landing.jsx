import {
  HeroSection,
  PastDisaster,
  MapSection,
  CountUp,
  LogoScroll,
  VolunteerOftheMonth,
  Footer,
  Updates,
} from "../Public";
import { ongoingDisaster, orgLogo } from "../data/Data";

const Landing = () => {
  return (
    <>
      <Updates haveUpdates={true} />
      <HeroSection />
      <PastDisaster ongoingDisaster={ongoingDisaster} />
      <MapSection />
      <CountUp />
      <LogoScroll orgLogo={orgLogo} />
      <VolunteerOftheMonth />
      <Footer />
    </>
  );
};
export default Landing;
