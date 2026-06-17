import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ArrowUp, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupState, setPopupState] = useState(null); // 'success', 'error', null

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message cannot be empty';
    } else if (formData.message.length < 10) {
      tempErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'ceaswin146@gmail.com',
    };

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || publicKey.includes('your_') || serviceId.includes('your_') || templateId.includes('your_')) {
      console.error('EmailJS credentials are missing or unconfigured in the .env file.');
      setIsSubmitting(false);
      setPopupState('error');
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        templateParams,
        {
          publicKey: publicKey
        }
      )
      .then(
        () => {
          setIsSubmitting(false);
          setPopupState('success');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          console.error('EmailJS Error:', error);
          setIsSubmitting(false);
          setPopupState('error');
        }
      );
  };

  // Auto close popup state
  useEffect(() => {
    if (popupState === 'success') {
      const timer = setTimeout(() => {
        setPopupState(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [popupState]);

  const handleBackToTop = (e) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="relative pt-32 pb-16 px-6 w-full max-w-7xl mx-auto overflow-hidden">
      {/* Title */}
      <div className="flex flex-col items-start mb-16">
        <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-3">
          Get In Touch
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
          Connect With Me
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
        {/* Left Side: Contact Information (Col span 5) */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-white font-display text-xl font-black uppercase tracking-wider mb-6">
              Let's Discuss Architecture
            </h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              Have a product idea, dynamic startup, microservices ecosystem layout query, or internship proposal? Drop a line and let's engineer it together.
            </p>

            {/* Direct Contact Links */}
            <div className="space-y-4 pt-4">
              <a
                href="mailto:ceaswin146@gmail.com"
                className="flex items-center gap-4 group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-white/30 text-[9px] uppercase tracking-wider font-bold block">Email</span>
                  <span className="text-white text-sm font-semibold">ceaswin146@gmail.com</span>
                </div>
              </a>

              <a
                href="tel:8590743771"
                className="flex items-center gap-4 group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-white/30 text-[9px] uppercase tracking-wider font-bold block">Phone</span>
                  <span className="text-white text-sm font-semibold">8590743771</span>
                </div>
              </a>
            </div>
          </div>

          {/* Socials Connection */}
          <div className="flex gap-4 pt-6 border-t border-white/5">
            <a
              href="https://github.com/axwinachu"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/30 transition-all cursor-pointer"
              aria-label="GitHub Link"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/aswin-r-366443296/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/30 transition-all cursor-pointer"
              aria-label="LinkedIn Link"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Right Side: Contact Form (Col span 7) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl glassmorphism border border-white/5 p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name Input */}
              <div className="relative">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`w-full px-5 py-4 rounded-xl bg-black/40 border text-white font-sans text-sm focus:outline-none focus:border-primary transition-all ${
                    errors.name ? 'border-primary/50' : 'border-white/10'
                  }`}
                />
                {errors.name && (
                  <span className="text-[10px] text-primary font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.name}
                  </span>
                )}
              </div>

              {/* Email Input */}
              <div className="relative">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className={`w-full px-5 py-4 rounded-xl bg-black/40 border text-white font-sans text-sm focus:outline-none focus:border-primary transition-all ${
                    errors.email ? 'border-primary/50' : 'border-white/10'
                  }`}
                />
                {errors.email && (
                  <span className="text-[10px] text-primary font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.email}
                  </span>
                )}
              </div>

              {/* Message Input */}
              <div className="relative">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 block mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Hi Aswin, I'd like to discuss a project..."
                  className={`w-full px-5 py-4 rounded-xl bg-black/40 border text-white font-sans text-sm focus:outline-none focus:border-primary transition-all resize-none ${
                    errors.message ? 'border-primary/50' : 'border-white/10'
                  }`}
                />
                {errors.message && (
                  <span className="text-[10px] text-primary font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.message}
                  </span>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-accent text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(255,0,0,0.3)] disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'Transmitting...' : <>Transmit Message <Send size={14} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Details */}
      <footer className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <span className="text-white font-display font-black tracking-widest text-base">
            ASWIN R
          </span>
          <span className="text-[10px] text-white/30 tracking-wider">
            © {new Date().getFullYear()} Aswin R. All system configurations secured.
          </span>
        </div>

        {/* Back to top CTA */}
        <button
          onClick={handleBackToTop}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/30 transition-all cursor-pointer"
          aria-label="Back To Top"
        >
          <ArrowUp size={20} className="animate-bounce" />
        </button>
      </footer>

      {/* Premium Animated Modals */}
      <AnimatePresence>
        {popupState && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm rounded-2xl glassmorphism-red p-8 flex flex-col items-center text-center shadow-[0_0_30px_rgba(255,0,0,0.45)] border border-primary/30"
            >
              {popupState === 'success' ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center text-primary mb-4 shadow-[0_0_15px_rgba(255,0,0,0.3)]">
                    <CheckCircle size={24} />
                  </div>
                  <h3 className="text-white text-lg font-bold font-display uppercase tracking-wider mb-2">
                    Message Sent Successfully
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-6">
                    Thank you for contacting me. I'll get back to you soon.
                  </p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-red-600/10 border border-red-600/40 flex items-center justify-center text-red-500 mb-4 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                    <AlertCircle size={24} />
                  </div>
                  <h3 className="text-white text-lg font-bold font-display uppercase tracking-wider mb-2">
                    Failed to Send Message
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-6">
                    Please try again later.
                  </p>
                </>
              )}
              <button
                onClick={() => setPopupState(null)}
                className="px-6 py-2.5 rounded-lg bg-primary hover:bg-accent text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_10px_rgba(255,0,0,0.3)]"
              >
                OK
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
