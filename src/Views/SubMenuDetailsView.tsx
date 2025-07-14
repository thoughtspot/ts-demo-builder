import { useContext, useEffect, useState } from "react";
import { SubMenu } from "../Settings/SubMenuConfiguration";
import { SettingsContext } from "../App";
import { createClientWithoutAuth } from "../Util/Util";
import { SageEmbed, SearchEmbed } from "@thoughtspot/visual-embed-sdk/react";

interface SubMenuDetailsViewProps {
  subMenu: SubMenu;
}
enum SearchType {
  NONE,
  SAGE,
  SEARCH,
  GUIDED,
}
const SubMenuDetailsView: React.FC<SubMenuDetailsViewProps> = ({ subMenu }) => {
  const [worksheetTML, setWorksheetTML] = useState<any>(null);
  const settingsContext = useContext(SettingsContext);
  const [selectedSearchType, setSelectedSearchType] = useState<SearchType>(
    SearchType.NONE
  );
  useEffect(() => {
    const client = createClientWithoutAuth(settingsContext.settings.TSURL);
    client
      .exportMetadataTML({
        metadata: [
          {
            type: "LOGICAL_TABLE",
            identifier: subMenu.worksheet,
          },
        ],
      })
      .then((response) => {
        var tml = JSON.parse(response[0].edoc);
        console.log(tml);
        setWorksheetTML(tml);
      });
  }, [subMenu, settingsContext.settings.TSURL]);

  return (
    <SettingsContext.Consumer>
      {({ settings }) => (
        <div
          style={{ background: settings.style.tileColor }}
          className="shadow-md hover:shadow-lg p-6 rounded-md flex flex-col space-x-2 mt-8 w-full"
        >
          {worksheetTML && (
            <>
              <div className="text-lg font-bold">
                {worksheetTML.worksheet
                  ? worksheetTML.worksheet.name
                  : worksheetTML.model.name
                  ? worksheetTML.model.name
                  : "Invalid Worksheet"}
              </div>
            </>
          )}

          <div className="flex flex-row space-x-4 my-4">
            <button
              onClick={() => setSelectedSearchType(SearchType.SAGE)}
              className="bg-gray-200 hover:bg-gray-400 text-black hover:text-white font-bold py-2 px-4 rounded"
            >
              Sage
            </button>
            <button
              onClick={() => setSelectedSearchType(SearchType.SEARCH)}
              className="bg-gray-200 hover:bg-gray-400 text-black hover:text-white font-bold py-2 px-4 rounded"
            >
              Search
            </button>
            {/* <button onClick={()=>setSelectedSearchType(SearchType.GUIDED)}
                className="bg-gray-200 hover:bg-gray-400 text-black hover:text-white font-bold py-2 px-4 rounded">Guided</button> */}
          </div>
          <div
            style={{
              height: selectedSearchType === SearchType.NONE ? "50px" : "700px",
            }}
          >
            {selectedSearchType === SearchType.SAGE && (
              <div className="flex flex-col mt-4 h-full">
                <div className="font-bold text-lg">Sage</div>
                <div className="text-gray-400">Ask Sage a question</div>
                <SageEmbed
                  dataSource={subMenu.worksheet}
                  frameParams={{ width: "100%", height: "650px" }}
                />
              </div>
            )}
            {selectedSearchType === SearchType.SEARCH && (
              <div className="flex flex-col mt-4 h-full">
                <div className="font-bold text-lg">Search</div>
                <div className="text-gray-400">Search the worksheet</div>
                <SearchEmbed
                  dataPanelV2={true}
                  dataSource={subMenu.worksheet}
                  frameParams={{ width: "100%", height: "650px" }}
                />
              </div>
            )}
            {selectedSearchType === SearchType.GUIDED && (
              <div className="flex flex-col mt-4">
                <div className="font-bold text-lg">Guided</div>
                <div className="text-gray-400">Guided search</div>
              </div>
            )}
          </div>
        </div>
      )}
    </SettingsContext.Consumer>
  );
};
export default SubMenuDetailsView;
