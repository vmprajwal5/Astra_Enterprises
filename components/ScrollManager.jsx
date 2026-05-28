'use client';

import { useEffect, useState } from 'react';

export default function ScrollManager() {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setProgress(scrolled);
      setShowBackToTop(winScroll > 400);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const animationClasses = [
      '.fade-in-up', '.slide-in-right',
      '.animate-fade-up', '.animate-fade-left', '.animate-scale'
    ];
    const selector = animationClasses.join(', ');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Apply stagger delay if specified
          const delay = entry.target.getAttribute('data-stagger-delay');
          if (delay) {
            entry.target.style.transitionDelay = delay;
          }
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const animatedElements = document.querySelectorAll(selector);
    animatedElements.forEach(el => observer.observe(el));

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.matches && node.matches(selector)) {
              observer.observe(node);
            }
            const children = node.querySelectorAll ? node.querySelectorAll(selector) : [];
            children.forEach(el => observer.observe(el));
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div id="progress-bar" style={{ width: `${progress}%` }} />
      <button
        id="back-to-top"
        onClick={scrollToTop}
        style={{ display: showBackToTop ? 'flex' : 'none' }}
      >
        ↑
      </button>
    </>
  );
}
