import React from 'react';

const ArtifactsHero = () => {
  return (
    <div className="container mx-auto py-12">
      {/* Artisan's Corner Section */}
      <div className="bg-base-200 rounded-lg shadow-lg p-8 mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Artisan's Corner</h1>
        <p className="text-lg mb-6">
          Explore the craftsmanship and artistic techniques behind historical artifacts. Learn about the materials, tools, and cultural influences that shaped these masterpieces.
        </p>
        
        <div className="divider">Discover Artistry</div>
        
        <div className="flex justify-center mt-6">
          <button className="btn btn-primary">View Artifacts</button>
        </div>
      </div>

      {/* Chronicles of Discovery Section */}
      <div className="bg-neutral text-neutral-content rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-secondary mb-4">Chronicles of Discovery</h1>
        <p className="text-lg mb-6">
          Read fascinating stories about how famous artifacts were unearthed and the impact of these discoveries on our understanding of history. From accidental finds to dedicated expeditions.
        </p>
        
        <div className="flex justify-end">
          <button className="btn btn-secondary">Read Discoveries</button>
        </div>
      </div>
    </div>
  );
};

export default ArtifactsHero;