import {
  ConversationEmbed,
  EmbedEvent,
  RuntimeFilterOp,
} from "@thoughtspot/visual-embed-sdk";

import { useContext, useEffect, useRef } from "react";
import { SettingsContext } from "../../App";
import { SimpleSage } from "../../Settings/StandardMenus/SimpleSageConfig";

interface SimpleSageProps {
  simpleSage: SimpleSage;
}
const SimpleSageView: React.FC<SimpleSageProps> = ({ simpleSage }) => {
  const settings = useContext(SettingsContext).settings;
  const embedRef = useRef<any>(null);
  useEffect(() => {
    let div = document.getElementById("conversation");
    if (div) {
      embedRef.current = new ConversationEmbed(div, {
        worksheetId: simpleSage.worksheet,
        frameParams: {
          width: "100%",
          height: "100%",
        },
        runtimeFilters: [
          {
            columnName: "Store Region",
            operator: RuntimeFilterOp.IN,
            values: ["east"],
          },
        ],
        customizations: {
          iconSpriteUrl:
            "https://cdn.jsdelivr.net/gh/hannsta/ts-demo-builder@main/public/sparkleicon.svg",
          content: {
            strings: {
              Spotter: settings.otherSettings?.spotterName
                ? settings.otherSettings.spotterName
                : "Spotter",
            },
          },
          style: {
            customCSS: {
              rules_UNSTABLE: {
                ".zauthenticated-app-view-module__pageContent": {
                  overflow: "hidden",
                },
              },
            },
          },
        },
      });
      embedRef.current.render();
      embedRef.current.on(EmbedEvent.ALL, (data: any) => {
        console.log(data);
      });
    }
  }, [simpleSage.worksheet, settings.otherSettings?.spotterName]);
  return (
    <>
      {simpleSage.worksheet ? (
        <div className="h-full" id="conversation"></div>
      ) : (
        <div>Please select a worksheet in the Settings menu</div>
      )}
    </>
  );
};
export default SimpleSageView;
