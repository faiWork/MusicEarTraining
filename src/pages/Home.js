import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Home = () => {
  const navigate = useNavigate();

  const handleMelodyDictationClick = () => {
    navigate("/settings");
  };

  return (
    <Layout>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Music Ear Trainer</h1>
          <p>Develop your musical ear with our interactive training app.</p>
        </header>
        <main>
          <section className="App-content">
            <h2>About the App</h2>
            <p>
              This app is designed to help you improve your music ear training
              skills through interactive exercises and challenges.
            </p>
          </section>
          <section className="App-content">
            <h2>Key Features</h2>
            <ul>
              <li>
                <button onClick={handleMelodyDictationClick}>
                  Melody Dictation
                </button>
              </li>
              <li>Customizable difficulty levels</li>
              <li>Progress tracking and statistics</li>
            </ul>
          </section>
          <section className="App-content">
            <h2>Get Started</h2>
            <p>
              To begin your music ear training journey, navigate to the settings
              page and customize your preferences. Then, start practicing and
              enjoy the process of improving your musical abilities.
            </p>
          </section>
        </main>
        <footer className="App-footer">
          <p>&copy; 2024 Music Ear Trainer. All rights reserved.</p>
        </footer>
      </div>
    </Layout>
  );
};

export default Home;
