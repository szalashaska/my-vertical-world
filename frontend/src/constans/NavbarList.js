const navbarList = [
  {
    id: 1,
    title: "Home",
    path: "/",
    private: false,
  },
  {
    id: 2,
    title: "News",
    path: "/news",
    private: false,
  },
  {
    id: 3,
    title: "Add route!",
    path: "/add-route",
    private: true,
  },
  {
    id: 4,
    title: "Content",
    path: "/news",
    private: false,
    dropdown: [
      {
        id: 41,
        title: "Routes",
        path: "/routes",
      },
      {
        id: 42,
        title: "Walls",
        path: "/walls",
      },
      {
        id: 43,
        title: "Locations",
        path: "/locations",
      },
    ],
  },
];

export default navbarList;
