"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, useEffect } from "react";

// Import custom Button component from the UI directory
import { Button } from "@/components/ui/button";

// Define a TypeScript interface for the joke response
interface JokeResponse {
  setup: string;
  punchline: string;
}

// Default export of the RandomJokeComponent function
export default function RandomJokeComponent() {
  // State hook for managing the current joke
  const [joke, setJoke] = useState<string>("");

  // Effect hook to fetch a joke when the component mounts
  useEffect(() => {
    fetchJoke();
  }, []); // Empty dependency array ensures this runs once on mount

  // Async function to fetch a random joke from the API
  async function fetchJoke(): Promise<void> {
    try {
      // Make a GET request to the joke API
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data: JokeResponse = await response.json();
      // Update state with the fetched joke
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (error) {
      console.error("Error fetching joke:", error); // Log any errors
      // Set an error message if the fetch fails
      setJoke("Failed to fetch joke. Please try again.");
    }
  }

  // JSX return statement rendering the random joke UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#1d2671] via-[#c33764] to-[#f27121] p-4">
      {/* Center the joke card within the screen */}
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg">
        {/* Header with title */}
        <h1 className="text-4xl font-extrabold mb-6 text-[#333] tracking-wide text-center">
          😂 Random Joke 🎉
        </h1>
        {/* Display the joke or a loading message */}
        <div className="bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4] rounded-lg p-6 mb-8 text-[#444] text-lg font-medium shadow-lg">
          {joke || "Loading..."}
        </div>
        {/* Button to fetch a new joke */}
        <Button
          onClick={fetchJoke}
          className="bg-gradient-to-br from-[#1d2671] via-[#c33764]  to-[#f27121] text-white font-bold py-3 px-6 rounded-full text-xl transition duration-300 ease-in-out shadow-md transform hover:scale-105"
        >
          😂 Get New Joke 😂
        </Button>
      </div>
      {/* Footer text */}
      <div className="text-white font-semibold mt-8">
        Created by Asadullah Shafique
      </div>
    </div>
  );
}