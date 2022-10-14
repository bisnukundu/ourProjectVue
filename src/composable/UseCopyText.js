export const UseCopyText = async (mytext, msg) => {
  try {
    await navigator.clipboard.writeText(mytext);
    alert(msg);
  } catch ($e) {
    alert("Cannot copy");
  }
};
