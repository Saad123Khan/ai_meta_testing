import Image from "next/image";

interface MobileMockUpProps {
  brandName?: string;
  setBrandName?: any;
  brandDescription?: string;
  setBrandDescription?: any;
  brandLogo?: any;
  setBrandLogo?: any;
  brandColors?: any;
  setBrandColors?: any;
  imageUrl?: any;
  ctaText?: any;
}

const MobileMockUp = ({
  brandName,
  setBrandName,
  setBrandDescription,
  brandLogo,
  setBrandLogo,
  brandColors,
  setBrandColors,
  brandDescription,
  imageUrl = "/assets/image.png",
  ctaText = "Your CTA",
}: MobileMockUpProps) => {
  console.log("brandLogo", brandLogo);
  return (
    <div className="max-w-sm mx-auto h-[600px] rounded-xl px-5 py-4 bg-primary-color/75 ">
      <div className="max-w-sm mx-auto h-full relative bg-primary text-primary-color px-4 rounded-2xl shadow-lg">
        <div className="text-center mb-4">
          {brandLogo[0] ? (
            <Image
              src={URL.createObjectURL(brandLogo[0])}
              alt="Logo"
              width={100}
              height={50}
              className="mx-auto"
            />
          ) : (
            <div className="bg-primary-color text-primary-foreground  py-1 rounded-b-[18px] ">
              <p className="italic">Your logo here</p>
            </div>
          )}
        </div>

        <h1 className="text-lg font-bold text-center mb-2">
          {brandName || "Your main headline here!"}
        </h1>

        <p className="text-center text-xs mb-4">
          {brandDescription ||
            "Your description goes here. Add a brief explanation or call-to-action."}
        </p>

        <div className="bg-[#BACEFF] h-[360px] p-4 rounded-lg mb-4">
          <Image
            src={imageUrl}
            alt="Main image"
            width={200}
            height={200}
            className="mx-auto"
          />
          <p className="text-[12px] text-center text-[#002EF6]">
            Your background image will be here.
          </p>
        </div>
        <div className="absolute bg-primary-color rounded-t-[18px] px-10 py-2 bottom-0 left-1/2 transform -translate-x-1/2">
          <p className=" text-black ">
            {ctaText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMockUp;
