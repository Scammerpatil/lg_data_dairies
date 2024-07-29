"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const useTransition = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Start the progress bar on path change
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }

    return () => {
      NProgress.done();
    };
  }, [pathname, searchParams, loading]);

  useEffect(() => {
    // Simulate loading state
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // Adjust timing as needed

    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [pathname, searchParams]);
};

export default useTransition;
