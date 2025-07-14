import { CustomActionPayload } from "@thoughtspot/visual-embed-sdk";
import { numberWithCommas } from "../../Util/Util";
import { SettingsContext } from "../../App";
import { CloseButton } from "../../Settings/Inputs/InputMenus";

interface CustomActionPopupProps {
  data: CustomActionPayload;
  closePopup: () => void;
}
const CustomActionPopup: React.FC<CustomActionPopupProps> = ({
  data,
  closePopup,
}) => {
  let embeddedAnswerColumnData: any = [];
  let dataObject = {} as any;
  if (data.embedAnswerData.data) {
    if (data.embedAnswerData.data.constructor === Array) {
      embeddedAnswerColumnData = data.embedAnswerData.data[0].columnDataLite;
    } else {
      let answerData = data.embedAnswerData.data as any;
      embeddedAnswerColumnData = answerData.columnDataLite;
    }
    dataObject = data.embedAnswerData;
  } else {
    embeddedAnswerColumnData =
      data.embedAnswerData.visualizations[0].data[0].columnDataLite;
    dataObject = data.embedAnswerData.visualizations[0];
  }

  return (
    <SettingsContext.Consumer>
      {(settings) => (
        <div
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
          style={{ zIndex: 999 }}
        >
          <div className="absolute flex flex-col bg-white rounded-lg p-8 w-96 shadow-2xl">
            <div className="flex flex-row justify-between items-center mb-4">
              <div className="text-xl font-bold">{(data as any).id}</div>
              <CloseButton onClick={closePopup} />
            </div>
            {data.contextMenuPoints && (
              <div>
                <div className="font-bold mb-2 color-black">1 Row Selected</div>
                <div className="flex flex-row justify-between mb-1 font-bold">
                  <div>Column Name</div>
                  <div>Value</div>
                </div>
                <div className="flex flex-col space-y-1">
                  {data.contextMenuPoints.clickedPoint.selectedAttributes.map(
                    (attribute, index) => (
                      <div
                        className="flex flex-row justify-between"
                        key={index}
                      >
                        <div> {attribute.column.name}</div>
                        <div>
                          {" "}
                          {formatDataPoint(
                            attribute.column.type,
                            attribute.column.dataType,
                            attribute.value
                          ) + ""}
                        </div>
                      </div>
                    )
                  )}
                  {data.contextMenuPoints.clickedPoint.selectedMeasures.map(
                    (measure, index) => (
                      <div
                        className="flex flex-row justify-between"
                        key={index}
                      >
                        <div> {measure.column.name}</div>
                        <div>
                          {" "}
                          {formatDataPoint(
                            measure.column.type,
                            measure.column.dataType,
                            measure.value
                          ) + ""}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
            {!data.contextMenuPoints && (
              <div>
                <div className="font-bold mb-2 color-black">
                  {embeddedAnswerColumnData[0].dataValue.length} Rows Selected
                </div>
                <div className="flex flex-row justify-between mb-2 font-bold">
                  <div>Column Name</div>
                  <div>Value</div>
                </div>
                <div className="flex flex-col space-y-2">
                  {embeddedAnswerColumnData.map((column: any, index: any) => {
                    let columnDefinition = dataObject.columns.find(
                      (col: any) => col.column.id === column.columnId
                    )?.column;
                    let columnName = columnDefinition.name;
                    return (
                      <div className="flex flex-row justify-between">
                        <div className="" key={index}>
                          {columnName}
                        </div>
                        <div className="">
                          {" "}
                          {formatDataPoint(
                            columnDefinition.type,
                            columnDefinition.dataType,
                            column.dataValue[0]
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <textarea
              className="border-2 border-gray-200 w-full h-44 rounded-lg p-2 mt-8"
              placeholder="Enter your comment here..."
            ></textarea>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Save
            </button>
          </div>
        </div>
      )}
    </SettingsContext.Consumer>
  );
};

const formatDataPoint = (type: string, dataType: string, value: any) => {
  if (type === "MEASURE") {
    return numberWithCommas(Math.round(value as number));
  } else if (type === "ATTRIBUTE" && dataType === "DATE") {
    if (typeof value === "number") {
      return new Date((value as number) * 1000).toLocaleDateString();
    } else {
      return new Date((value.v.s as number) * 1000).toLocaleDateString();
    }
  } else {
    return value;
  }
};
export default CustomActionPopup;
