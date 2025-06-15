
import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/layouts/MainLayout";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import CompareFiles from "@/components/CompareFiles";
import EncodeDecode from "@/components/EncodeDecode";
import TranslateText from "@/components/TranslateText";
import QAModel from "@/components/QAModel";
import Summarize from "@/components/Summarize";

const Index = () => {
  const [activeTab, setActiveTab] = useState("compare");
  
  const renderTabContent = () => {
    switch (activeTab) {
      case "compare":
        return <CompareFiles />;
      case "encode-decode":
        return <EncodeDecode />;
      case "translate":
        return <TranslateText />;
      case "qa":
        return <QAModel />;
      case "summarize":
        return <Summarize />;
      default:
        return <CompareFiles />;
    }
  };
  
  return (
    <MainLayout>
      <Hero />
      
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful Document Analysis</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Our intelligent document analysis platform provides a suite of powerful tools to help you extract insights, compare documents, and more.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <FeatureCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path>
                  <path d="M12 13v9"></path>
                  <path d="M12 2v4"></path>
                </svg>
              }
              title="Document Comparison"
              description="Compare two documents to identify differences, additions, and deletions with precision."
              color="bg-blue-100"
            />
            <FeatureCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                  <path d="m18 16 4-4-4-4"></path>
                  <path d="m6 8-4 4 4 4"></path>
                  <path d="m14.5 4-5 16"></path>
                </svg>
              }
              title="Encode & Decode"
              description="Convert text between different encoding formats like Base64, URL encoding, and more."
              color="bg-purple-100"
            />
            <FeatureCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <path d="M5 8l6 6"></path>
                  <path d="m4 14 6-6 2-3"></path>
                  <path d="M2 5h12"></path>
                  <path d="M7 2h1"></path>
                  <rect x="12" y="12" width="10" height="10" rx="2"></rect>
                  <path d="M22 18h-4"></path>
                  <path d="M18 22v-8"></path>
                </svg>
              }
              title="Translation"
              description="Translate text between multiple languages with our powerful translation engine."
              color="bg-green-100"
            />
            <FeatureCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                  <line x1="2" x2="22" y1="2" y2="22"></line>
                </svg>
              }
              title="Q&A System"
              description="Ask questions about your documents and get AI-powered answers from the content."
              color="bg-amber-100"
            />
            <FeatureCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                  <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                  <line x1="16" x2="16" y1="10" y2="16"></line>
                  <line x1="12" x2="12" y1="10" y2="16"></line>
                  <line x1="8" x2="8" y1="10" y2="16"></line>
                </svg>
              }
              title="Summarization"
              description="Generate concise summaries of documents to quickly understand their key points."
              color="bg-pink-100"
            />
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gradient-to-b from-white to-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Try Our Tools</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Experience the power of our document analysis tools firsthand. Upload your documents and see the results in real-time.
            </p>
          </motion.div>
          
          <div className="glass rounded-xl overflow-hidden mb-8">
            <div className="flex overflow-x-auto scrollbar-hide">
              <TabButton 
                isActive={activeTab === "compare"} 
                onClick={() => setActiveTab("compare")}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path>
                    <path d="M12 13v9"></path>
                    <path d="M12 2v4"></path>
                  </svg>
                }
                label="Compare Documents"
              />
              <TabButton 
                isActive={activeTab === "encode-decode"} 
                onClick={() => setActiveTab("encode-decode")}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m18 16 4-4-4-4"></path>
                    <path d="m6 8-4 4 4 4"></path>
                    <path d="m14.5 4-5 16"></path>
                  </svg>
                }
                label="Encode & Decode"
              />
              <TabButton 
                isActive={activeTab === "translate"} 
                onClick={() => setActiveTab("translate")}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 8l6 6"></path>
                    <path d="m4 14 6-6 2-3"></path>
                    <path d="M2 5h12"></path>
                    <path d="M7 2h1"></path>
                    <rect x="12" y="12" width="10" height="10" rx="2"></rect>
                    <path d="M22 18h-4"></path>
                    <path d="M18 22v-8"></path>
                  </svg>
                }
                label="Translate"
              />
              <TabButton 
                isActive={activeTab === "qa"} 
                onClick={() => setActiveTab("qa")}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                    <line x1="2" x2="22" y1="2" y2="22"></line>
                  </svg>
                }
                label="Q&A System"
              />
              <TabButton 
                isActive={activeTab === "summarize"} 
                onClick={() => setActiveTab("summarize")}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                    <line x1="16" x2="16" y1="10" y2="16"></line>
                    <line x1="12" x2="12" y1="10" y2="16"></line>
                    <line x1="8" x2="8" y1="10" y2="16"></line>
                  </svg>
                }
                label="Summarize"
              />
            </div>
          </div>
          
          {renderTabContent()}
        </div>
      </section>
      
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto glass rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Analyze Your Documents?</h2>
                <p className="text-foreground/70 mb-6">
                  Sign up now to get full access to all our powerful document analysis tools and features.
                </p>
                <button className="bg-primary px-6 py-3 rounded-full text-white font-medium transition-all hover:shadow-lg hover:shadow-primary/20 button-shine">
                  Get Started Today
                </button>
              </div>
              <div className="md:w-1/3">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="w-full aspect-square bg-white rounded-2xl shadow-xl flex items-center justify-center"
                >
                  <svg className="w-24 h-24 text-primary animate-pulse-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton = ({ isActive, onClick, icon, label }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-4 transition-all whitespace-nowrap ${
      isActive 
        ? "bg-white text-primary border-b-2 border-primary" 
        : "text-foreground/70 hover:text-primary hover:bg-white/50"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Index;
