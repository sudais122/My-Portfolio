
import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
}) {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        container.current,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
