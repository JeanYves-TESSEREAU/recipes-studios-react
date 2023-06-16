// eslint-disable-next-line import/no-anonymous-default-export
export default (func, milliseconds) => {
  const time = 4;
  let timer;

  return (event) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(func, time, event);
  };
};
