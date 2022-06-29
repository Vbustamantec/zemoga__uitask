import BannerInfo from './components/Banners/BannerInfo';
import BannerVote from './components/Banners/BannerVote';
import Footer from './containers/Footer/Footer';
import Hero from './containers/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import Voting from './containers/Voting/Voting';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <div className="max-centered">
        <BannerInfo />
        <main role="main">
          <Voting />
        </main>
        <BannerVote />
        <hr />
        <Footer />
      </div>
    </div>
  );
}

export default App;
