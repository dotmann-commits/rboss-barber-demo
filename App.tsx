import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Header from './Components/Header';
import Hero from './Components/Hero';
import ContactStrip from './Components/ContactStrip';
import Services from './Components/Services';
import Gallery from './Components/Gallery';
import About from './Components/About';
import Booking from './Components/Booking';
import Footer from './Components/Footer';

function App() {
  const [selectedService, setSelectedService] = useState('');

  const handleSelectService = (serviceKey: string) => {
    setSelectedService(serviceKey);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-brand-black">
        <Header />
        <Hero />
        <ContactStrip />
        <Gallery />
        <Services onSelectService={handleSelectService} />
        <Booking selectedService={selectedService} />
        <About />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
