import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Features from '@/components/Features';

// In your parent component
const peopleData = {
  title: "People",
  subtitle: "Relationship-focused Meeting Assistant",
  logo_path: "/people/logo.svg",
  cards: [
    {
      title: "Be more present in meetings",
      subtitle: "Never take notes on a video call again. Automatically receive human-quality meeting notes after your meetings.",
      image_path: "/people/1.png",
      image_scale: 0.9 // Add scale factor for each image
    },
    {
      title: "Perfect relationship recall",
      subtitle: "Be at ease. Day.ai remembers everything about the people you meet and email. Search to find any detail.",
      image_path: "/people/2.png",
      image_scale: 0.7
    },
    {
      title: "Follow-ups, finished",
      subtitle: "Just press send on an auto-generated follow up email with meeting highlights and action items written in a human tone.",
      image_path: "/people/3.png",
      image_scale: 0.8
    },
    {
      title: "All of your relationships, in one place",
      subtitle: "Share contacts and relationship history across your team.",
      image_path: "/people/4.png",
      image_scale: 0.9
    },
    {
      title: "Follow up reminders",
      subtitle: "Nothing slips through the cracks. Day.ai will remind you to follow up at the right time.",
      image_path: "/people/5.png",
      image_scale: 0.88
    }
  ]
};

const pipelinesData = {
  title: "Pipelines",
  subtitle: "Automatically-organized CRM",
  logo_path: "/pipelines/logo.svg", // Assuming you have this logo
  cards: [
    {
      title: "Your pipeline, updated",
      subtitle: "Just had a great meeting? The deal is created automatically and sits in the right stage.",
      image_path: "/pipelines/1.png",
      image_scale: 1
    },
    {
      title: "Keep everyone aligned",
      subtitle: "Share your pipeline update async. Use meeting time to strategize.",
      image_path: "/pipelines/2.png",
      image_scale: 0.76
    },
    {
      title: "Deliver a great experience",
      subtitle: "No need to manually update, once tasks are completed, the deal moves itself.",
      image_path: "/pipelines/3.png",
      image_scale: 0.8
    },
    {
      title: "Your forecast on demand",
      subtitle: "Automatic forecast generation keeps everyone up to date.",
      image_path: "/pipelines/4.png",
      image_scale: 1
    }
  ]
};

const pagesData = {
  title: "Pages",
  subtitle: "Customer-centric Knowledge Base",
  logo_path: "/pages/logo.svg", // Assuming you have this logo
  cards: [
    {
      title: "Communicate trends and patterns",
      subtitle: "Tell the right story with objective sources from conversations.",
      image_path: "/pages/1.png",
      image_scale: 0.76
    },
    {
      title: "Prioritize effectively",
      subtitle: "Make fast decisions on what to work on next by listening to customers.",
      image_path: "/pages/2.png",
      image_scale: 0.9
    },
    {
      title: "Collaborate with prospects and customers",
      subtitle: "Stay aligned on next steps, communicate effectively - even when you're not in the room.",
      image_path: "/pages/3.png",
      image_scale: 0.85
    },
    {
      title: "Organize marketing assets",
      subtitle: "Save customer quotes and content ideas to speed up creation.",
      image_path: "/pages/4.png",
      image_scale: 0.9
    },
    {
      title: "Create documentation",
      subtitle: "Explaining yourself over and over? Let Day.ai turn your repetition into documentation.",
      image_path: "/pages/5.png",
      image_scale: 0.9
    }
  ]
};

// Add this new component after the Landing component
const AnimatedCRM = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  const customerText = "Customer";
  const relationshipManagementText = "Relationship Management";
  const intelligenceText = "Intelligence";
  const totalSteps = relationshipManagementText.length + intelligenceText.length + 15;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let timer: number | null = null;
    if (isVisible) {
      timer = window.setInterval(() => {
        setAnimationStep((prev) => (prev < totalSteps) ? prev + 1 : prev);
      }, 80);
    }

    return () => {
      if (timer !== null) {
        window.clearInterval(timer);
      }
    };
  }, [isVisible, totalSteps]);

  const showStrikethrough = animationStep > relationshipManagementText.length + 5;
  const strikethroughProgress = Math.min(100, (animationStep - relationshipManagementText.length - 5) * 10);
  const showIntelligence = animationStep > relationshipManagementText.length + 10;

  return (
    <div ref={componentRef} className="flex-grow flex flex-col items-center justify-center text-center px-4 mb-20">
      <h1 className="text-5xl font-bold mb-4 relative">
        <span className="text-black">{customerText}</span>{' '}
        <span className="relative inline-block">
          <span className={`relative ${showStrikethrough ? 'text-gray-400' : 'text-blue-500'}`}>
            {relationshipManagementText.slice(0, Math.min(animationStep, relationshipManagementText.length))}
            {showStrikethrough && (
              <span className="absolute inset-0 flex items-center overflow-hidden">
                <svg className="absolute left-0 w-full h-6" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path
                    d={`M0,4 Q25,8 50,4 T100,4`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    className="text-blue-500"
                    style={{
                      strokeDasharray: '100',
                      strokeDashoffset: 100 - strikethroughProgress,
                      transition: 'stroke-dashoffset 0.1s ease-out'
                    }}
                  />
                </svg>
              </span>
            )}
          </span>
          {showIntelligence && (
            <span className="text-blue-500 absolute text-5xl font-bold" style={{ top: '-1.2em', left: '2em', whiteSpace: 'nowrap' }}>
              {intelligenceText.slice(0, animationStep - relationshipManagementText.length - 10)}
            </span>
          )}
        </span>
      </h1>
    </div>
  );
};

const Landing = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const artificialText = "Artificial";
  const customerText = "Customer";
  const totalSteps = artificialText.length + customerText.length + 25;

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep((prev) => (prev < totalSteps) ? prev + 1 : prev);
    }, 80);

    return () => clearInterval(timer);
  }, []);

  const showStrikethrough = animationStep > artificialText.length + 10;
  const strikethroughProgress = Math.min(100, (animationStep - artificialText.length - 10) * 10);
  const showCustomer = animationStep > artificialText.length + 21;


  return (
    <div className="min-h-screen bg-[#fcf9f8] flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logos/logo_ugly.png" alt="Wave logo" className="w-10 h-10" />
          <span className="text-xl font-bold">Wave</span>
        </div>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-full flex items-center">
          Get early access
          <ArrowRight size={16} className="ml-2" />
        </button>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-7xl font-bold mb-4 relative mt-48">
          <span className="relative inline-block">
            <span className={`relative ${showStrikethrough ? 'text-gray-400' : 'text-blue-500'}`}>
              {artificialText.slice(0, Math.min(animationStep, artificialText.length))}
              {showStrikethrough && (
                <span className="absolute inset-0 flex items-center overflow-hidden">
                  <svg className="absolute left-0 w-full h-8" viewBox="0 0 100 8" preserveAspectRatio="none">
                    <path
                      d={`M0,4 Q25,8 50,4 T100,4`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      className="text-blue-500"
                      style={{
                        strokeDasharray: '100',
                        strokeDashoffset: 100 - strikethroughProgress,
                        transition: 'stroke-dashoffset 0.1s ease-out'
                      }}
                    />
                  </svg>
                </span>
              )}
            </span>
            {showCustomer && (
              <span className="text-blue-500 absolute text-6xl font-bold" style={{ bottom: '100%', left: '100%', whiteSpace: 'nowrap' }}>
                <span className="block mb-2">
                  {customerText.slice(0, animationStep - artificialText.length - 21)}
                </span>
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute text-blue-500"
                  style={{ bottom: '-1em', left: '0em', transform: 'rotate(90deg) scaleX(-1)' }}
                >
                  <path
                    d="M10 30C10 21.7157 16.7157 15 25 15H30"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M25 10L30 15L25 20"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </span>
          {'    '}
          {'\u00A0\u00A0\u00A0\u00A0\u00A0'}
          Intelligence
        </h1>
        <p className="text-3xl text-gray-700 mb-10 font-bold">
          AI-native CRM that brings customers into every decision
        </p>
        <div className="mb-14">
          <p className="text-gray-500 mb-4 text-bold">Works seamlessly with:</p>
          <div className="flex space-x-12 justify-center items-center">
            <img src="/logos/gmail.svg" alt="Gmail" className="h-8" />
            <img src="/logos/teams.svg" alt="Microsoft Teams" className="h-8" />
            <img src="/logos/meet.svg" alt="Google Meet" className="h-8" />
            <img src="/logos/zoom.svg" alt="Zoom" className="h-8" />
            <div style={{ position: 'relative' }}>
              <img src="/logos/slack.svg" alt="Slack" className="h-8" />
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 text-xs text-gray-500 px-1 py-0.5 rounded-full whitespace-nowrap" style={{ zIndex: 1 }}>
                coming soon
              </div>
            </div>
          </div>
        </div>
        <button className="bg-gray-900 text-white px-6 py-3 rounded-full text-lg flex items-center mb-4">
          Get early access
          <ArrowRight size={20} className="ml-2" />
        </button>
        <p className="text-gray-500 text-sm text-bold">
          Join the waitlist to receive early access to Wave
        </p>

      </div>

      <div className="p-6 flex flex-col items-center">
        <div className="flex items-center mb-10 mt-10">
          <p className="text-gray-500 mr-2">Backed by</p>
          <img src="/logos/a16z.png" alt="a16z" className="h-14 align-middle" />
        </div>

        {/* Video placeholder */}
        <div className="w-full max-w-4xl mx-auto mb-40">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/VTzWuWY33BI"
              title="Wave CRM Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-screen"
              style={{ height: '50vh' }}
            ></iframe>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-bold mb-4">Reimagining CRM for the AI Age</h2>
          <p className="text-2xl mb-6">
            It's never been easier to capture, organize, analyze and share the conversations
            that grow your business.
          </p>
          <p className="text-2xl mb-12">
            <strong>Wave</strong> eliminates the complicated, manual interfaces of Legacy CRM, and
            keeps you connected to what your customers want.
          </p>

          <div className="flex justify-between items-start relative mb-40">
            <div className="w-[calc(50%-2rem)] pr-8">
              <h3 className="text-4xl font-bold text-gray-500 mb-4">Legacy CRM</h3>
              <p className="mb-4 font-bold text-gray-500 text-lg">
                Slows you down by forcing you to think the same way a computer thinks.
              </p>
              <p className="font-bold text-gray-500 text-lg mb-4">
                Like a complex series of tables and fields.
              </p>
              <img src="/images/flow_legacy_1.png" alt="Legacy CRM Flow 1" className="w-full mb-4" />
              <div className="flex justify-center mb-4">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(-30 0 0)">
                    <path d="M50 10C30 10 10 30 10 50" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
                    <path d="M10 50L20 40" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
                    <path d="M10 50L0 40" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
                  </svg>
              </div>
              <img src="/images/flow_legacy_2.png" alt="Legacy CRM Flow 2" className="w-full" />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-4xl font-semibold text-blue-500 mb-4">Vs.</h3>
              <div className="w-px bg-gray-300 h-full absolute top-16 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <div className="w-[calc(50%-2rem)] pl-8">
              <h3 className="text-4xl font-bold mb-4 text-black">Wave</h3>
              <p className="mb-4 font-bold text-black text-lg">
                Adapts to you. Your contacts and conversations are automatically synced to a new type of CRM.
              </p>
              <p className="text-black-600 font-semibold text-lg mb-4">
                Have conversations, let Wave do the rest.
              </p>
              <img src="/images/flow_wave_1.png" alt="Wave Flow 1" className="w-full mb-4" />
              <div className="flex justify-center mb-4">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(30 0 0)">
                  <path d="M10 10C30 10 50 30 50 50" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
                  <path d="M50 50L40 40" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
                  <path d="M50 50L60 40" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </div>
              <img src="/images/flow_wave_2.png" alt="Wave Flow 2" className="w-full" />
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center text-center px-4 mb-40">
        <div className="w-full max-w-4xl mx-auto mt-20 mb-20">
            <h2 className="text-2xl font-normal mb-6">
            Looking for a <span className="relative font-extrabold">
                faster, easier
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
            </span> way to grow your business?
            </h2>
            <button className="bg-gray-900 text-white text-xl px-8 py-4 rounded-full flex items-center mx-auto mb-4">
            Get early access
            <ArrowRight size={24} className="ml-2" />
            </button>
            <p className="text-gray-500 text-sm text-bold">
          Join the waitlist to receive early access to Wave
        </p>
        </div>
        </div>

      </div>

      <AnimatedCRM />
      <Features {...peopleData} />
      <Features {...pipelinesData} />
      <Features {...pagesData} />

      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 mb-40">
        <div className="w-full max-w-4xl mx-auto mt-20 mb-20">
            <h2 className="text-2xl font-normal mb-6">
            Looking for a <span className="relative font-extrabold">
                faster, easier
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
            </span> way to grow your business?
            </h2>
            <button className="bg-gray-900 text-white text-xl px-8 py-4 rounded-full flex items-center mx-auto mb-4">
            Get early access
            <ArrowRight size={24} className="ml-2" />
            </button>
            <p className="text-gray-500 text-sm text-bold">
          Join the waitlist to receive early access to Wave
        </p>
        </div>
        </div>

    </div>
  );
};

export default Landing;