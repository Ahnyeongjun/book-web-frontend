"use client";

import { useEffect, useState } from "react";
import ContactUsToggle from "./components/ContactUsToggle";
import EventPromotionForm from "./components/eventPromotion/EventPromotionForm";
import GeneralInquiry from "./components/generalInquiry/GeneralInquiry";

const ContactUsPage = () => {
  const [isEvent, setIsEvent] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="relative flex size-full flex-col">
      <ContactUsToggle isEvent={isEvent} setIsEvent={setIsEvent} />
      {isEvent ? <EventPromotionForm /> : <GeneralInquiry />}
    </section>
  );
};

export default ContactUsPage;
