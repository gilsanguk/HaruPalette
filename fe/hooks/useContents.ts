export function useContents(contents: string) {
  const arr: string[] = contents.split(' ');
  const contentList = [];
  let temp = [];
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (count + arr[i].length <= 20) {
      temp.push(arr[i]);
      count += arr[i].length;
    } else {
      contentList.push(temp.join(' '));
      temp = [];
      count = 0;
      i -= 1;
    }
  }
  if (temp) contentList.push(temp.join(' '));

  return contentList;
}

export function useAnswer(answer: string) {
  return answer.split('\n');
}
