import { MAX_LENGTH_NOTE_CONTENT, MIN_LENGTH_NOTE_CONTENT } from "@/client/constants";

const checkContentsLength = (content: string): boolean => {
  const contentLength = content.length
  if(contentLength < MIN_LENGTH_NOTE_CONTENT || contentLength > MAX_LENGTH_NOTE_CONTENT)
    return false;

  return true;
};


export {
  checkContentsLength
}