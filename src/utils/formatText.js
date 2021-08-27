export function shorten(text, length) {
  let brief = '';

  if (text.length <= length) {
    brief = text;
  } else {
    brief = text.substring(0, length + 1).toString();

    if (brief[length] == ' ') {
      brief = brief.substring(0, length) + '...';
    } else {
      let count = 0;

      for (let i = length; i >= 0; i--) {
        if (brief[i] != ' ') {
          count++;
        } else {
          break;
        }
      }

      if (length < count) {
        brief = '...';
      } else {
        brief = brief.substring(0, length - count) + '...';
      }
    }
  }

  return brief;
}
