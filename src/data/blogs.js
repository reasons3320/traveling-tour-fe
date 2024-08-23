function limitCharacters(text, limit = 50) {
  if (text.length <= limit) {
    return text;
  }
  return text.substring(0, limit) + "...";
}
export const blogs = [
  {
    id: 1,
    email: "reasons123@gmail.com",
    photo:
      "https://images.unsplash.com/photo-1720521181253-17620a1f1a35?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: limitCharacters(
      "There’s something inherently soothing about the sound of waves crashing against the shore, the feel of warm sand between your toes, and the sight of a horizon where the sky meets the sea. Beach travel offers a unique blend of relaxation and adventure, and my recent trip to the coast was a perfect example of this delightful duality.",
      100
    ),
    likes: 10,
    createDate: "24-5-2024",
  },
  {
    id: 2,
    email: "reasons456@gmail.com",
    photo:
      "https://plus.unsplash.com/premium_photo-1720519666567-f7dbdcde83a0?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: limitCharacters(
      "As the day drew to a close, we gathered on the beach to watch the sunset. There’s a certain magic to watching the sun dip below the horizon, painting the sky with hues of orange, pink, and purple. It was a serene moment, a perfect end to a day filled with activity. We sat in quiet contemplation, feeling a deep sense of connection to the natural world around us.",
      100
    ),
    likes: 17,
    createDate: "25-5-2024",
  },
  {
    id: 3,
    email: "reasons789@gmail.com",
    photo:
      "https://images.unsplash.com/photo-1720951068848-38fa1a084ad4?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: limitCharacters(
      "No beach trip is complete without indulging in the local cuisine. The seafood was fresh and delicious, with a variety of dishes that showcased the region’s culinary prowess. We enjoyed everything from grilled fish to shrimp tacos, each bite bursting with flavor. Dining with a view of the ocean made the experience even more special, as the sound of the waves provided a soothing soundtrack to our meals.",
      100
    ),
    likes: 7,
    createDate: "26-5-2024",
  },
];
