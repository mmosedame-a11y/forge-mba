import './globals.css';

export const metadata = {
  title: 'Forge — AI hacks for MBA students',
  description: 'The AI hacks MBA students are actually using to crush case prep, recruit faster, and get through the term. Pulled from Reddit, X, and group chats. Each one comes with reproducible steps.',
  openGraph: {
    title: 'Forge — AI hacks for MBA students',
    description: 'Recruit harder. Case smarter. Sleep more.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
