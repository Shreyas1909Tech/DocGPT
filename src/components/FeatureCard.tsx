
import { motion } from "framer-motion";
import { FeatureCardProps } from "@/types";

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-xl p-6 flex flex-col h-full hover:shadow-lg transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70 flex-grow">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
