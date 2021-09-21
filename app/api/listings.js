import client from "./client";

const endpoint = "/listings";
// const getListings = () => client.get(endpoint);

function getListings() {
  return {
    ok: true,
    data: [
      {
        id: 1,
        title: "Home Stand",
        images: [
          {
            url: "https://picsum.photos/id/217/536/354",
            thumbnailUrl: "https://picsum.photos/id/217/536/354",
          },
        ],
        price: 200,
        categoryId: 232,
        userId: 11,
        location: {
          latitude: 65.5565,
          longitude: 99.45454,
        },
      },
      {
        id: 2,
        title: "Bed Stand",
        images: [
          {
            url: "https://picsum.photos/id/227/536/354",
            thumbnailUrl: "https://picsum.photos/id/227/536/354",
          },
        ],
        price: 200,
        categoryId: 232,
        userId: 11,
        location: {
          latitude: 65.5565,
          longitude: 98.45454,
        },
      },
      {
        id: 3,
        title: "Bed Stand",
        images: [
          {
            url: "https://picsum.photos/id/237/536/354",
            thumbnailUrl: "https://picsum.photos/id/237/536/354",
          },
        ],
        price: 200,
        categoryId: 232,
        userId: 11,
        location: {
          latitude: 65.5565,
          longitude: 98.45454,
        },
      },
      {
        id: 4,
        title: "Bed Stand",
        images: [
          {
            url: "https://picsum.photos/id/247/536/354",
            thumbnailUrl: "https://picsum.photos/id/247/536/354",
          },
        ],
        price: 200,
        categoryId: 232,
        userId: 11,
        location: {
          latitude: 65.5565,
          longitude: 98.45454,
        },
      },
      {
        id: 5,
        title: "Bed Stand",
        images: [
          {
            url: "https://picsum.photos/id/257/536/354",
            thumbnailUrl: "https://picsum.photos/id/257/536/354",
          },
          {
            url: "https://picsum.photos/id/237/536/354",
            thumbnailUrl: "https://picsum.photos/id/237/536/354",
          },
        ],
        price: 200,
        categoryId: 232,
        userId: 11,
        location: {
          latitude: 65.5565,
          longitude: 98.45454,
        },
      },
      {
        id: 6,
        title: "Bed Stand",
        images: [
          {
            url: "https://picsum.photos/id/267/536/354",
            thumbnailUrl: "https://picsum.photos/id/267/536/354",
          },
        ],
        price: 200,
        categoryId: 232,
        userId: 11,
        location: {
          latitude: 65.5565,
          longitude: 98.45454,
        },
      },
      {
        id: 7,
        title: "Bed Stand",
        images: [
          {
            url: "https://picsum.photos/id/277/536/354",
            thumbnailUrl: "https://picsum.photos/id/237/536/354",
          },
        ],
        price: 200,
        categoryId: 232,
        userId: 11,
        location: {
          latitude: 65.5565,
          longitude: 98.45454,
        },
      },
    ],
  };
}

const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", lisitng.category.value);
  data.append("description", lisitng.description);

  lisitng.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (listing.location)
    data.append("location", JSON.stringify(listing.location));

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};
export default { getListings, addListing };
