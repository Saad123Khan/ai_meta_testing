// "use client";
// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const slides = [
//   {
//     info: "Boost your Experience",
//     title: "Post an ad & enjoy campaigning",
//     subtitle: "Facebook, Instagram, Google, Twitter",
//     buttonText: "Create an Ad",
//   },
//   {
//     info: "Boost your Experience",
//     title: "Analyze your performance",
//     subtitle: "Track metrics across platforms",
//     buttonText: "View Analytics",
//   },
//   {
//     info: "Boost your Experience",
//     title: "Optimize your campaigns",
//     subtitle: "AI-powered recommendations",
//     buttonText: "Start Optimizing",
//   },
// ];

// const AdvertiseCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
//     );
//   };

//   return (
//     <Card className="w-full bg-primary rounded-[28px] border-none p-2 relative overflow-hidden">
//     <div className="flex items-center h-full">
//       <Button variant="ghost" size="icon" onClick={prevSlide} className="z-10 absolute left-2">
//         <ChevronLeft className="h-6 w-6" />
//       </Button>
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentIndex}
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -50 }}
//           transition={{ duration: 0.3 }}
//           className=" w-full px-12"
//         >
//           <div className="flex justify-between items-center p-4 rounded-lg">
//             <div>
//             <p className="text-[13px] text-primary-color mb-4">{slides[currentIndex].info}</p>
//             <h2 className="text-[24px] text-primary-color font-bold mb-2">{slides[currentIndex].title}</h2>
//             <p className="text-sm text-primary-color mb-4">{slides[currentIndex].subtitle}</p>
//             </div>
//             <Button variant="default" className="bg-secondary text-primary-color hover:bg-blue-700">
//               {slides[currentIndex].buttonText}
//             </Button>
//           </div>
//         </motion.div>
//       </AnimatePresence>
//       <Button variant="ghost" size="icon" onClick={nextSlide} className="z-10 absolute right-2">
//         <ChevronRight className="h-6 w-6" />
//       </Button>
//     </div>
//   </Card>
//   );
// };

// export default AdvertiseCarousel;


"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    info: "Boost your Experience",
    title: "Post an ad & enjoy campaigning",
    subtitle: "Facebook, Instagram, Google, Twitter",
    buttonText: "Create an Ad",
  },
  {
    info: "Boost your Experience",
    title: "Analyze your performance",
    subtitle: "Track metrics across platforms",
    buttonText: "View Analytics",
  },
  {
    info: "Boost your Experience",
    title: "Optimize your campaigns",
    subtitle: "AI-powered recommendations",
    buttonText: "Start Optimizing",
  },
];

const AdvertiseCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <Card className="w-full bg-primary rounded-[28px] border-none p-2 relative overflow-hidden">
      <div className="flex items-center h-full">
        <Button variant="ghost" size="icon" onClick={prevSlide} className="z-10 absolute left-2">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full px-4 sm:px-12"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 rounded-lg">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <p className="text-[13px] text-primary-color mb-2 sm:mb-4">{slides[currentIndex].info}</p>
                <h2 className="text-[20px] sm:text-[24px] text-primary-color font-bold mb-2">{slides[currentIndex].title}</h2>
                <p className="text-sm text-primary-color mb-4">{slides[currentIndex].subtitle}</p>
              </div>
              <Button variant="default" className="bg-secondary text-primary-color hover:bg-blue-700 w-full sm:w-auto">
                {slides[currentIndex].buttonText}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
        <Button variant="ghost" size="icon" onClick={nextSlide} className="z-10 absolute right-2">
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </Card>
  );
};

export default AdvertiseCarousel;

