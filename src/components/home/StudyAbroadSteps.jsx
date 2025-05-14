import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const StudyAbroadSteps = () => {
  return (
    <section className="w-full px-4 md:px-8 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="block mb-3 text-sm text-blue-600 font-medium">
            YOUR JOURNEY BEGINS HERE
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Your Path to Global Education
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We guide you through every step of your study abroad journey, making your dreams of international education a reality.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <StepsList />
          <ShuffleGrid />
        </div>
      </div>
    </section>
  );
};

const stepsData = [
  {
    id: 1,
    title: "Expert Counselling",
    description: "Personalized guidance from our experienced advisors to understand your academic goals, preferences, and find the perfect educational path.",
    icon: "👨‍🏫"
  },
  {
    id: 2,
    title: "University Application",
    description: "Complete assistance with documentation, application forms, and submission to increase your chances of acceptance at your dream universities.",
    icon: "🏛️"
  },
  {
    id: 3,
    title: "Loan/Scholarship Assistance",
    description: "Expert advice on financial aid options, scholarship applications, and education loans to make your international education affordable.",
    icon: "💰"
  },
  {
    id: 4,
    title: "Visa Processing",
    description: "End-to-end support for visa applications, interview preparation, and documentation to ensure a smooth transition to your host country.",
    icon: "✈️"
  }
];

const StepsList = () => {
  return (
    <div className="space-y-6">
      {stepsData.map((step, index) => (
        <StepItem key={step.id} step={step} index={index} />
      ))}
    </div>
  );
};

const StepItem = ({ step, index }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, threshold: 0.3 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);
  
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6,
        delay: index * 0.2 
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl">
            {step.icon}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            <span className="text-blue-600 mr-2">{index + 1}.</span>
            {step.title}
          </h3>
          <p className="text-gray-600">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    color: "bg-blue-500",
    content: "🎓"
  },
  {
    id: 2,
    color: "bg-green-500",
    content: "🌍"
  },
  {
    id: 3,
    color: "bg-yellow-500",
    content: "📚"
  },
  {
    id: 4,
    color: "bg-purple-500",
    content: "🔍"
  },
  {
    id: 5,
    color: "bg-red-500",
    content: "✍️"
  },
  {
    id: 6,
    color: "bg-indigo-500",
    content: "🛫"
  },
  {
    id: 7,
    color: "bg-pink-500",
    content: "🏆"
  },
  {
    id: 8,
    color: "bg-blue-400",
    content: "💼"
  },
  {
    id: 9,
    color: "bg-green-400",
    content: "🏙️"
  },
  {
    id: 10,
    color: "bg-yellow-400",
    content: "🌱"
  },
  {
    id: 11,
    color: "bg-purple-400",
    content: "🎯"
  },
  {
    id: 12,
    color: "bg-red-400",
    content: "🔑"
  },
  {
    id: 13,
    color: "bg-indigo-400",
    content: "💡"
  },
  {
    id: 14,
    color: "bg-pink-400",
    content: "🌟"
  },
  {
    id: 15,
    color: "bg-blue-300",
    content: "📝"
  },
  {
    id: 16,
    color: "bg-green-300",
    content: "🏫"
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className={`w-full h-full ${sq.color} rounded-lg flex items-center justify-center`}
    >
      <div className="aspect-square flex items-center justify-center text-2xl md:text-3xl lg:text-4xl">
        {sq.content}
      </div>
    </motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, threshold: 0.3 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
      shuffleSquares();
    } else {
      controls.start("hidden");
      clearTimeout(timeoutRef.current);
    }
    
    return () => clearTimeout(timeoutRef.current);
  }, [inView]);

  const shuffleSquares = () => {
    setSquares(generateSquares());
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="h-[450px] w-full overflow-hidden rounded-xl shadow-xl"
    >
      <div className="grid grid-cols-4 grid-rows-4 h-full gap-1 p-1 bg-gray-100">
        {squares}
      </div>
    </motion.div>
  );
};

export default StudyAbroadSteps;