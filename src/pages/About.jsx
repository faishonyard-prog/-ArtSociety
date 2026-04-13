import React from 'react';

function About() {
  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-rose-100 rounded-[3rem] -z-10 rotate-3"></div>
          <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800" alt="Artist at work" className="rounded-3xl shadow-xl w-full object-cover aspect-[4/5]" />
        </div>
        <div className="space-y-6">
          <h1 className="text-5xl font-serif font-bold text-stone-900">Art Society Story</h1>
          <h2 className="text-xl text-rose-600 font-serif italic">The Hands Behind the Art</h2>
          <div className="space-y-4 text-stone-600 leading-relaxed text-lg font-light">
            <p>
              Hi, I'm Sakshi. My journey with art began as a small child, sketching in the margins of my notebooks. Today, it has blossomed into a lifelong passion for capturing human emotion and preserving memories.
            </p>
            <p>
              Every piece I create in my studio is born from a desire to tell a story. Whether it's a charcoal portrait of a loved one, or a resin coaster embedded with your wedding flowers, my goal is to craft artifacts of your life that you can hold and cherish.
            </p>
            <p>
              I believe in the power of handmade items in a digital world. There is an energy transfer from the artist's hands to the canvas that cannot be replicated by a machine.
            </p>
          </div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Signature_sample.svg" alt="Signature" className="h-16 pt-4 opacity-70" />
        </div>
      </div>
    </div>
  );
}

export default About;
