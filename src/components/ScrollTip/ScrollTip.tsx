import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

interface ScrollTipProps {
  /**
   * The element ID to scroll to when "View More" is clicked
   */
  targetId: string;

  /**
   * Custom class for the View More button
   */
  viewMoreClassName?: string;

  /**
   * Custom class for the Scroll to Top button
   */
  scrollTopClassName?: string;
}

export const ScrollTip: React.FunctionComponent<ScrollTipProps> = ({
  targetId,
  viewMoreClassName = "",
  scrollTopClassName = "",
}) => {
  const [showViewMore, setShowViewMore] = useState<boolean>(!!targetId && true);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(!!targetId && false);
  const referencePointRef = useRef<number>(300);

  const handleScroll = useCallback(() => {
    if (!targetId) return;

    const scrollPosition = window.scrollY;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      referencePointRef.current = targetElement.getBoundingClientRect().top + window.scrollY;
    }

    if (scrollPosition >= referencePointRef.current) {
      setShowViewMore(false);
      setShowScrollTop(true);
    } else {
      setShowViewMore(true);
      setShowScrollTop(false);
    }
  }, [referencePointRef, targetId]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Run once on component mount to set initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, targetId]);

  const scrollToTarget = () => {
    if (!targetId) return;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showViewMore && (
        <div
          onClick={scrollToTarget}
          data-testid="view-more"
          className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white py-2 px-4 rounded-xl shadow-md flex items-center z-10 hover:bg-gray-100 transition-colors border border-gray-200 h-10 ${viewMoreClassName}`}
          aria-label="View more content"
        >
          <span className="mr-2 text-cerulean-500 font-bold">View More</span>
          <ChevronDown className="text-cerulean-500 h-5 w-5" />
        </div>
      )}

      {showScrollTop && (
        <div
          onClick={scrollToTop}
          data-testid="scroll-to-top"
          className={`h-10 w-10 fixed bottom-8 right-8 bg-white p-3 rounded-xl shadow-md flex items-center z-10 hover:bg-gray-100 transition-colors border border-gray-200 ${scrollTopClassName}`}
          aria-label="Scroll to top"
        >
          <ChevronUp className="text-cerulean-500 h-5 w-5" />
        </div>
      )}
    </>
  );
};

export default ScrollTip;
