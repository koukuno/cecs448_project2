import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Player from "./components/Player.tsx";
import Home from "./pages/Home.tsx";
import { ThemeProvider, useTheme } from "./context/ThemeContext.tsx";
import { AudioProvider, useAudio } from "./context/AudioContext.tsx";

function AppContent() {
  const { theme } = useTheme();
  const { currentTrack } = useAudio();

  // Gradient color arrays for dynamic background transitions based on current track variant
  const darkGradients = [
    "from-[#2e2e2e]/40",
    "from-[#450af5]/40",
    "from-[#e8115b]/40",
    "from-[#148a08]/40",
    "from-[#004369]/40"
  ];

  const lightGradients = [
    "from-gray-200/50",    // 0
    "from-[#5d00b3]/15",  // 1
    "from-[#e8115b]/15",  // 2
    "from-[#148a08]/15",  // 3
    "from-[#004369]/15"   // 4
  ];

  const activeGradients = theme === 'dark' ? darkGradients : lightGradients;
  const currentGradient = activeGradients[currentTrack.variant % activeGradients.length];

  const baseBg = theme === 'dark' ? 'to-[#121212] bg-[#121212]' : 'to-white bg-white';
  const panelBg = theme === 'dark' ? 'bg-[#121212] border-transparent' : 'bg-white border border-gray-200';

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden relative transition-colors duration-300">
      <div className="flex flex-1 h-[calc(100vh-80px)] min-h-0 overflow-hidden relative">
        <Sidebar />
        <div className={`flex-1 flex flex-col m-2 ml-0 rounded-lg overflow-hidden relative transition-all duration-300 ${panelBg}`}>
          <Navbar />
          <main className={`flex-1 overflow-y-auto p-6 min-h-0 custom-scrollbar relative bg-linear-to-b transition-all duration-500 ease-out ${currentGradient} ${baseBg}`}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </div>

      <div className="h-20 shrink-0 relative w-full">
        <Player />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AudioProvider>
          <AppContent />
        </AudioProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;