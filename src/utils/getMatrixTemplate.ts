import { MAX_SIZE_CANVAS } from "@/constants";

export default function getMatrixTemplate(length: number): string {
  let size = '0px;'

  if (length <= 4) size = '64px';
  else if (length > 4 && length <= 6) size = '48px';
  else if (length > 6 && length <= 8) size = '36px';
  else if (length > 8 && length <= MAX_SIZE_CANVAS) size = '32px';

  return `repeat(${length}, ${size})`
}