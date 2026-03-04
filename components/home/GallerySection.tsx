"use client";

import React from "react";

type GalleryItem = {
  url: string;
  type: "image" | "video";
};

export default function GallerySection({ items }: { items: GalleryItem[] }) {
  return (
    <section className="py-12">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, i) =>
          item.type === "image" ? (
            <img key={i} src={item.url} alt="" className="rounded-lg" />
          ) : (
            <video key={i} src={item.url} controls className="rounded-lg" />
          )
        )}
      </div>
    </section>
  );
}
