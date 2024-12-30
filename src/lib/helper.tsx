import { useState } from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";

export const swalPopUp = (
  title: any,
  msg: any,
  msgIcon: any,
  doThen: (() => void) | null = null
) => {
  Swal.fire({
    text: msg,
    title: title,
    icon: msgIcon,
    showConfirmButton: true,
    showCancelButton: false,
    target: document.getElementById("radix-:rc:"),
  }).then((result) => {
    if (doThen !== null) {
      doThen();
    }
  });
};

export const getNextMonthSameDate = (date: any) => {
  const nextMonthDate = new Date(date);
  nextMonthDate.setMonth(date.getMonth() + 1);
  return nextMonthDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};


export const swalConfirmPopUp = (
  title: string,
  msg: string,
  msgIcon: SweetAlertIcon,
  confirmOptions: {
    showCancelButton?: boolean;
    confirmButtonText?: string;
    cancelButtonText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  } = {}
) => {
  Swal.fire({
    text: msg,
    title: title,
    icon: msgIcon,
    showConfirmButton: true,
    showCancelButton: confirmOptions.showCancelButton || false,
    confirmButtonText: confirmOptions.confirmButtonText || "OK",
    cancelButtonText: confirmOptions.cancelButtonText || "Cancel",
    target: document.getElementById("radix-:rc:"),
  }).then((result) => {
    if (result.isConfirmed && confirmOptions.onConfirm) {
      confirmOptions.onConfirm();
    } else if (result.isDismissed && confirmOptions.onCancel) {
      confirmOptions.onCancel();
    }
  });
}

const scrollTo = (elementName:any) => {
  const element = document.getElementById(elementName);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
};

// export const truncateText = (data:any, limit:any, isToggleable:boolean ) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   if (!data) return <p></p>;

//   const text = data.trim();

//   // Display full text if not toggleable or if expanded
//   if (!isToggleable || text.length <= limit || isExpanded) {
//     return (
//       <p>
//         {text}
//         {isToggleable && isExpanded && (
//           <span
//             style={{
//               color: "#6a6a6a",
//               cursor: "pointer",
//             }}
//             onClick={() => setIsExpanded(false)} // Collapse text on click
//           >
//             {" see less"}
//           </span>
//         )}
//       </p>
//     );
//   }

//   const truncated = text.substring(0, limit);

//   // Display truncated text with "see more"
//   return (
//     <p>
//       {truncated}
//       <span
//         style={{
//           color: "#6a6a6a",
//           cursor: "pointer",
//         }}
//         onClick={() => setIsExpanded(true)} // Expand text on click
//       >
//         {" see more.."}
//       </span>
//     </p>
//   );
// };

interface TruncateTextProps {
  data: string;
  limit: number;
  isToggleable: boolean;
}

export const truncateText: React.FC<TruncateTextProps> = ({
  data,
  limit,
  isToggleable,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data) return <p></p>;

  const text = data.trim();
  const shouldTruncate = isToggleable && text.length > limit;

  return (
    <p>
      {shouldTruncate && !isExpanded ? text.substring(0, limit) + "..." : text}
      {isToggleable && (
        <span
          style={{
            color: "#6a6a6a",
            cursor: "pointer",
            marginLeft: "5px",
          }}
          onClick={() => setIsExpanded(!isExpanded)} // Toggle state
        >
          {isExpanded ? "see less" : "see more"}
        </span>
      )}
    </p>
  );
};

export function hasKeys(obj:any) {
  // Ensure the object exists and has keys
  return obj && typeof obj === 'object' && Object.keys(obj).length > 0;
}
export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String); // Extract Base64 string after the prefix
    };
    reader.onerror = (error) => reject(error);
  });
};

export function formatTextWithSpaces(text:any) {
  if (/\n/.test(text)) {
    text = text
      .replace(/\n\n/g, '<br><br>') 
      .replace(/\n/g, '<br>');
  }
  return text; // Return the modified (or original) text
}
export const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = Array.from(byteCharacters).map((char) => char.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

export const generateThumbnail = (videoFile: File): Promise<string> => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");

    video.src = URL.createObjectURL(videoFile);
    video.currentTime = 1; // Capture the thumbnail at 1 second

    video.addEventListener("loadeddata", () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png")); // Return the image as a base64 URL
      }
    });
  });
};

export const extractDate = (dateTimeString:string) => {
  // Split the string at the comma
  const parts = dateTimeString?.split(',');
  // Return the first part, which contains the date
  return parts[0].trim();
}