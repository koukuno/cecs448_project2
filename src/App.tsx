import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Player from "./components/Player.tsx";
import Home from "./pages/Home.tsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-black text-white overflow-hidden">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-[#121212] m-2 rounded-lg overflow-y-auto">
          <Navbar />

          {/* Dynamic Page Content */}
          <main className="p-6">
            <Home />
          </main>
        </div>
        <Player />
      </div>
    </BrowserRouter>
  )
}

export default App
