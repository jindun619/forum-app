# 🎬 Forum Web

https://jindun-forum.vercel.app/

## 📚 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)

- **Database**: Vercel's PostgreSQL
- **ORM**: Prisma
- **Authentication**: Kakao login via NextAuth.js

## 💡 Features

### **Index Page**

- Displays all posts.
- Includes a button to create a new post.

![index](./readmeImg/index.png)

### **Login Page**

- Kakao social login (name, profile picture).

![index](./readmeImg/login.png)

### **Post Creation Page**

- Logged-in users can create posts by entering a title and content.

![index](./readmeImg/write.png)

### **Post Page**

- Displays post details: title, content, author, and creation date/time.
- Authors can edit or delete their posts.
- Logged-in users can comment, and comment authors can delete their comments.

![index](./readmeImg/post.png)

### **Post Edit Page**

- Only accessible by the post author.
- Allows editing of the post title and content.

![index](./readmeImg/update.png)

## About the Project

Forum Web is a web application built with **Next.js** and **TypeScript**, designed to provide a simple and interactive forum experience. Users can log in via **Kakao** using **NextAuth.js**, create posts, and leave comments. The backend is powered by **Vercel's PostgreSQL** database, managed with **Prisma** as the ORM. The UI is styled with **TailwindCSS** and **DaisyUI** for a clean and responsive design.

### Key Learnings

- Implemented **Kakao social login** using NextAuth.js.
- Managed database interactions with **Prisma** and **PostgreSQL**.
- Built a responsive and user-friendly UI with **TailwindCSS** and **DaisyUI**.
- Gained experience in full-stack development with **Next.js** and **TypeScript**.
