import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { SignedOut, SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import CreateArtistModal from "@/components/CreateArtistModal";
import {
  CircularProgress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Artist } from "@/interfaces/Artist";
import BoxForm from "@/components/BoxForm";

export default function Home() {
  const [featuredArtist, setFeaturedArtist] = useState<Artist | null>(null);
  // const [showCreateArtistForm, setShowCreateArtistForm] = useState(false);
  // const [newArtistName, setNewArtistName] = useState("");
  // const [newArtistImage, setNewArtistImage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  // Add a state variable to store the search query
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    const fetchFeaturedArtist = async () => {
      try {
        const res = await fetch("/api/getFeaturedArtist");
        const data = await res.json();
        setFeaturedArtist(data.artist);
        localStorage.setItem("featuredArtist", JSON.stringify(data.artist));
        localStorage.setItem(
          "featuredArtistMonth",
          new Date().getMonth().toString()
        );
      } catch (error) {
        console.error("Error fetching featured artist:", error);
      }
    };

    const storedFeaturedArtist = localStorage.getItem("featuredArtist");
    const storedFeaturedArtistMonth = localStorage.getItem(
      "featuredArtistMonth"
    );

    if (
      storedFeaturedArtist &&
      storedFeaturedArtistMonth === new Date().getMonth().toString()
    ) {
      setFeaturedArtist(JSON.parse(storedFeaturedArtist));
    } else {
      fetchFeaturedArtist();
    }
  }, []);

  const handleJoinNow = () => {
    if (user) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } else {
      router.push("/signup/signuppage");
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <Head>
        <title>Rhythmicity | Home</title>
      </Head>

      <header className="bg-slate-800 text-white py-3 px-4 sm:px-6 lg:px-8 relative">
        {user && (
          <div className="absolute bottom-0 left-0 mb-3 ml-3">
            <CreateArtistModal />
          </div>
        )}

        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-0">
              Rhythmicity
            </h1>
            <BoxForm />
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
          <h2 className="text-4xl mb-6 text-black font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Welcome to Rhythmicity!
            </span>
          </h2>
          {showAlert ? (
            <Alert status="error">
              <AlertIcon />
              {user ? (
                <>
                  <AlertTitle>Logged in!</AlertTitle>
                  <AlertDescription>
                    You are already signed in.
                  </AlertDescription>
                </>
              ) : (
                <>
                  <AlertTitle>Already signed up!</AlertTitle>
                  <AlertDescription>
                    You are already signed up.
                  </AlertDescription>
                </>
              )}
            </Alert>
          ) : null}
          <p className="text-lg mb-6 text-black">
            The ultimate platform for artists and beat makers to collaborate and
            share their sounds.
          </p>
          <button
            className="bg-blue-600 text-white py-4 px-6 rounded-md hover:bg-blue-700 hover:transition-all hover:duration-300 hover:scale-105 font-bold text-lg"
            onClick={handleJoinNow}
          >
            Join Now
          </button>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl mb-6 text-black">Featured Tracks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 space-x-2 rounded-md">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-slate-800 p-2 rounded shadow hover:transition-all hover:duration-300 hover:scale-105"
              >
                <Image
                  src="/austin-neill-hgO1wFPXl3I-unsplash.jpg"
                  alt="Track thumbnail"
                  width={1000}
                  height={400}
                  priority
                  style={{ width: "auto", height: "auto" }}
                />
                <h3 className="text-xl mt-4 text-white">Track Title {item}</h3>
                <p className="text-sm text-white">Artist Name {item}</p>
              </div>
            ))}

            <section className="mb-12">
              <h2 className="text-2xl mb-6 text-black">
                Featured Artist of the Week
              </h2>
              {featuredArtist ? (
                <div className="bg-slate-800 p-2 rounded shadow">
                  <Image
                    src={featuredArtist.image}
                    alt={featuredArtist.name}
                    width={500}
                    height={700}
                    style={{ width: "auto", height: "auto" }}
                  />
                  <h3 className="text-xl text-white">
                    Artist Name: {featuredArtist.name}
                  </h3>
                  <hr className="border" />
                  <p className="text-sm text-white">
                    Artist Bio: {featuredArtist.bio}
                  </p>
                  <p className="text-sm text-white">
                    Record Label: {featuredArtist.recordLabel}
                  </p>
                </div>
              ) : (
                <CircularProgress value={80} />
              )}
            </section>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl mb-6 text-black">Latest News</h2>
          <ul className="space-y-6 rounded-md">
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

      <footer className="mt-auto text-center bg-blue-900 text-white p-4">
        <p>
          &copy; {new Date().getFullYear()} SoundSphere. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
