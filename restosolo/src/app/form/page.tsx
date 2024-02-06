"use client";

import React, { useState } from "react";
import Rating from "@mui/material/Rating";

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rating: 0,
  });

  const [value, setValue] = React.useState<number>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://resto-solo-app-production.up.railway.app/api/testimonial/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Handle successful submission (redirect, display a success message, etc.)
        console.log("Form submitted successfully");
        window.location.reload();
      } else {
        // Handle error in submission
        console.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <section id="feedback" className="pt-30 pb-32 bg-primary">
      <div className="container">
        <div className="w-full px-4">
          <div className="max-w-xl mx-auto text-center mb-16">
            <h4 className="font-semibold text-lg text-orange-600 mb-2">
              Feedback
            </h4>
            <h2 className="font-bold text-3xl mb-4 sm:text-4xl lg:text-5xl text-white">
              Share Your Experience with Us
            </h2>
            <p className="font-medium text-md text-white opacity-70 md:text-lg">
              We look forward to hearing your stories and sharing them with the
              world, as we continue to weave the narrative of our restaurant's
              legacy together.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full lg:w-2/3 lg:mx-auto">
            <div className="w-full px-4 mb-8">
              <label
                htmlFor="name"
                className="text-base font-bold text-white opacity-70"
              >
                Rating
              </label>
              <div className="mb-8 border-solid bg-white rounded-md border-2 w-32 px-30">
                <Rating
                  name="simple-controlled"
                  value={formData.rating}
                  onChange={(value, newValue) => {
                    setFormData({ ...formData, rating: newValue ?? 0 });
                  }}
                />
              </div>
              <label
                htmlFor="name"
                className="text-base font-bold text-white opacity-70"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-200 text-black p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary"
              />
            </div>
            <div className="w-full px-4 mb-8">
              <label
                htmlFor="message"
                className="text-base font-bold text-white opacity-70"
              >
                Testimonial
              </label>
              <textarea
                id="message"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-slate-200 text-black p-3 rounded-md focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary h-32"
              ></textarea>
            </div>
          </div>
          <div className="w-full px-4">
            <button
              type="submit"
              className="text-base font-semibold text-white bg-orange-600 py-3 px-8 rounded-full w-full hover:opacity-80 hover:shadow-lg transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TestimonialForm;
