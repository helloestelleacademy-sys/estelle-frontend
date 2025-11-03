"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What do i gain in building my personal branding?",
    answer:
      "Buillding your Personal brand with Estelle will help you build a legacy brand that impacts people through our experiences and story. ",
  },
  {
    question: "Will i save money with Estelle?",
    answer:
      "Yes, you can save 5% of your money when you subscribe to our premium plan",
  },
  {
    question: "How many courses are in the basic plan?",
    answer:
      "There are 6 detailed and value packed courses in the basic plan. These courses are designed to help you gain basic and intermediary knowledge in building your personal brand",
  },
  {
    question: "How many courses are in the premium plan?",
    answer:
      "There are 10 detailed courses in the premium plan. These courses are designed to postion you as an expert and stay top of your mind to attract clients and recruiters while leaving leaving a legacy. ",
  },
  {
    question: "What does my organization gain?",
    answer:
      "There are 10 detailed courses in the premium plan. These courses are designed to postion you as an expert and stay top of your mind to attract clients and recruiters while leaving leaving a legacy. ",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    const isOpen = activeIndex === index;
    setActiveIndex(isOpen ? null : index);
  };

  return (
    <section
      ref={containerRef}
      className="max-w-3xl mx-auto py-20 px-6 text-gray-900"
    >

      <h2 className="text-4xl font-semibold mt-6 text-center max-w-xl mx-auto mb-10">Questions? We&apos;ve got <span className="gradient-bg bg-clip-text text-transparent">answers</span></h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            ref={(el) => {itemsRef.current[index] = el}}
            className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium hover:bg-gray-50 transition-all"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180 text-purple-500" : "rotate-0"
                }`}
              />
            </button>

            <div
              className="overflow-hidden"
              style={{
                maxHeight: activeIndex === index ? "200px" : "0px",
                transition: "max-height 0.5s ease, padding 0.5s ease",
              }}
            >
              <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
