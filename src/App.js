import react, { useState } from "react";
import "./App.css";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import React from "react";

function App(props) {
  const [RightData, setRightData] = useState([
    { id: 1, color: "red" },
    { id: 2, color: "orange" },
    { id: 3, color: "yellow" },
    { id: 4, color: "green" },
    { id: 5, color: "deepSkyBlue" },
    { id: 6, color: "blue" },
    { id: 7, color: "purple" },
  ]);

  const [LeftOneData, setLeftOneData] = useState([]);
  const [LeftTwoData, setLeftTwoData] = useState([]);

  const rightToLeft = (e, index) => {
    if (e.dropElem.parentElement.className === "leftFirst") {
      setLeftOneData([...LeftOneData, e.dragData]);
      let newRightData = [...RightData];
      newRightData.splice(index, 1);
      setRightData(newRightData);
    } else if (e.dropElem.parentElement.className === "leftSecond") {
      setLeftTwoData([...LeftTwoData, e.dragData]);
      let newRightData = [...RightData];
      newRightData.splice(index, 1);
      setRightData(newRightData);
    }
  };
  const topToBottom = (e, index, type) => {
    console.log(e);

    if (type === "second") {
      setLeftOneData([...LeftOneData, e.dragData]);
      let newData = [...LeftTwoData];
      newData.splice(index, 1);
      setLeftTwoData(newData);
    } else if (type === "first") {
      console.log(e);
      setLeftTwoData([...LeftTwoData, e.dragData]);
      let newData = [...LeftOneData];
      newData.splice(index, 1);
      setLeftOneData(newData);
    }
  };
  const handleRomoveLeftOne = (val, ind) => {
    console.log(ind);
    let arr = [...LeftOneData];
    arr.splice(ind, 1);
    setLeftOneData(arr);
    setRightData([...RightData, val]);
  };
  const handleRomoveLeftTwo = (val, ind) => {
    console.log(ind);
    let arr = [...LeftTwoData];
    arr.splice(ind, 1);
    setLeftTwoData(arr);
    setRightData([...RightData, val]);
  };

  return (
    <div className="App">
      <div className="leftCont">
        <div className="leftFirst">
          <DropTarget targetKey="foo" id="first">
            <DropTarget targetKey="Zoo" id="first">
              <div style={{ height: "100%" }}>
                {LeftOneData.map((val, index) => {
                  return (
                    <DragDropContainer
                      targetKey="Yoo"
                      dragData={val}
                      customDragElement={
                        <div
                          style={{
                            backgroundColor: val.color,
                            height: "10vh",
                            width: "200px",
                          }}
                        ></div>
                      }
                      onDrop={(e) => topToBottom(e, index, "first")}
                    >
                      <div className="rowDataCol">
                        <div
                          className="rowCell"
                          style={{ backgroundColor: val.color }}
                        ></div>
                        <div
                          className="closeItem"
                          onClick={() => handleRomoveLeftOne(val, index)}
                        >
                          X
                        </div>
                      </div>
                    </DragDropContainer>
                  );
                })}
              </div>
            </DropTarget>
          </DropTarget>
        </div>

        <div className="leftSecond">
          <DropTarget targetKey="foo" id="second">
            <DropTarget targetKey="Yoo" id="first">
              <div style={{ height: "100%" }}>
                {LeftTwoData.map((val, index) => {
                  return (
                    <DragDropContainer
                      targetKey="Zoo"
                      dragData={val}
                      customDragElement={
                        <div
                          style={{
                            backgroundColor: val.color,
                            height: "10vh",
                            width: "200px",
                          }}
                        ></div>
                      }
                      onDrop={(e) => topToBottom(e, index, "second")}
                    >
                      <div className="rowDataCol">
                        <div
                          className="rowCell"
                          style={{ backgroundColor: val.color }}
                        ></div>
                        <div
                          className="closeItem"
                          onClick={() => handleRomoveLeftTwo(val, index)}
                        >
                          X
                        </div>
                      </div>
                    </DragDropContainer>
                  );
                })}
              </div>
            </DropTarget>
          </DropTarget>
        </div>
      </div>

      <div className="rightCont">
        <div className="rightFirst">
          {RightData.map((val, index) => {
            return (
              <DragDropContainer
                targetKey="foo"
                dragData={val}
                customDragElement={
                  <div
                    style={{
                      backgroundColor: val.color,
                      height: "10vh",
                      width: "200px",
                    }}
                  ></div>
                }
                onDrop={(e) => rightToLeft(e, index)}
              >
                <div
                  className="ContentData"
                  style={{ backgroundColor: val.color }}
                ></div>
              </DragDropContainer>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
