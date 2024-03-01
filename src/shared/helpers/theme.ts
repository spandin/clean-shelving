export const setThemeAndMeta = (theme: string) => {
  document.body.setAttribute("data-theme", theme);

  const oldMetaTag =
    document.querySelector('meta[name="theme-color"]') ||
    document.createElement("meta");

  const newMetaTag = document.createElement("meta");
  newMetaTag.setAttribute("name", "theme-color");

  if (theme === "light") {
    newMetaTag.content = "#f8f8f8";
    document.head.replaceChild(newMetaTag, oldMetaTag);
  } else {
    newMetaTag.content = "#202020";
    document.head.replaceChild(newMetaTag, oldMetaTag);
  }
};
