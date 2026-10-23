export const handleOnPrint = () => {
  let printContents = document.getElementById("print-file").innerHTML;
  let originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
  window.location.reload();
};
