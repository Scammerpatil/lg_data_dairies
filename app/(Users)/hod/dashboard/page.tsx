"use client";
import { Button, Card, CardBody, Slider } from "@nextui-org/react";
import {
  HeartIcon,
  NotepadTextIcon,
  PauseCircleIcon,
  ShuffleIcon,
} from "lucide-react";
import Image from "next/image";
import router from "next/navigation";
import React, { useState } from "react";

function hodDashboard() {
  const [liked, setLiked] = useState(false);

  return (
    <Card
      isBlurred
      className="bg-background/60 dark:bg-default-100/50 max-w-[610px] border-none"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 items-center justify-center gap-6 md:grid-cols-12 md:gap-4">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={200}
              src="https://nextui.org/images/album-cover.png"
              width={100}
            />
          </div>

          <div className="col-span-6 flex flex-col md:col-span-8">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0">
                <h3 className="text-foreground/90 font-semibold">Daily Mix</h3>
                <p className="text-small text-foreground/80">12 Tracks</p>
                <h1 className="text-large mt-2 font-medium">Frontend Radio</h1>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  className={liked ? "[&>path]:stroke-transparent" : ""}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
            </div>

            <div className="mt-3 flex flex-col gap-1">
              <Slider
                aria-label="Music progress"
                classNames={{
                  track: "bg-default-500/30",
                  thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                }}
                color="foreground"
                defaultValue={33}
                size="sm"
              />
              <div className="flex justify-between">
                <p className="text-small">1:23</p>
                <p className="text-small text-foreground/50">4:32</p>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                {/* <RepeatOneIcon className="text-foreground/80" /> */}
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                {/* <PreviousIcon /> */}
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10 h-auto w-auto"
                radius="full"
                variant="light"
              >
                <PauseCircleIcon size={54} />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <NotepadTextIcon />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <ShuffleIcon className="text-foreground/80" />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default hodDashboard;
