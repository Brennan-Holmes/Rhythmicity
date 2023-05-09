import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import CreateArtistModal from "@/components/CreateArtistModal";

interface Artist {
  id: number;
  name: string;
  bio: string;
}

export default function Home() {
  const [featuredArtist, setFeaturedArtist] = useState<Artist | null>(null);
  const [showCreateArtistForm, setShowCreateArtistForm] = useState(false);
  const [newArtistName, setNewArtistName] = useState("");
  const [newArtistImage, setNewArtistImage] = useState("");

  useEffect(() => {
    const fetchFeaturedArtist = async () => {
      try {
        const res = await fetch("/api/getFeaturedArtist");
        const data = await res.json();
        setFeaturedArtist(data.artist);
      } catch (error) {
        console.error("Error fetching featured artist:", error);
      }
    };

    fetchFeaturedArtist();
  }, []);

  const handleCreateArtist = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/createArtist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newArtistName }),
      });

      if (res.ok) {
        const newArtist = await res.json();
        setFeaturedArtist(newArtist);
        setShowCreateArtistForm(false);
      } else {
        console.error("Error creating artist:", res.status);
      }
    } catch (error) {
      console.error("Error creating artist:", error);
    }
  };

  const handleCloseCreateArtistForm = () => {
    setShowCreateArtistForm(false);
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <Head>
        <title>SoundSphere</title>
      </Head>

      <header className="bg-slate-800 text-white py-3 px-4 relative">
        <div className="absolute bottom-0 left-0 mb-3 ml-3">
          <form onSubmit={handleCreateArtist}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newArtistName}
                onChange={(e) => setNewArtistName(e.target.value)}
                className="border-2 border-gray-300 text-white bg-slate-800 p-2 rounded-md flex-grow"
                placeholder="Enter artist name"
                required
              />
              <input
                type="text"
                value={newArtistImage}
                onChange={(e) => setNewArtistImage(e.target.value)}
                className="border-2 border-gray-300 text-white bg-slate-800 p-2 rounded-md"
                placeholder="Enter artist Image"
                required
              />
              <button
                type="submit"
                className="bg-blue-800 rounded-md px-2 py-2 text-white hover:bg-blue-900 hover:duration-300 hover:transition-all hover:scale-105"
              >
                Create Artist
              </button>
            </div>
          </form>
        </div>
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl">SOUNDSPHERE</h1>
            <div className="flex space-x-2">
              <SignedOut>
                <Link
                  href={"/signin/signinpage"}
                  className="bg-white text-blue-900 font-bold py-1 px-3 rounded-md"
                >
                  Login
                </Link>
                <Link
                  href={"/signup/signuppage"}
                  className="bg-white text-blue-900 font-bold py-1 px-3 rounded-md"
                >
                  Sign Up
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow p-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl mb-6 text-black">Welcome to SoundSphere!</h2>
          <p className="text-lg mb-6 text-black">
            The ultimate platform for artists and beat makers to collaborate and
            share their sounds.
          </p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 hover:transition-all hover:duration-300 hover:scale-105">
            Join Now
          </button>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl mb-6 text-black">Featured Tracks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 space-x-2 rounded-md">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white p-2 rounded shadow hover:transition-all hover:duration-300 hover:scale-105"
              >
                <Image
                  src="/austin-neill-hgO1wFPXl3I-unsplash.jpg"
                  alt="Track thumbnail"
                  width={1000}
                  height={400}
                  priority
                />
                <h3 className="text-xl mt-4 text-black">Track Title {item}</h3>
                <p className="text-sm text-black">Artist Name {item}</p>
              </div>
            ))}

            <section className="mb-12">
              <h2 className="text-2xl mb-6 text-black">
                Featured Artist of the Week
              </h2>
              {featuredArtist ? (
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-xl text-black">{featuredArtist.name}</h3>
                  <p className="text-sm text-black">{featuredArtist.bio}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </section>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl mb-6 text-black">Latest News</h2>
          <ul className="space-y-6">
            {["News Item 1", "News Item 2", "News Item 3"].map((item) => (
              <li key={item} className="list-none">
                <a href="#" className="text-blue-600 hover:underline-none">
                  <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-xl text-black">{item}</h3>
                    <p className="text-sm text-black">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed tincidunt odio sit amet eros fringilla, ut facilisis
                      lectus consequat.
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="mt-auto text-center bg-blue-900 p-4">
        <p>
          &copy; {new Date().getFullYear()} SoundSphere. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
