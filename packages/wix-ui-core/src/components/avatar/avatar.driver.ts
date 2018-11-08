import { UniDriver } from 'unidriver';

import { ContentType } from './types';

export interface AvatarDriver {
  /** returns true if component exists */
  exists: () => Promise<boolean>;
  /** Get the displayed content type. Types are: 'text', 'icon', 'image' */
  getContentType: () => Promise<ContentType>;
  /** Get the text content (generated initials) */
  getTextContent: ()=> Promise<string>;
}

export const avatarDriverFactory = (base: UniDriver): AvatarDriver => {
  const getContentType = ()=> base.attr('data-content-type') as Promise<ContentType>;

  return {
    exists: base.exists,
    getContentType,
    getTextContent: async ()=> (await getContentType()) === 'text' 
      ? base.$(':first-child').text() 
      : undefined
  }
};
