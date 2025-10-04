import Swal from "sweetalert2";

interface AlertBoxProps {
  title?: string;
  text?: string;
  icon?: "warning" | "success" | "error" | "question";
  confirmButtonText?: string;
  showCancelButton?: boolean;
}

const AlertBox = async ({
  title = "Are you sure?",
  text = "You won't be able to revert this!",
  icon = "success",
  confirmButtonText = "Yes, delete it!",
  showCancelButton = false,
}: AlertBoxProps) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText,
  });
};

export default AlertBox;
