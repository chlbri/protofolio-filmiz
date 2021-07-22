/** @format */

import { MouseEvent as ReactMouseEvent, RefObject } from 'react';

export default function isDivContainsMouse(
  ref: RefObject<HTMLDivElement>,
  event: ReactMouseEvent<HTMLDivElement, MouseEvent>,
): boolean | undefined {
  return ref.current?.contains(event.currentTarget);
}
