import FirstSection from "../OtherPages/FirstPage";
import FeaturedPost from "../HomePageComponent/FeaturedPost";
import Tags from "../HomePageComponent/Tags";
import AllArticles from "../HomePageComponent/AllArticles";
const Homepage = () => {
  return (
    <div>
      <FirstSection />
      <FeaturedPost />
      <Tags />
      <AllArticles />
    </div>
  );
};

export default Homepage;
