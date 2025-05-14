import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const phoneNumber = "919319056757"; // Format: country code + number without +
  const message = "Hello! I'd like to know more about your services."; // Pre-filled message (optional)
  
  // Disable pulse animation after first interaction
  useEffect(() => {
    const hasInteracted = sessionStorage.getItem('whatsapp_tooltip_seen');
    if (hasInteracted) {
      setPulseAnimation(false);
    }
  }, []);

  const handleWhatsAppClick = () => {
    // Create WhatsApp URL with phone number and optional message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Close tooltip after clicking
    setIsTooltipVisible(false);
    
    // Remember that user has interacted
    sessionStorage.setItem('whatsapp_tooltip_seen', 'true');
    setPulseAnimation(false);
  };

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
    
    // Remember that user has seen tooltip
    sessionStorage.setItem('whatsapp_tooltip_seen', 'true');
    setPulseAnimation(false);
  };

  return (
    <div className="fixed z-50 bottom-20 right-5">
      {/* Tooltip */}
      {isTooltipVisible && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 mb-2 w-64 
                        transform transition-all duration-300 ease-out">
          <button 
            onClick={toggleTooltip} 
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close tooltip"
          >
            <X size={16} />
          </button>
          <p className="text-sm mb-3">Chat with us on WhatsApp for quick assistance!</p>
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium 
                      transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 
                      focus:ring-green-500 focus:ring-opacity-50"
          >
            <MessageCircle size={16} className="mr-2" />
            Start Chat
          </button>
        </div>
      )}
      
      {/* WhatsApp Button */}
      <button
        onClick={toggleTooltip}
        className={`bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg 
                   flex items-center justify-center transition-all duration-300 hover:scale-105
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                   ${pulseAnimation ? 'animate-pulse' : ''}`}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
        <span className="sr-only">WhatsApp Chat</span>
      </button>
    </div>
  );
};

export default WhatsAppButton;