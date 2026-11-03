import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./App.css";
import profileImg from "./assets/profile.jpeg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    number: "01",
    category: "Full-stack · University platform",
    title: "FYP Management System",
    description:
      "A university platform designed to simplify final-year project management, student profiles, team formation, and proposal submissions.",
    stack: ["React", "Node.js", "Database"],
    link: "https://awkumtech.awkum.edu.pk",
    linkText: "Visit live platform",
  },
  {
    number: "02",
    category: "SaaS · Web application",
    title: "ClinicFlow",
    description:
      "A clinic appointment and queue-management application with patient and doctor workflows, authentication, and real-time queue tracking.",
    stack: ["React", "TypeScript", "Node.js", "MongoDB"],
    link: "https://github.com/sudais122/Clinicflow",
    linkText: "View source code",
  },
  {
    number: "03",
    category: "Web application",
    title: "Complaint Management System",
    description:
      "A complaint-handling application with administrative workflows, user authentication screens, complaint details, and response interfaces.",
    stack: ["HTML", "JavaScript", "Node.js", "SQL"],
    link: "https://github.com/sudais122/Complain-Managment-System",
    linkText: "View source code",
  },
  {
    number: "04",
    category: "Frontend · Healthcare",
    title: "Sehat Dost",
    description:
      "A healthcare-focused frontend application built with a modern React development stack.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/sudais122/Sehat-Dost",
    linkText: "View source code",
  },
];

const perspectives = [
  {
    key: "Structure",
    title: "Give an idea structure.",
    text: "Interfaces and components that connect real needs to working software.",
  },
  {
    key: "Logic",
    title: "Make it actually work.",
    text: "APIs, authentication, and data flows that keep the product reliable behind the screen.",
  },
  {
    key: "Compete",
    title: "Put it to the test.",
    text: "Hackathons and tech competitions where ideas become prototypes under real pressure.",
  },
];

const toolkit = [
  {
    key: "Frontend",
    title: "Build with perspective.",
    text: "I connect what users need with what the technology can do, from the first requirement to the interface people actually use.",
    skills: ["JavaScript", "TypeScript", "React", "HTML & CSS", "Tailwind CSS"],
  },
  {
    key: "Backend",
    title: "Make it hold together.",
    text: "Server logic, REST APIs, and databases that turn a good-looking screen into a dependable product.",
    skills: ["Node.js", "Express.js", "MongoDB", "SQL"],
  },
  {
    key: "Workflow",
    title: "Ship it properly.",
    text: "Version control, collaboration, and a habit of improving through every project.",
    skills: ["Git & GitHub"],
  },
];

const steps = [
  "Understand the need",
  "Shape the experience",
  "Build the product",
];

const achievements = [
  {
    big: "1st",
    label: "AI & Tech Prototype",
    title: "First Position",
    text: "TFV Talent Hut competition",
  },
  {
    big: "2nd",
    label: "Hackathon",
    title: "Second Position",
    text: "Bit & Byte Society",
  },
  {
    big: "Best",
    label: "Internship",
    title: "Best Award",
    text: "DevelopersHub Corporation · Front-End Development",
  },
  {
    big: "CCPC",
    label: "Leadership",
    title: "Ambassador",
    text: "Department of Computer Science",
  },
];

const journey = [
  {
    when: "Start",
    title: "Learning by building.",
    text: "Began with code and kept asking why things work, then started shipping real projects.",
  },
  {
    when: "University",
    title: "Software Engineering.",
    text: "Studying at Abdul Wali Khan University Mardan while building full-stack platforms.",
  },
  {
    when: "Today",
    title: "Connecting the whole picture.",
    text: "Building products, competing in hackathons, and contributing as a CCPC Ambassador.",
  },
  {
    when: "Next",
    title: "More useful things.",
    text: "Working with ambitious people to build products that open new possibilities.",
  },
];

const marqueeWords = [
  "Engineer",
  "Builder",
  "Problem solver",
  "Full-stack developer",
  "Student",
];
const SCRAMBLE_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@*+";

function ScrambleText({
  children,
  className = "",
  playOnLoad = false,
  delay = 1500,
}) {
  const text = String(children);
  const hostRef = useRef(null);
  const liveRef = useRef(null);
  const timer = useRef(0);

  const reset = () => {
    clearInterval(timer.current);
    if (liveRef.current) liveRef.current.textContent = text;
  };

  const play = () => {
    const el = liveRef.current;
    if (!el) return;
    const skip =
      hostRef.current?.closest(".motion-off") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip) return;

    clearInterval(timer.current);
    const steps = 14;
    let step = 0;

    timer.current = setInterval(() => {
      step += 1;
      const revealed = Math.floor((step / steps) * text.length);
      el.textContent = text
        .split("")
        .map((ch, i) =>
          i < revealed || ch === " " || ch === "/"
            ? ch
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
        )
        .join("");

      if (step >= steps) {
        clearInterval(timer.current);
        el.textContent = text;
      }
    }, 35);
  };

  useEffect(() => {
    const start = playOnLoad ? setTimeout(play, delay) : 0;
    return () => {
      clearTimeout(start);
      clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      ref={hostRef}
      className={`scramble-host ${className}`}
      onMouseEnter={play}
      onMouseLeave={reset}
      aria-label={text}
    >
      <span className="scramble scramble-left" aria-hidden="true">
        <span className="scramble-ghost">{text}</span>
        <span className="scramble-live" ref={liveRef}>
          {text}
        </span>
      </span>
    </span>
  );
}
/* Nav link whose text scrambles, then resolves left to right, on hover/focus */
function ScrambleLink({ href, onClick, children }) {
  const text = String(children);
  const linkRef = useRef(null);
  const liveRef = useRef(null);
  const timer = useRef(0);

  const reset = () => {
    clearInterval(timer.current);
    if (liveRef.current) liveRef.current.textContent = text;
  };

  const play = () => {
    const el = liveRef.current;
    if (!el) return;
    const skip =
      linkRef.current?.closest(".motion-off") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip) return;

    clearInterval(timer.current);
    const steps = 14;
    let step = 0;

    timer.current = setInterval(() => {
      step += 1;
      const revealed = Math.floor((step / steps) * text.length);
      el.textContent = text
        .split("")
        .map((ch, i) =>
          i < revealed || ch === " "
            ? ch
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
        )
        .join("");

      if (step >= steps) {
        clearInterval(timer.current);
        el.textContent = text;
      }
    }, 35);
  };

  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <a
      ref={linkRef}
      href={href}
      onClick={onClick}
      onMouseEnter={play}
      onMouseLeave={reset}
      onFocus={play}
      onBlur={reset}
      aria-label={text}
    >
      <span className="scramble" aria-hidden="true">
        <span className="scramble-ghost">{text}</span>
        <span className="scramble-live" ref={liveRef}>
          {text}
        </span>
      </span>
    </a>
  );
}
function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <nav className="navbar">
        <a href="#top" className="brand" onClick={close}>
          Muhammad Sudais
        </a>

        <div className={`nav-links ${open ? "is-open" : ""}`}>
          <ScrambleLink href="#work" onClick={close}>
            Work
          </ScrambleLink>
          <ScrambleLink href="#about" onClick={close}>
            About
          </ScrambleLink>
          <ScrambleLink href="#toolkit" onClick={close}>
            Toolkit
          </ScrambleLink>
          <ScrambleLink href="#recognition" onClick={close}>
            Recognition
          </ScrambleLink>
          <a href="#contact" className="nav-cta" onClick={close}>
            Let's talk <span>↗</span>
          </a>
        </div>

        <button
          type="button"
          className="menu-btn"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
    </header>
  );
}

/* Thin bar fixed at the top of the screen that fills as the page scrolls */
function ScrollLine() {
  const fillRef = useRef(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="progress-track" aria-hidden="true">
      <span className="progress-fill" ref={fillRef} />
    </div>
  );
}

function MotionToggle({ motionOff, onToggle }) {
  return (
    <button
      type="button"
      className="motion-toggle"
      onClick={onToggle}
      aria-pressed={motionOff}
    >
      <i /> Motion {motionOff ? "off" : "on"}
    </button>
  );
}

function Hero() {
  // Put your portrait at  public/profile.jpg  (dark / plain background works best)
  const [imgOk, setImgOk] = useState(true);

  return (
    <section id="top" className="hero">
      <div className="hero-photo">
        <div className="hero-photo-inner">
          {imgOk ? (
            <img
              src={profileImg}
              alt="Muhammad Sudais"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="hero-photo-fallback" />
          )}
        </div>
      </div>
      <div className="hero-vignette" />

      <div className="hero-chrome">
        <div className="hero-top mono">
          <span>
            <b className="dot" /> Engineer. Builder. Student.
          </span>
          <span>Based in Pakistan · Thinking beyond</span>
        </div>

        <div className="hero-side">
          <ScrambleText className="mono accent" playOnLoad>
            01 / Presence
          </ScrambleText>
          <span className="plus">+</span>
          <p className="mono">
            Engineering
            <br />
            Development
            <br />
            Problem solving
          </p>
        </div>

        <div className="hero-bottom mono">
          <a href="#about" className="scroll-cue">
            <i /> Scroll to discover <span>↓</span>
          </a>
          <span className="hero-bottom-mid">Software engineering student</span>
          <span>An ongoing exploration ↗</span>
        </div>
      </div>

      <div className="hero-center">
        <p className="hero-kicker mono">A human perspective on technology</p>

        <h1 className="hero-title">
          Muhammad <em>Sudais</em>
        </h1>

        <p className="hero-sub">
          I build full-stack products, compete in tech,
          <br />
          and turn ideas into software people use.
        </p>

        <div className="hero-actions">
          <a href="#work" className="button button-pill">
            Explore my work <span>↓</span>
          </a>
          <a href="#contact" className="link-underline">
            Start a conversation <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="stats-strip container reveal">
      <div className="stat">
        <strong>04</strong>
        <span>featured projects built end to end</span>
      </div>
      <div className="stat">
        <strong>
          1<em>st</em>
        </strong>
        <span>position, AI &amp; tech prototype</span>
      </div>
      <div className="stat">
        <strong>
          2<em>nd</em>
        </strong>
        <span>position, Bit &amp; Byte hackathon</span>
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((i) => (
          <div className="marquee-group" key={i}>
            {row.map((w, idx) => (
              <span key={`${i}-${idx}`}>
                {w}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ index, label, children, lead }) {
  return (
    <div className="section-head reveal">
      <p className="mono eyebrow">
        {index} / {label}
      </p>
      <h2>{children}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

function About() {
  const [active, setActive] = useState(0);
  const p = perspectives[active];

  return (
    <section id="about" className="section container">
      <SectionHead index="01" label="The person behind the work">
        Technology is the starting point. <em>People are the point.</em>
      </SectionHead>

      <div className="about-grid">
        <div className="about-copy reveal">
          <p className="about-lead">
            I connect engineering, design, and problem solving.
          </p>
          <p>
            I'm Muhammad Sudais, a Software Engineering student at Abdul Wali
            Khan University Mardan and a full-stack developer passionate about
            creating practical, user-focused applications.
          </p>
          <p>
            From frontend interfaces to backend APIs and database integration, I
            take ideas through the whole development process and turn them into
            working products. Outside development, I take part in technology
            competitions and contribute to my department as a CCPC Ambassador.
          </p>
        </div>

        <div className="perspective reveal">
          <p className="mono muted">
            Three disciplines. One perspective. 0{active + 1} / 03
          </p>
          <h3 key={p.key}>{p.title}</h3>
          <p className="perspective-text" key={p.text}>
            {p.text}
          </p>
          <div
            className="chips"
            role="tablist"
            aria-label="Choose a perspective"
          >
            {perspectives.map((item, i) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`chip ${i === active ? "is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                {item.key} ↗
              </button>
            ))}
          </div>
          <p className="mono muted">Choose a perspective.</p>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="section container">
      <SectionHead
        index="02"
        label="Selected work"
        lead="From university platforms to healthcare apps. A few things I've helped bring to life."
      >
        Ideas are a start. <em>This is the work.</em>
      </SectionHead>

      <div className="work-list">
        {projects.map((project) => (
          <a
            key={project.number}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="work-row reveal"
          >
            <span className="work-number mono">{project.number}</span>

            <div className="work-body">
              <p className="mono muted">{project.category}</p>
              <h3>{project.title}</h3>
              <p className="work-desc">{project.description}</p>
              <div className="tags">
                {project.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>

            <span className="work-link">
              {project.linkText}
              <b>↗</b>
            </span>
          </a>
        ))}
      </div>

      <div className="more reveal">
        <a
          href="https://github.com/sudais122?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="text-link"
        >
          Explore all GitHub repositories ↗
        </a>
      </div>
    </section>
  );
}

function Toolkit() {
  const [active, setActive] = useState(0);
  const t = toolkit[active];

  return (
    <section id="toolkit" className="section container">
      <SectionHead index="03" label="How I think & work">
        How I work. <em>From idea to impact.</em>
      </SectionHead>

      <div className="toolkit reveal">
        <div className="toolkit-side">
          <p className="mono muted">
            Choose a discipline. Follow the thinking.
          </p>
          <div className="tabs">
            {toolkit.map((item, i) => (
              <button
                key={item.key}
                type="button"
                className={`tab ${i === active ? "is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="mono">0{i + 1}</span>
                {item.key}
              </button>
            ))}
          </div>

          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s}>
                <span className="mono">0{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>

        <div className="toolkit-main" key={t.key}>
          <p className="mono eyebrow">
            0{active + 1} / {t.key}
          </p>
          <h3>{t.title}</h3>
          <p className="toolkit-text">{t.text}</p>
          <div className="skill-cloud">
            {t.skills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Recognition() {
  return (
    <section id="recognition" className="section container">
      <SectionHead
        index="04"
        label="Recognition"
        lead="Every competition, internship, and role is a chance to learn faster and build better."
      >
        Milestones that matter. <em>Impact is personal.</em>
      </SectionHead>

      <div className="awards">
        {achievements.map((a) => (
          <article className="award reveal" key={a.title}>
            <span className="award-big">{a.big}</span>
            <div>
              <p className="mono muted">{a.label}</p>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="thread reveal">
        Build something useful.
        <br />
        Help people understand it.
        <br />
        <em>Give it room to grow.</em>
      </p>
    </section>
  );
}

function Journey() {
  return (
    <section className="section container">
      <SectionHead index="05" label="Interlude · Still becoming">
        Started with code. <em>Kept asking why.</em>
      </SectionHead>

      <div className="timeline">
        {journey.map((j) => (
          <div className="time-item reveal" key={j.when}>
            <span className="mono time-when">{j.when}</span>
            <h3>{j.title}</h3>
            <p>{j.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container contact-inner reveal">
        <p className="mono eyebrow">
          06 / The next chapter · Let's make it matter
        </p>
        <h2>
          Something great starts with <em>a hello.</em>
        </h2>
        <p className="contact-text">
          Products, collaborations, opportunities. If our worlds overlap, I'd
          love to hear from you.
        </p>
        <div className="hero-actions">
          <a
            href="https://www.linkedin.com/in/muhammad-sudais-15305a317"
            target="_blank"
            rel="noreferrer"
            className="button button-primary"
          >
            Let's connect <span>↗</span>
          </a>
          <a
            href="https://github.com/sudais122"
            target="_blank"
            rel="noreferrer"
            className="button button-ghost"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#top" className="brand">
          Muhammad Sudais.
        </a>
        <div className="footer-links mono">
          <a
            href="https://www.linkedin.com/in/muhammad-sudais-15305a317"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/sudais122"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
      <div className="container footer-bottom mono muted">
        <span>© 2026 Muhammad Sudais</span>
        <span>Built with intent. Always evolving.</span>
        <span>Pakistan ↗ The world</span>
      </div>
    </footer>
  );
}

export default function App() {
  const appRef = useRef(null);
  const [motionOff, setMotionOff] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useGSAP(
    () => {
      if (motionOff) return;

      /* ---- Intro ---- */
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-photo-inner", {
          opacity: 0,
          scale: 1.18,
          duration: 1.8,
          ease: "power2.out",
        })
        .from(
          ".hero-top, .hero-side, .hero-bottom",
          { opacity: 0, y: 14, duration: 0.7, stagger: 0.1 },
          "-=1.3",
        )
        .from(".hero-kicker", { y: 16, opacity: 0, duration: 0.6 }, "-=0.9")
        .from(".hero-title", { y: 70, opacity: 0, duration: 1.1 }, "-=0.7")
        .from(
          ".hero-sub, .hero-actions",
          { y: 22, opacity: 0, duration: 0.7, stagger: 0.14 },
          "-=0.6",
        );

      /* ---- Scroll effect on the hero image (and text) ---- */
      const heroScroll = {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      };

      gsap.fromTo(
        ".hero-photo",
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px) brightness(1)",
        },
        {
          yPercent: 18,
          scale: 1.22,
          opacity: 0.12,
          filter: "blur(8px) brightness(0.6)",
          ease: "none",
          scrollTrigger: heroScroll,
        },
      );

      gsap.to(".hero-center", {
        yPercent: -28,
        opacity: 0,
        ease: "none",
        scrollTrigger: { ...heroScroll, end: "70% top" },
      });

      gsap.to(".hero-chrome", {
        opacity: 0,
        ease: "none",
        scrollTrigger: { ...heroScroll, end: "40% top" },
      });

      /* ---- Section reveals ---- */
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    },
    { scope: appRef, dependencies: [motionOff], revertOnUpdate: true },
  );

  return (
    <div ref={appRef} className={motionOff ? "motion-off" : ""}>
      <ScrollLine />
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <Marquee />
        <About />
        <Work />
        <Toolkit />
        <Recognition />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <MotionToggle
        motionOff={motionOff}
        onToggle={() => setMotionOff((v) => !v)}
      />
    </div>
  );
}
