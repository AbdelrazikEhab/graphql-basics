const usersArr = [
  {
    id: "1",
    age: 23,
    name: "Abdelrazik",
    email: "Abdelrazik@gmail.com",
    employee: true,
    GPA: 2.9,
    comments: ["1as", "2as"],
  },
  {
    id: "2",
    age: 23,
    name: "Mohamed",
    email: "Mohamed@gmail.com",
    employee: false,
    GPA: 2.7,
    comments: ["1as", "2as"],
  },
  {
    id: "3",
    age: 25,
    name: "Maged",
    email: "Maged@gmail.com",
    employee: true,
    GPA: 3.1,
    comments: ["1as", "2as"],
  },
];

const postsArr = [
  {
    id: "1as",
    auther: "1",
    title: "palastine",
    body: "palastine is our land",
    comments: ["1as", "2as"],
    publish: true,
  },
  {
    id: "2as",
    auther: "2",
    title: "Alahly",
    body: "Alahli is dangers",
    comments: ["1as", "2as"],
    publish: true,
  },
  {
    id: "3as",
    auther: "3",
    title: "welcome",
    body: "Welcome to my house",
    comments: ["1as", "2as"],
    publish: true,
  },
];

const CommentsArr = [
  {
    id: "1as",
    text: "hello Abdo",
    auther: "1",
    post: "1as",
  },
  {
    id: "2as",
    text: "hello Mohamed",
    auther: "2",
    post: "2as",
  },
  {
    id: "3as",
    text: "hello Maged",
    auther: "3",
    post: "3as",
  },
];
const db = { CommentsArr, usersArr, postsArr };
export { db as default };
