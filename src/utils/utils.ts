export function observeListItems(array: NodeListOf<Element>) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("books__item_show", entry.isIntersecting);
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  if (array) {
    array.forEach((item) => {
      observer.observe(item);
    });
  }
}
