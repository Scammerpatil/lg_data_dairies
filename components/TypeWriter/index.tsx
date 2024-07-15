"use client";
import Typewriter from "typewriter-effect";

function index(props: any) {
  return (
    <>
      <Typewriter
        options={{
          strings: [...props.text],
          autoStart: true,
          loop: true,
        }}
      />
    </>
  );
}

export default index;
