// eslint-disable-next-line no-unused-vars
const parseSeparatorClassBEM = (classStr) => {
  let mod = null;
  let elem = null;
  let isThreeFound = false;

  let separatorRaw = '';

  for (const char of classStr) {
    if (char.charCodeAt(0) < 97 || char.charCodeAt(0) > 122) {
      // not a-z
      if (!mod || !elem || !isThreeFound) {
        separatorRaw += char;
      } else {
        break;
      }
    } else if (separatorRaw.length !== 0) {
      if (mod === null) {
        mod = separatorRaw;
      } else if (elem === null) {
        if (separatorRaw !== mod) {
          elem = separatorRaw;
        }
      } else {
        const temp = elem;
        elem = mod;
        mod = temp;

        isThreeFound = true;
      }

      separatorRaw = '';
    }
  }

  return { mod, elem };
};

const parseSeparatorClassBEMRegexp = (classStr) => {
  const regexpPattern = /[a-z]+(([^a-z]+)[a-z]+)(?:(?:\2)[a-z]+)*(?:([^a-z]+)[a-z]+)((?:(?:\2)?|(?:\3)?)+)/;

  const [, , mod, elem, manyTimes] = classStr.match(regexpPattern);

  if (manyTimes === elem) {
    return { mod: elem, elem: mod };
  }

  return { mod, elem };
};

module.exports = parseSeparatorClassBEMRegexp;
