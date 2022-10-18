export const useNumberConverter = (n) =>
  n.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
