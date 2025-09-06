export const formatTimestamp = (timestamp, locale = "en-US", options = {}) => {
  if (typeof timestamp !== "number" || isNaN(timestamp)) {
    return "Invalid Timestamp";
  }
  const timestampInMs =
    timestamp < 1000000000000 ? timestamp * 1000 : timestamp;
  const date = new Date(timestampInMs);
  const defaultOptions = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };
  const finalOptions = { ...defaultOptions, ...options };
  try {
    return new Intl.DateTimeFormat(locale, finalOptions).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Formatting Error";
  }
};

export const downloadFileFromUrl = async (url, name = "image.png") => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = name;
    document.body.appendChild(link); // Required for Firefox
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
  }
};
