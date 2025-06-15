import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "How do I register to vote?", answer: "You can register by clicking on the 'Voter Registration' button and filling in the required details." },
    { question: "How do I find my polling booth?", answer: "Use the 'Polling Booth Finder' to search for polling stations in your area." },
    { question: "When is the next election?", answer: "Check the 'Election Calendar' for upcoming election dates." }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <button className="faq-question" onClick={() => toggleFAQ(index)}>
            {faq.question}
          </button>
          {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
