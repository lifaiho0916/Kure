export const renameLink = (link) => {
  const checkLink = link.toString().replaceAll(/[-#*:;,.<>\{\}\[\]\\\/]/gi, '');
  const replaceSpace = checkLink.replaceAll('  ', ' ')
  return replaceSpace.replaceAll(' ', '-')
}

export const firstLetterUpperCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const clickOutSide = (refElement, setIsOpen) => {
  if (!refElement.current) return;
    document.addEventListener(`click`, (evt) => {
    if (refElement?.current && refElement.current.contains(evt.target)) return;
        setIsOpen(false);
    });
  }