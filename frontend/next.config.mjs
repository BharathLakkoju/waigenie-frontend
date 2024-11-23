/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: '',
        pathname: "/u/**"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: '',
        pathname: "/a/**"
      }
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"]
    }
  }
};

export default nextConfig;
