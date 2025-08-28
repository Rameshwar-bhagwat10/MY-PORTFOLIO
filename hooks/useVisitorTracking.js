import { useState, useEffect } from "react";

export const useVisitorTracking = () => {
  const [visitorData, setVisitorData] = useState({
    totalVisitors: 0,
    uniqueVisitors: 0,
    isNewVisitor: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Register this visit and get updated data
        const postResponse = await fetch("/api/visitors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!postResponse.ok) throw new Error("Failed to register visit");

        const updatedData = await postResponse.json();

        setVisitorData({
          ...updatedData,
          loading: false,
          error: null,
        });

        // Store in localStorage for offline display
        localStorage.setItem(
          "portfolioVisitorData",
          JSON.stringify(updatedData)
        );
      } catch (error) {
        console.error("Error tracking visitor:", error);

        // Fallback to localStorage if API fails
        const storedData = localStorage.getItem("portfolioVisitorData");
        if (storedData) {
          const parsed = JSON.parse(storedData);
          setVisitorData({
            ...parsed,
            loading: false,
            error: "Using cached data",
          });
        } else {
          setVisitorData({
            totalVisitors: 1,
            uniqueVisitors: 1,
            isNewVisitor: true,
            loading: false,
            error: error.message,
          });
        }
      }
    };

    // Only track on client side
    if (typeof window !== "undefined") {
      trackVisitor();
    }
  }, []);

  return visitorData;
};
