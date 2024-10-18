import React from "react";
import { Slider } from "@mui/material"

interface PreviewSettingsProps {
  onSetValue: (value: number) => void;
}

const PreviewSettings: React.FC<PreviewSettingsProps> = ({ onSetValue }) => {
  const handelUpdateSetting = (event: Event, newValue: number | number[]) => {
    onSetValue(newValue as number);
  }

  return (
    <div>
      <p>Set Confidence</p>
      <Slider
        name="slider"
        max={1}
        min={0.25}
        step={0.05}
        onChange={handelUpdateSetting}
        valueLabelDisplay="auto"
      />
    </div>
  )
};

export default PreviewSettings;