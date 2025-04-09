import { useState, useEffect } from "react";

export function TypingEffect() {
  const [typedText, setTypedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const textArray = [
    "Full Stack Developer",
    "AI/ML Engineer",
    "DevOps Engineer",
    "Mobile Developer",
    "Automation Tester",
    "Performance Tester",
  ];

  useEffect(() => {
    const currentText = textArray[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentText.substring(0, typedText.length + 1));
        setTypingSpeed(150);

        if (typedText === currentText) {
          setIsDeleting(true);
          setTypingSpeed(1000); // Pause before deleting
        }
      } else {
        setTypedText(currentText.substring(0, typedText.length - 1));
        setTypingSpeed(50);

        if (typedText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % textArray.length);
          setTypingSpeed(500); // Pause before typing next word
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, currentTextIndex, isDeleting, typingSpeed]);

  return (
    <div className="h-6 flex items-center">
      <span className="text-secondary">{typedText}</span>
      <span className="w-2 h-5 bg-secondary inline-block animate-blink ml-0.5"></span>
    </div>
  );
}
