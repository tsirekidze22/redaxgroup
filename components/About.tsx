"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { number: 15, label: "წლიანი გამოცდილება" },
    { number: 250, label: "დასრულებული პროექტი" },
    { number: 12, label: "მიმდინარე პროექტი" },
    { number: 35, label: "თანამშრომელი" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#28292c] mb-6 md:mb-8">
          ჩვენ შესახებ
        </h2>

        {/* Description Paragraphs */}
        <div className="mb-12 md:mb-16 max-w-8xl">
          <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
            ჩვენ ვართ პროფესიონალთა გუნდი, რომელიც სპეციალიზირებულია ინტერიერის
            დიზაინსა და სარემონტო სამუშაოებში. თითოეული პროექტი ჩვენთვის
            განსაკუთრებულია და ვზრუნავთ, რომ შედეგი აღემატებოდეს თქვენს
            მოლოდინს.
          </p>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            ხარისხი, სანდოობა და დროის დაცვა - ეს არის ჩვენი მთავარი პრინციპები,
            რომლებსაც ვიცავთ ყოველი პროექტის განხორციელებისას. გვჯერა, რომ
            თქვენი სახლი თქვენი ოცნების ასახვა უნდა იყოს.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              isVisible={isVisible}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  number,
  label,
  isVisible,
  delay,
}: {
  number: number;
  label: string;
  isVisible: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = number / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          setCount(number);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, number, delay]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#52555a] mb-2">
        {count}+
      </div>
      <div className="text-sm md:text-base text-gray-600">{label}</div>
    </div>
  );
}
