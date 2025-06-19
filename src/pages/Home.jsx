import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLoaderData } from "react-router";
import Banner from "../components/Banner";
import CallToAction from "../components/CallToAction";
import NewFoundRoommate from "./FeatureArtifacts";
import ArtifactsHero from "../components/ArtifactsHero";

const Home = () => {
  const roommates = useLoaderData();
  return (
    <div className="min-h-screen">
      <Banner></Banner>
      <NewFoundRoommate roommates={roommates}></NewFoundRoommate>
       <Outlet></Outlet>
      
      <ArtifactsHero></ArtifactsHero>
      <CallToAction></CallToAction>
     
    </div>
  );
};

export default Home;
