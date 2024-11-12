/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.rcpit.ac.in",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
