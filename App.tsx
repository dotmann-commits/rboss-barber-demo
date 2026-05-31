import { NavigationProvider, useNavigation } from './context/NavigationContext';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AIChat from './Components/AIChat';

import Home from './pages/Home';
import Flights from './pages/Flights';
import Admissions from './pages/Admissions';
import Visa from './pages/Visa';
import ProofOfFunds from './pages/ProofOfFunds';
import Tours from './pages/Tours';
import About from './pages/About';
import Portal from './pages/Portal';
import Contact from './pages/Contact';

function AppContent() {
  const { currentPage } = useNavigation();

  const PAGE_MAP = {
    home: Home,
    flights: Flights,
    admissions: Admissions,
    visa: Visa,
    'proof-of-funds': ProofOfFunds,
    tours: Tours,
    about: About,
    portal: Portal,
    contact: Contact,
  };

  const PageComponent = PAGE_MAP[currentPage] ?? Home;

  return (
    <div className="min-h-screen bg-uptreek-navy">
      <Header />
      <main>
        <PageComponent />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
