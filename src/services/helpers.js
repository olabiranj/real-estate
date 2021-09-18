export const url = (param) => {
  return `${process.env.REACT_APP_BASE_URL}/api/v1${param}`;
};
