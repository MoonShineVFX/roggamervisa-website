import React, { createContext, useContext, useState } from "react";

interface ImageContextType {
  beforeImage: string | null;
  setBeforeImage: React.Dispatch<React.SetStateAction<string | null>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const ImageContext = createContext<ImageContextType>({
  beforeImage: null,
  setBeforeImage: () => {},
  username: "",
  setUsername: () => {},
});

export function useImage() {
  return useContext(ImageContext);
}

import { ReactNode } from "react";

export function ImageProvider({ children }: { children: ReactNode }) {
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  return (
    <ImageContext.Provider
      value={{ beforeImage, setBeforeImage, username, setUsername }}
    >
      {children}
    </ImageContext.Provider>
  );
}
