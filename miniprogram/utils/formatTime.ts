const formatTime = (time: number) => {
  const _time = new Date(time);
  const year = _time.getFullYear();
  const month = _time.getMonth() + 1;
  const day = _time.getDate();

  return `${year}年${month}月${day}日`;
}

export default formatTime;