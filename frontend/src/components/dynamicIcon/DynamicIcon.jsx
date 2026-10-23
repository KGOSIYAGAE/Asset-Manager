import React from "react";
//import { MdDevices, MdDevicesOther, MdLaptopWindows, MdOutlineAssignmentTurnedIn, MdOutlineDesktopWindows, MdOutlineMonitor, MdOutlineTabletMac } from "react-icons/md";

import * as Fa6Icons from "react-icons/fa6";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi2";

const ICON_SETS = {
  ...Fa6Icons,
  ...MdIcons,
  ...HiIcons,
};

function DynamicIcon({ name, size = 25, iconColor }) {
  const IconComponent = ICON_SETS[name];

  if (!IconComponent) {
    console.warn(`DynamicIcon: "${name}" not found in loaded icon sets`);
    return null;
  }

  return <IconComponent size={size} className={iconColor} />;
}

export default DynamicIcon;
