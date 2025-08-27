let navigationRef = null;

export const setNavigation = (navigation) => {
  navigationRef = navigation;
};

export const getNavigation = () => {
  return navigationRef;
};