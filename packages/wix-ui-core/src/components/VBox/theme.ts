export type VBoxTheme = {
 spacing?: string
 horizontalAlignment?: 'left' | 'center' | 'right',
 width?: string,
 height?: string
};

export const core: VBoxTheme = {
  spacing: '20px',
  horizontalAlignment: 'left',
  width: '100%',
  height: '100%'
};
