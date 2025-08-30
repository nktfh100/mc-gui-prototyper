import React, { useEffect, useState } from "react";
import useAppStore, { useActiveGUI } from "../stores/appStore";
import { ColoredText } from "./ColoredText";

export const GUITitle = () => {
  const updateActiveGUI = useAppStore((state) => state.updateActiveGUI);
  const activeGui = useActiveGUI();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(activeGui.name);

  useEffect(() => {
    setInputValue(activeGui.name);
  }, [activeGui.name]);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    updateActiveGUI((gui) => {
      gui.name = inputValue.trim() === "" ? "Untitled GUI" : inputValue;
    });
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape") {
      handleSave();
    }
  };

  return isEditing ? (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleSave}
      onKeyDown={handleInputKeyDown}
      maxLength={25}
      className="pl-[2px] pb-1 text-[1.75rem] bg-transparent border-b border-gray-300 focus:outline-none"
      autoFocus
    />
  ) : (
    <span onClick={handleTitleClick} className="overflow-hidden cursor-pointer">
      <ColoredText defaultColor="8" className="pl-[2px] pb-1 text-[1.75rem]">
        {activeGui.name}
      </ColoredText>
    </span>
  );
};
