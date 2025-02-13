export const copyToClipboard = (address: string) => {
  navigator.clipboard.writeText(address);
};
