
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 md:py-40 overflow-hidden hero-pattern">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 mb-16 lg:mb-0"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-6"
            >
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Next-Gen Document Analysis
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Intelligent Document Analysis Made <span className="text-primary">Simple</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-lg text-foreground/70 mb-8 max-w-lg"
            >
              Leverage the power of AI to analyze, compare, search, and extract insights from your documents with unmatched precision and elegance.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-primary px-6 py-3 rounded-full text-white font-medium transition-all hover:shadow-lg hover:shadow-primary/20 button-shine">
                Try It Now
              </button>
              <button className="border border-foreground/10 px-6 py-3 rounded-full font-medium transition-all hover:bg-foreground/5">
                Learn More
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative w-full max-w-xl mx-auto">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="glass rounded-2xl overflow-hidden shadow-xl border border-white/30"
              >
                <img
                  src="https://placehold.co/800x600/0072F5/FFFFFF.webp?text=Document+Analysis&font=roboto"
                  alt="Document Analysis Interface"
                  className="w-full rounded-2xl"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="glass absolute -left-10 bottom-20 p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">AI-Powered</h4>
                    <p className="text-xs text-foreground/70">Advanced ML algorithms</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="glass absolute -right-10 top-20 p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Instant Analysis</h4>
                    <p className="text-xs text-foreground/70">Results in seconds</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
