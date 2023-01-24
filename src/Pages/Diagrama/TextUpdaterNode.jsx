import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import Input from "@mui/material/Input";

function TextUpdaterNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <div style={{ width: "5rem", height: "1rem" }}>
        <Handle
          type="source"
          style={{ margin: "auto" }}
          className="targe"
          position={Position.Right}
          id="a"
        />

        <label htmlFor="text">Text:</label>

        <input
          style={{ width: "5rem", height: "1rem" }}
          id="text"
          name="text"
        />
      </div>
    </div>
  );
}

export default TextUpdaterNode;
