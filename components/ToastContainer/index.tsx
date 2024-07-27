import toast, { Toaster } from "react-hot-toast";

export default function index() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName="z-[100000]"
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }}
      />
    </>
  );
}
