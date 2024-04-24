import Hero from "./Hero";
import Leaderboard from "./Leaderboard";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <Leaderboard />
    </div>
  );
};

export default HomePage;
