# Clubhouse Messaging App

A private clubhouse messaging app built with **Next.js** and **Auth.js** for authentication, using **PostgreSQL** as the database. Users can sign up, create messages, and join the private club by entering a secret passcode. Admins can manage messages.

## Features

- User authentication with **Auth.js**
- MongoDB database for storing users and messages
- Secure password hashing using **bcrypt**
- Membership system with a secret passcode
- Role-based access control (Members & Admins)
- Message creation and restricted viewing based on membership
- Admins can delete messages

## Tech Stack

- **Next.js** (React framework)
- **Auth.js** (Authentication)
- **MongoDB** (Database)
- **Mongoose** (ORM for database management)
- **bcrypt** (Password hashing)
- **Tailwind CSS** (Styling)

---

## Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js** (>=16)
- **npm** or **yarn**

### 1. Clone the repository

```sh
git clone git@github.com:AlexVNep/members-only2.git
cd clubhouse-messaging
```

### 2. Install dependencies

```sh
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add the following variables:

```sh
MONGODB_URL=your_db_url
AUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Start the development server

```sh
npm run dev
# or
yarn dev
```

The app should now be running on `http://localhost:3000`.

---

## Features Breakdown

### Authentication

- Uses **Auth.js** with credentials authentication (email + password)
- Secure password hashing with **bcrypt**
- Protected routes for members and admins

### User Roles

- **Non-members**: Can sign up, log in, and view messages (but not the author)
- **Members**: Can view author emails on messages
- **Admins**: Can delete messages

### Membership System

- Users must enter a **secret passcode** to become a member
- Membership status is stored in the database (`membership: true`)

### Admin Privileges

- Admins can delete messages
- An admin can be assigned manually in the database or through a secret passcode

---

## API Routes

### Authentication (`/api/auth`)

Handled by **Auth.js**.

---

## How to Use

1. **Sign up** on the website.
2. **Log in** using your email and password.
3. **Enter the secret passcode** on the membership page to become a member.
4. **Create messages** once you’re a member.
5. **Admins can delete messages** from the admin panel.

---

## Future Enhancements

- Add real-time updates using WebSockets.
- Implement OAuth (Google, GitHub) authentication.
- Enhance UI with animations.

---

## License

MIT License

---

## Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.
