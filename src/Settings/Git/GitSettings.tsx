import React from "react";
import { useEffect } from "react";
import { Settings } from "../SettingsConfiguration";

const user = "thoughtspot";
const repo = "ts-demo-builder-demos";
const branch = "main";

interface GitSettingsProps {
  setSettings: (settings: Settings) => void;
  showAsList?: boolean;
}
const GitSettings: React.FC<GitSettingsProps> = ({
  setSettings,
  showAsList,
}) => {
  const [availableDemos, setAvailableDemos] = React.useState<any[]>([]);
  //{process.env.REACT_APP_NOT_SECRET_CODE}

  useEffect(() => {
    GetAvailableDemos().then((data) => {
      setAvailableDemos(data);
    });
  }, []);
  return (
    <div className="flex flex-col space-y-2 rounded-lg p-2 bg-white">
      {!showAsList ? (
        <>
          <div className="flex flex-row space-x-4">
            <div className="w-2/5 font-bold pl-4">Demo Name</div>
            <div className="w-2/5 font-bold pl-4">URL Path</div>
            <div className="w-1/5"></div>
          </div>
          {availableDemos &&
            availableDemos.map((demo, index) => (
              <div key={index} className="flex flex-row space-x-4 items-center">
                <div
                  className="w-2/5 hover:text-blue-700 text-blue-500 hover:cursor-pointer  pl-4"
                  onClick={() => {
                    GetDemo(demo.path).then((data) => {
                      setSettings(data);
                    });
                  }}
                >
                  {demo.path.replace(".txt", "")}
                </div>
                <div className="w-2/5 hover:text-blue-500 hover:cursor-pointer">
                  <a href={"/" + CleanPath(demo.path)}>
                    /{CleanPath(demo.path)}
                  </a>
                </div>
              </div>
            ))}
        </>
      ) : (
        <>
          {availableDemos &&
            availableDemos.map((demo, index) => (
              <div
                key={index}
                className="flex flex-row mb-4 mt-4 items-center justify-center"
              >
                <div
                  className="border-2 rounded-md p-2 hover:bg-slate-100 hover:text-blue-700 text-blue-500 text-lg font-bold hover:cursor-pointer  pl-4"
                  onClick={() => {
                    GetDemo(demo.path).then((data) => {
                      setSettings(data);
                    });
                  }}
                >
                  {demo.path.replace(".txt", "")}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};
export default GitSettings;

// Remove special characters from a demo file name
export const CleanPath = (path: string) => {
  return path
    .replaceAll(/[^\w\s]/gi, "")
    .replaceAll(" ", "")
    .replace("txt", "")
    .toLowerCase();
};

// Load a demo from the github repository
export const GetDemo = async (demo: string) => {
  return await fetch(
    `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${demo}`
  )
    .then((response) => response.text())
    .then((data) => JSON.parse(data));
};

// Get the available demos from the github repository
export const GetAvailableDemos = async () => {
  return await fetch(
    `https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`,
    {}
  )
    .then((response) => response.json())
    .then((data) =>
      data.tree.filter((item: any) => !item.path.startsWith(".github"))
    );
};
