"use client";

import { useEffect, useState } from "react";

const REFERRAL_KEY = "aquiestoy_referral_code";

export function useReferral() {
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check if we have a code in the URL
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlCode = params.get("ref");

      if (urlCode) {
        // 2. Persist to localStorage if found
        localStorage.setItem(REFERRAL_KEY, urlCode);
        setReferralCode(urlCode);
        
        // Clean up URL (optional, but cleaner)
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
      } else {
        // 3. Fallback to existing code in localStorage
        const storedCode = localStorage.getItem(REFERRAL_KEY);
        if (storedCode) {
          setReferralCode(storedCode);
        }
      }
    }
  }, []);

  return referralCode;
}
